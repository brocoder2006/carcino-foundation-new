import os
import json
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify
from accounts.models import User, UserRole
from blog.models import Category, Tag, Post, Campaign, Podcast, MediaAsset, PostStatus, PathwayStageChoices, CampaignStatusChoices


def convert_content_to_tiptap(content_data, sections_data=None):
    """Converts Portable Text, string list, or sections data into Tiptap JSON document AST."""
    tiptap_content = []

    if isinstance(content_data, list):
        for item in content_data:
            if isinstance(item, str):
                tiptap_content.append({
                    "type": "paragraph",
                    "content": [{"type": "text", "text": item}]
                })
            elif isinstance(item, dict):
                _type = item.get("_type")
                if _type == "block":
                    style = item.get("style", "normal")
                    children = item.get("children", [])
                    tiptap_children = []
                    for child in children:
                        text = child.get("text", "")
                        marks = []
                        sanity_marks = child.get("marks", [])
                        if "strong" in sanity_marks or "bold" in sanity_marks:
                            marks.append({"type": "bold"})
                        if "em" in sanity_marks or "italic" in sanity_marks:
                            marks.append({"type": "italic"})
                        node = {"type": "text", "text": text}
                        if marks:
                            node["marks"] = marks
                        tiptap_children.append(node)

                    if style in ["h1", "h2", "h3", "h4"]:
                        level = int(style[1])
                        tiptap_content.append({
                            "type": "heading",
                            "attrs": {"level": level},
                            "content": tiptap_children or [{"type": "text", "text": ""}]
                        })
                    else:
                        tiptap_content.append({
                            "type": "paragraph",
                            "content": tiptap_children or [{"type": "text", "text": ""}]
                        })

    if isinstance(sections_data, list):
        for sec in sections_data:
            if isinstance(sec, dict):
                heading = sec.get("heading")
                sec_paragraphs = sec.get("content", [])
                if heading:
                    tiptap_content.append({
                        "type": "heading",
                        "attrs": {"level": 2},
                        "content": [{"type": "text", "text": heading}]
                    })
                if isinstance(sec_paragraphs, list):
                    for p_text in sec_paragraphs:
                        if isinstance(p_text, str):
                            tiptap_content.append({
                                "type": "paragraph",
                                "content": [{"type": "text", "text": p_text}]
                            })

    return {"type": "doc", "content": tiptap_content}


