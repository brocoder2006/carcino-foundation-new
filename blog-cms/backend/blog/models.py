import uuid
from django.db import models
from django.utils.text import slugify
from django.conf import settings


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=120)
    description = models.TextField(blank=True, default="")
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "category"
            slug = base_slug
            counter = 1
            while Category.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, max_length=60)
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name) or "tag"
            slug = base_slug
            counter = 1
            while Tag.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class PostStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    PUBLISHED = "PUBLISHED", "Published"
    SCHEDULED = "SCHEDULED", "Scheduled"


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=280, db_index=True)
    excerpt = models.TextField(blank=True, default="")
    content = models.JSONField(default=dict, blank=True)
    cover_image = models.URLField(blank=True, null=True, max_length=500)
    read_time = models.CharField(max_length=50, blank=True, default="")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts",
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="posts",
    )
    tags = models.ManyToManyField(Tag, blank=True, related_name="posts")
    status = models.CharField(
        max_length=20,
        choices=PostStatus.choices,
        default=PostStatus.DRAFT,
        db_index=True,
    )
    publication_date = models.DateTimeField(null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    seo_title = models.CharField(max_length=255, blank=True, default="")
    seo_description = models.TextField(blank=True, default="")
    canonical_url = models.URLField(blank=True, null=True, max_length=500)
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "publication_date"]),
            models.Index(fields=["slug"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "post"
            slug = base_slug
            counter = 1
            while Post.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.status})"


class PathwayStageChoices(models.TextChoices):
    STAGE_01 = "stage-01", "Stage 01: Clinical Navigation (TCF PATHWAY)"
    STAGE_02 = "stage-02", "Stage 02: Integrative Care (TCF ADVOCACY)"
    STAGE_03 = "stage-03", "Stage 03: Moderated Spaces (TCF CONNECTION)"
    STAGE_04 = "stage-04", "Stage 04: Survivorship Plans (TCF VOICES)"
    GENERAL = "general-flagship", "General Flagship Campaign"


class CampaignStatusChoices(models.TextChoices):
    ACTIVE = "active", "Active / Live"
    UPCOMING = "upcoming", "Upcoming"
    COMPLETED = "completed", "Completed / Archived"


class Campaign(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=280)
    pathway_stage = models.CharField(
        max_length=50,
        choices=PathwayStageChoices.choices,
        default=PathwayStageChoices.STAGE_01,
    )
    summary = models.TextField(blank=True, default="")
    banner_image = models.URLField(blank=True, null=True, max_length=500)
    action_url = models.URLField(blank=True, null=True, max_length=500)
    status = models.CharField(
        max_length=20,
        choices=CampaignStatusChoices.choices,
        default=CampaignStatusChoices.ACTIVE,
    )
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["pathway_stage", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or "campaign"
            slug = base_slug
            counter = 1
            while Campaign.objects.filter(slug=slug).exclude(id=self.id).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} [{self.pathway_stage}]"


class Podcast(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=50, default="TCF 001")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    cover_image = models.URLField(blank=True, null=True, max_length=500)
    video_url = models.URLField(blank=True, null=True, max_length=500)
    embed_url = models.URLField(blank=True, null=True, max_length=500)
    external_url = models.URLField(blank=True, null=True, max_length=500)
    publication_date = models.DateTimeField(auto_now_add=True)
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)

    class Meta:
        ordering = ["-publication_date"]

    def __str__(self):
        return f"{self.code}: {self.title}"


class MediaAsset(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    file_url = models.URLField(max_length=500)
    alt_text = models.CharField(max_length=255, blank=True, default="")
    caption = models.TextField(blank=True, default="")
    file_size = models.IntegerField(default=0)
    file_type = models.CharField(max_length=50, default="image")
    legacy_sanity_id = models.CharField(max_length=100, blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class PostRevision(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="revisions",
    )
    title_snapshot = models.CharField(max_length=255)
    content_snapshot = models.JSONField(default=dict)
    editor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Revision for '{self.post.title}' at {self.created_at}"


class SiteSettings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    site_title = models.CharField(max_length=255, default="The Carcino Foundation")
    tagline = models.CharField(max_length=255, default="Turning Knowledge Into Action in Oncology")
    revalidation_secret = models.CharField(max_length=255, default="carcino-cms-revalidation-secret-2026")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Site Settings ({self.site_title})"


class AuditLog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=100)
    details = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.action} by {self.user} at {self.created_at}"
