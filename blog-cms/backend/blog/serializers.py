from rest_framework import serializers
from django.utils import timezone
from accounts.serializers import UserSerializer
from .models import (
    Category,
    Tag,
    Post,
    Campaign,
    Podcast,
    MediaAsset,
    PostRevision,
    PostStatus,
    SiteSettings,
    AuditLog,
)


class CategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "created_at", "post_count"]
        read_only_fields = ["id", "slug", "created_at"]

    def get_post_count(self, obj):
        return obj.posts.filter(status=PostStatus.PUBLISHED).count()


class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = ["id", "name", "slug", "post_count"]
        read_only_fields = ["id", "slug"]

    def get_post_count(self, obj):
        return obj.posts.filter(status=PostStatus.PUBLISHED).count()


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            "id",
            "title",
            "slug",
            "pathway_stage",
            "summary",
            "banner_image",
            "action_url",
            "status",
            "start_date",
            "end_date",
            "created_at",
        ]
        read_only_fields = ["id", "slug", "created_at"]


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = [
            "id",
            "code",
            "title",
            "description",
            "cover_image",
            "video_url",
            "embed_url",
            "external_url",
            "publication_date",
        ]
        read_only_fields = ["id", "publication_date"]


class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = [
            "id",
            "name",
            "file_url",
            "alt_text",
            "caption",
            "file_size",
            "file_type",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class PostRevisionSerializer(serializers.ModelSerializer):
    editor = UserSerializer(read_only=True)

    class Meta:
        model = PostRevision
        fields = ["id", "post", "title_snapshot", "content_snapshot", "editor", "created_at"]
        read_only_fields = ["id", "created_at"]


class PostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "cover_image",
            "read_time",
            "author",
            "category",
            "tags",
            "status",
            "publication_date",
            "created_at",
            "updated_at",
            "seo_title",
            "seo_description",
            "canonical_url",
        ]


class PostDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    revisions = PostRevisionSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "cover_image",
            "read_time",
            "author",
            "category",
            "tags",
            "status",
            "publication_date",
            "created_at",
            "updated_at",
            "seo_title",
            "seo_description",
            "canonical_url",
            "revisions",
        ]


class PostCreateUpdateSerializer(serializers.ModelSerializer):
    category_id = serializers.UUIDField(required=False, allow_null=True, write_only=True)
    author_id = serializers.UUIDField(required=False, allow_null=True, write_only=True)
    tag_ids = serializers.ListField(
        child=serializers.UUIDField(), required=False, write_only=True
    )
    tag_names = serializers.ListField(
        child=serializers.CharField(), required=False, write_only=True
    )

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "excerpt",
            "content",
            "cover_image",
            "read_time",
            "category_id",
            "author_id",
            "tag_ids",
            "tag_names",
            "status",
            "publication_date",
            "seo_title",
            "seo_description",
            "canonical_url",
        ]
        read_only_fields = ["id", "slug"]

    def create(self, validated_data):
        category_id = validated_data.pop("category_id", None)
        author_id = validated_data.pop("author_id", None)
        tag_ids = validated_data.pop("tag_ids", [])
        tag_names = validated_data.pop("tag_names", [])

        user = self.context["request"].user
        if author_id:
            try:
                validated_data["author"] = User.objects.get(id=author_id)
            except User.DoesNotExist:
                validated_data["author"] = user
        else:
            validated_data["author"] = user

        if category_id:
            try:
                validated_data["category"] = Category.objects.get(id=category_id)
            except Category.DoesNotExist:
                pass

        if validated_data.get("status") == PostStatus.PUBLISHED and not validated_data.get("publication_date"):
            validated_data["publication_date"] = timezone.now()

        post = Post.objects.create(**validated_data)

        tags_to_add = []
        if tag_ids:
            tags_to_add.extend(Tag.objects.filter(id__in=tag_ids))
        if tag_names:
            for tname in tag_names:
                tag, _ = Tag.objects.get_or_create(name=tname.strip())
                tags_to_add.append(tag)
        if tags_to_add:
            post.tags.set(tags_to_add)

        PostRevision.objects.create(
            post=post,
            title_snapshot=post.title,
            content_snapshot=post.content,
            editor=user,
        )

        return post

    def update(self, instance, validated_data):
        category_id = validated_data.pop("category_id", None)
        author_id = validated_data.pop("author_id", None)
        tag_ids = validated_data.pop("tag_ids", None)
        tag_names = validated_data.pop("tag_names", None)

        user = self.context["request"].user

        if author_id:
            try:
                instance.author = User.objects.get(id=author_id)
            except User.DoesNotExist:
                pass

        if category_id is not None:
            if category_id:
                try:
                    instance.category = Category.objects.get(id=category_id)
                except Category.DoesNotExist:
                    instance.category = None
            else:
                instance.category = None


        if validated_data.get("status") == PostStatus.PUBLISHED and not instance.publication_date and not validated_data.get("publication_date"):
            validated_data["publication_date"] = timezone.now()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if tag_ids is not None or tag_names is not None:
            tags_to_add = []
            if tag_ids:
                tags_to_add.extend(Tag.objects.filter(id__in=tag_ids))
            if tag_names:
                for tname in tag_names:
                    tag, _ = Tag.objects.get_or_create(name=tname.strip())
                    tags_to_add.append(tag)
            instance.tags.set(tags_to_add)

        PostRevision.objects.create(
            post=instance,
            title_snapshot=instance.title,
            content_snapshot=instance.content,
            editor=user,
        )

        return instance


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["id", "site_title", "tagline", "revalidation_secret", "updated_at"]


class AuditLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = AuditLog
        fields = ["id", "user", "action", "details", "created_at"]