class Command(BaseCommand):
    help = "Migrate existing Sanity documents and Portable Text to Django models."

    def add_arguments(self, parser):
        parser.add_argument("--file", type=str, help="Path to Sanity JSON export file.")
        parser.add_argument("--dry-run", action="store_true", help="Simulate migration without modifying DB.")

    def handle(self, *args, **options):
        dry_run = options.get("dry-run", False)
        file_path = options.get("file")

        if dry_run:
            self.stdout.write(self.style.WARNING("DRY RUN MODE ENABLED. No records will be saved."))

        # Default admin user for migrated content
        admin_user, _ = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@carcinofoundation.org",
                "role": UserRole.ADMIN,
                "first_name": "Carcino",
                "last_name": "Admin",
            }
        )

        documents = []
        if file_path and os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                documents = json.load(f)
            self.stdout.write(self.style.SUCCESS(f"Loaded {len(documents)} documents from '{file_path}'"))
        else:
            export_default = os.path.join(os.path.dirname(__file__), "../../../sanity_export.json")
            if os.path.exists(export_default):
                with open(export_default, "r", encoding="utf-8") as f:
                    documents = json.load(f)
                self.stdout.write(self.style.SUCCESS(f"Loaded {len(documents)} documents from '{export_default}'"))

        report = {"articles": 0, "campaigns": 0, "podcasts": 0, "skipped": 0, "failed": 0}

        for doc in documents:
            doc_id = doc.get("id") or doc.get("_id") or str(timezone.now().timestamp())
            doc_type = doc.get("_type", "article" if "title" in doc else "unknown")

            try:
                if doc_type in ["article", "post"] or ("title" in doc and "content" in doc):
                    title = doc.get("title", "Untitled Article")
                    slug_str = doc.get("id") or doc.get("slug")
                    if isinstance(slug_str, dict):
                        slug_str = slug_str.get("current")
                    if not slug_str:
                        slug_str = slugify(title)

                    desc = doc.get("desc") or doc.get("excerpt") or ""
                    category_name = doc.get("category", "General Oncology")
                    read_time = doc.get("readTime") or doc.get("read_time") or "5 min read"
                    cover = doc.get("cover") or doc.get("cover_image") or "/Cover.png"
                    raw_content = doc.get("content", [])
                    sections = doc.get("sections", [])

                    tiptap_content = convert_content_to_tiptap(raw_content, sections)

                    if not dry_run:
                        cat_obj, _ = Category.objects.get_or_create(
                            name=category_name,
                            defaults={"description": f"Category for {category_name}"}
                        )

                        author_name = doc.get("author")
                        author_user = admin_user
                        if author_name and isinstance(author_name, str):
                            uname = slugify(author_name.split("|")[0]).replace("-", "_")[:30]
                            if uname:
                                author_user, _ = User.objects.get_or_create(
                                    username=uname,
                                    defaults={
                                        "email": f"{uname}@carcinofoundation.org",
                                        "first_name": author_name.split()[0],
                                        "last_name": " ".join(author_name.split()[1:]),
                                        "role": UserRole.AUTHOR,
                                    }
                                )

                        post, created = Post.objects.update_or_create(
                            legacy_sanity_id=doc_id,
                            defaults={
                                "title": title,
                                "slug": slug_str,
                                "excerpt": desc,
                                "content": tiptap_content,
                                "cover_image": cover,
                                "read_time": read_time,
                                "category": cat_obj,
                                "author": author_user,
                                "status": PostStatus.PUBLISHED,
                                "publication_date": timezone.now(),
                                "seo_title": title,
                                "seo_description": desc[:160] if desc else title,
                            }
                        )
                    report["articles"] += 1

                elif doc_type == "campaign":
                    title = doc.get("title", "Untitled Campaign")
                    stage = doc.get("pathwayStage", "stage-01")
                    summary = doc.get("summary", "")
                    action_url = doc.get("actionUrl")
                    camp_status = doc.get("status", "active")

                    if not dry_run:
                        Campaign.objects.update_or_create(
                            legacy_sanity_id=doc_id,
                            defaults={
                                "title": title,
                                "pathway_stage": stage if stage in PathwayStageChoices.values else PathwayStageChoices.STAGE_01,
                                "summary": summary,
                                "action_url": action_url,
                                "status": camp_status if camp_status in CampaignStatusChoices.values else CampaignStatusChoices.ACTIVE,
                            }
                        )
                    report["campaigns"] += 1

                elif doc_type == "podcast":
                    title = doc.get("title", "Untitled Episode")
                    code = doc.get("code", "TCF 001")
                    desc = doc.get("desc", "")
                    cover = doc.get("cover")
                    video_url = doc.get("videoUrl")

                    if not dry_run:
                        Podcast.objects.update_or_create(
                            legacy_sanity_id=doc_id,
                            defaults={
                                "code": code,
                                "title": title,
                                "description": desc,
                                "cover_image": cover,
                                "video_url": video_url,
                            }
                        )
                    report["podcasts"] += 1

                else:
                    report["skipped"] += 1

            except Exception as e:
                report["failed"] += 1
                self.stdout.write(self.style.ERROR(f"Failed to migrate document '{doc_id}': {str(e)}"))

        self.stdout.write(self.style.SUCCESS(
            f"\nSanity -> Custom Python CMS Migration Summary:\n"
            f"--------------------------------------------------\n"
            f"- Articles Migrated: {report['articles']}\n"
            f"- Campaigns Migrated: {report['campaigns']}\n"
            f"- Podcasts Migrated: {report['podcasts']}\n"
            f"- Skipped: {report['skipped']}\n"
            f"- Failed: {report['failed']}\n"
        ))
