from django.core.management.base import BaseCommand
from django.utils import timezone
from accounts.models import User, UserRole
from blog.models import Category, Tag, Post, PostStatus


class Command(BaseCommand):
    help = "Seed initial admin user, categories, tags, and sample published blog posts."

    def handle(self, *args, **options):
        # Create Admin User
        admin, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@blogcms.com",
                "role": UserRole.ADMIN,
                "first_name": "Alexander",
                "last_name": "Vance",
                "bio": "Lead Editor & Systems Architect",
            }
        )
        if created:
            admin.set_password("admin123")
            admin.save()
            self.stdout.write(self.style.SUCCESS("Created admin user 'admin' (password: admin123)"))

        # Create Editor User
        editor, created = User.objects.get_or_create(
            username="editor",
            defaults={
                "email": "editor@blogcms.com",
                "role": UserRole.EDITOR,
                "first_name": "Elena",
                "last_name": "Rostova",
                "bio": "Senior Content Strategist",
            }
        )
        if created:
            editor.set_password("editor123")
            editor.save()
            self.stdout.write(self.style.SUCCESS("Created editor user 'editor' (password: editor123)"))

        # Create Author User
        author, created = User.objects.get_or_create(
            username="author",
            defaults={
                "email": "author@blogcms.com",
                "role": UserRole.AUTHOR,
                "first_name": "Marcus",
                "last_name": "Chen",
                "bio": "Staff Tech Writer & Developer Advocate",
            }
        )
        if created:
            author.set_password("author123")
            author.save()
            self.stdout.write(self.style.SUCCESS("Created author user 'author' (password: author123)"))

        # Create Categories
        tech_cat, _ = Category.objects.get_or_create(
            name="Technology",
            defaults={"description": "Deep dives into web architecture, cloud engineering, and modern stack design."}
        )
        design_cat, _ = Category.objects.get_or_create(
            name="Design & UX",
            defaults={"description": "Crafting polished digital interfaces, user flows, and aesthetic design systems."}
        )
        devops_cat, _ = Category.objects.get_or_create(
            name="DevOps & Cloud",
            defaults={"description": "CI/CD pipelines, container orchestration, serverless setups, and database scaling."}
        )

        # Create Tags
        tag_django, _ = Tag.objects.get_or_create(name="Django")
        tag_nextjs, _ = Tag.objects.get_or_create(name="Next.js")
        tag_python, _ = Tag.objects.get_or_create(name="Python")
        tag_react, _ = Tag.objects.get_or_create(name="React")
        tag_devops, _ = Tag.objects.get_or_create(name="DevOps")

        # Create Sample Posts
        posts_data = [
            {
                "title": "Architecting a Headless CMS with Django REST Framework and Next.js App Router",
                "excerpt": "A comprehensive guide on building scalable, decoupling content platforms using Django REST Framework as a robust API server and Next.js for SSR frontend speed.",
                "cover_image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
                "category": tech_cat,
                "author": admin,
                "tags": [tag_django, tag_nextjs, tag_python],
                "status": PostStatus.PUBLISHED,
                "publication_date": timezone.now(),
                "seo_title": "Headless CMS Architecture with Django & Next.js",
                "seo_description": "Learn how to build a production headless blog platform combining Python Django backend APIs and Next.js frontend speed.",
                "content": {
                    "type": "doc",
                    "content": [
                        {
                            "type": "heading",
                            "attrs": {"level": 2},
                            "content": [{"type": "text", "text": "Why Decoupled Content Architecture Matters"}]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Modern publishing demands lightning-fast user experience without sacrificing structured data management. By separating our Python Django REST backend from our TypeScript Next.js frontend, we achieve maximum flexibility, security, and rendering speed."
                                }
                            ]
                        },
                        {
                            "type": "blockquote",
                            "content": [
                                {
                                    "type": "paragraph",
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "A headless architecture empowers content creators with custom editorial tools while allowing engineering teams to build zero-jank frontend applications."
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "heading",
                            "attrs": {"level": 3},
                            "content": [{"type": "text", "text": "Key Highlights of the Architecture"}]
                        },
                        {
                            "type": "bulletList",
                            "content": [
                                {
                                    "type": "listItem",
                                    "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Session and Token authentication with granular role-based permissions (Admin, Editor, Author)."}]}]
                                },
                                {
                                    "type": "listItem",
                                    "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Tiptap rich-text structured JSON storage in PostgreSQL."}]}]
                                },
                                {
                                    "type": "listItem",
                                    "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Automatic scheduling and revision snapshots on every meaningful edit."}]}]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "title": "Mastering Tiptap Rich Text Editor Customizations for Modern Editorial Workflows",
                "excerpt": "Discover how structured JSON content nodes enable clean data parsing, effortless migrations, and zero-XSS security in web applications.",
                "cover_image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
                "category": design_cat,
                "author": editor,
                "tags": [tag_react, tag_nextjs],
                "status": PostStatus.PUBLISHED,
                "publication_date": timezone.now(),
                "seo_title": "Tiptap Rich Text Editor Guide",
                "seo_description": "Learn how to build custom editorial rich text workflows with Tiptap, JSON storage, and Next.js.",
                "content": {
                    "type": "doc",
                    "content": [
                        {
                            "type": "heading",
                            "attrs": {"level": 2},
                            "content": [{"type": "text", "text": "The Power of Structured JSON Over Raw HTML"}]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Traditional WYSIWYG editors save messy HTML directly into the database. Tiptap takes a modern approach by storing an Abstract Syntax Tree (AST) as structured JSON."
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "title": "Deploying Django and Next.js to Render, Vercel, and Neon PostgreSQL",
                "excerpt": "A step-by-step deployment guide for shipping full-stack applications with production SSL, connection pooling, and automated environment pipelines.",
                "cover_image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
                "category": devops_cat,
                "author": author,
                "tags": [tag_devops, tag_django, tag_python],
                "status": PostStatus.PUBLISHED,
                "publication_date": timezone.now(),
                "seo_title": "Deploying Django & Next.js to Render and Vercel",
                "seo_description": "Step-by-step guide to deploying Python Django backend on Render, Next.js on Vercel, and Neon PostgreSQL.",
                "content": {
                    "type": "doc",
                    "content": [
                        {
                            "type": "heading",
                            "attrs": {"level": 2},
                            "content": [{"type": "text", "text": "Continuous Integration & Deployment Setup"}]
                        },
                        {
                            "type": "paragraph",
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Using Neon PostgreSQL connection pooling ensures high concurrency while Render handles Django web process scaling with Gunicorn."
                                }
                            ]
                        }
                    ]
                }
            },
        ]

        for pdata in posts_data:
            tags = pdata.pop("tags")
            post, pcreated = Post.objects.get_or_create(
                title=pdata["title"],
                defaults=pdata
            )
            if pcreated:
                post.tags.set(tags)
                self.stdout.write(self.style.SUCCESS(f"Seeded post '{post.title}'"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
