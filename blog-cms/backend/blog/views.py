import urllib.request
import json
from rest_framework import generics, permissions, status, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.db.models import Q, Count
from django.conf import settings
from PIL import Image
import cloudinary.uploader

from accounts.permissions import IsAuthorOrEditorOrAdmin, IsEditorOrAdmin, IsAdminUserRole
from accounts.models import User
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
from .serializers import (
    CategorySerializer,
    TagSerializer,
    CampaignSerializer,
    PodcastSerializer,
    MediaAssetSerializer,
    PostListSerializer,
    PostDetailSerializer,
    PostCreateUpdateSerializer,
    PostRevisionSerializer,
    SiteSettingsSerializer,
    AuditLogSerializer,
)


def trigger_nextjs_revalidation(path=None, tag=None):
    """Triggers Next.js cache revalidation webhook on publish/unpublish."""
    frontend_origin = getattr(settings, "FRONTEND_ORIGIN", "http://localhost:3000")
    revalidate_url = f"{frontend_origin}/api/revalidate"
    secret = getattr(settings, "REVALIDATION_SECRET", "carcino-cms-revalidation-secret-2026")

    payload = json.dumps({"path": path, "tag": tag}).encode("utf-8")
    req = urllib.request.Request(
        revalidate_url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "x-revalidate-secret": secret,
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=3) as resp:
            return resp.status == 200
    except Exception as e:
        print(f"Revalidation webhook warning: {e}")
        return False


# ==========================================
# PUBLIC ENDPOINTS
# ==========================================

class PublicPostListView(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        now = timezone.now()
        queryset = Post.objects.filter(
            status=PostStatus.PUBLISHED,
            publication_date__lte=now,
        ).select_related("author", "category").prefetch_related("tags")

        category_slug = self.request.query_params.get("category")
        tag_slug = self.request.query_params.get("tag")
        search_query = self.request.query_params.get("q")

        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if tag_slug:
            queryset = queryset.filter(tags__slug=tag_slug)
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(excerpt__icontains=search_query) |
                Q(seo_title__icontains=search_query)
            )

        return queryset.order_by("-publication_date", "-created_at")


class PublicPostDetailView(generics.RetrieveAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        now = timezone.now()
        return Post.objects.filter(
            status=PostStatus.PUBLISHED,
            publication_date__lte=now,
        ).select_related("author", "category").prefetch_related("tags", "revisions")


class PublicCampaignListView(generics.ListAPIView):
    queryset = Campaign.objects.all().order_by("pathway_stage", "-created_at")
    serializer_class = CampaignSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PublicPodcastListView(generics.ListAPIView):
    queryset = Podcast.objects.all().order_by("-publication_date")
    serializer_class = PodcastSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PublicCategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PublicCategoryDetailView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"


class PublicTagListView(generics.ListAPIView):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = None


class PublicSearchView(generics.ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        query = self.request.query_params.get("q", "").strip()
        if not query:
            return Post.objects.none()

        now = timezone.now()
        return Post.objects.filter(
            status=PostStatus.PUBLISHED,
            publication_date__lte=now,
        ).filter(
            Q(title__icontains=query) |
            Q(excerpt__icontains=query) |
            Q(seo_title__icontains=query) |
            Q(seo_description__icontains=query) |
            Q(category__name__icontains=query) |
            Q(tags__name__icontains=query)
        ).distinct().order_by("-publication_date")


# ==========================================
# PROTECTED DASHBOARD ENDPOINTS
# ==========================================

class DashboardPostListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostCreateUpdateSerializer
        return PostListSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_editor():
            queryset = Post.objects.all()
        else:
            queryset = Post.objects.filter(author=user)

        status_param = self.request.query_params.get("status")
        category_param = self.request.query_params.get("category")
        author_param = self.request.query_params.get("author")
        search_param = self.request.query_params.get("q")

        if status_param:
            queryset = queryset.filter(status=status_param.upper())
        if category_param:
            queryset = queryset.filter(category_id=category_param)
        if author_param and user.is_editor():
            queryset = queryset.filter(author_id=author_param)
        if search_param:
            queryset = queryset.filter(
                Q(title__icontains=search_param) | Q(excerpt__icontains=search_param)
            )

        return queryset.select_related("author", "category").prefetch_related("tags").order_by("-updated_at")


class DashboardPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]
    lookup_field = "id"

    def get_queryset(self):
        user = self.request.user
        if user.is_editor():
            return Post.objects.all()
        return Post.objects.filter(author=user)

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return PostCreateUpdateSerializer
        return PostDetailSerializer


class DashboardPublishView(APIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def post(self, request, id):
        try:
            post = Post.objects.get(id=id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_editor() and post.author != request.user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        post.status = PostStatus.PUBLISHED
        if not post.publication_date or post.publication_date > timezone.now():
            post.publication_date = timezone.now()
        post.save()

        PostRevision.objects.create(
            post=post,
            title_snapshot=post.title,
            content_snapshot=post.content,
            editor=request.user,
        )

        AuditLog.objects.create(user=request.user, action="PUBLISH_POST", details={"post_id": str(post.id), "title": post.title})

        # Trigger live Next.js cache revalidation automatically
        trigger_nextjs_revalidation(path=f"/blog/{post.slug}", tag="posts")

        return Response({
            "message": "Post published successfully",
            "post": PostDetailSerializer(post).data
        })


class DashboardUnpublishView(APIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def post(self, request, id):
        try:
            post = Post.objects.get(id=id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_editor() and post.author != request.user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        post.status = PostStatus.DRAFT
        post.save()

        AuditLog.objects.create(user=request.user, action="UNPUBLISH_POST", details={"post_id": str(post.id), "title": post.title})

        trigger_nextjs_revalidation(path=f"/blog/{post.slug}", tag="posts")

        return Response({
            "message": "Post unpublished successfully",
            "post": PostDetailSerializer(post).data
        })


class DashboardScheduleView(APIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def post(self, request, id):
        try:
            post = Post.objects.get(id=id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_editor() and post.author != request.user:
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)

        pub_date_str = request.data.get("publication_date")
        if not pub_date_str:
            return Response({"error": "publication_date is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            pub_date = timezone.datetime.fromisoformat(pub_date_str.replace("Z", "+00:00"))
        except ValueError:
            return Response({"error": "Invalid date format. Use ISO format."}, status=status.HTTP_400_BAD_REQUEST)

        post.status = PostStatus.SCHEDULED
        post.publication_date = pub_date
        post.save()

        AuditLog.objects.create(user=request.user, action="SCHEDULE_POST", details={"post_id": str(post.id), "pub_date": pub_date_str})

        return Response({
            "message": f"Post scheduled for {post.publication_date}",
            "post": PostDetailSerializer(post).data
        })


class DashboardPostRevisionsView(generics.ListAPIView):
    serializer_class = PostRevisionSerializer
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def get_queryset(self):
        post_id = self.kwargs.get("id")
        user = self.request.user
        if user.is_editor():
            post = generics.get_object_or_404(Post, id=post_id)
        else:
            post = generics.get_object_or_404(Post, id=post_id, author=user)
        return PostRevision.objects.filter(post=post).order_by("-created_at")


class DashboardAnalyticsView(APIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]

    def get(self, request):
        user = request.user
        if user.is_editor():
            posts_qs = Post.objects.all()
        else:
            posts_qs = Post.objects.filter(author=user)

        total_posts = posts_qs.count()
        published_posts = posts_qs.filter(status=PostStatus.PUBLISHED).count()
        draft_posts = posts_qs.filter(status=PostStatus.DRAFT).count()
        scheduled_posts = posts_qs.filter(status=PostStatus.SCHEDULED).count()

        total_categories = Category.objects.count()
        total_tags = Tag.objects.count()
        total_campaigns = Campaign.objects.count()
        total_podcasts = Podcast.objects.count()
        total_authors = User.objects.count()

        recent_posts = PostListSerializer(posts_qs.order_by("-updated_at")[:5], many=True).data
        recent_revisions = PostRevisionSerializer(
            PostRevision.objects.filter(post__in=posts_qs).order_by("-created_at")[:5],
            many=True
        ).data
        audit_logs = AuditLogSerializer(AuditLog.objects.all()[:10], many=True).data

        return Response({
            "total_posts": total_posts,
            "published_posts": published_posts,
            "draft_posts": draft_posts,
            "scheduled_posts": scheduled_posts,
            "total_categories": total_categories,
            "total_tags": total_tags,
            "total_campaigns": total_campaigns,
            "total_podcasts": total_podcasts,
            "total_authors": total_authors,
            "recent_posts": recent_posts,
            "recent_activity": recent_revisions,
            "audit_logs": audit_logs,
        })


# Dashboard Campaigns & Podcasts CRUD
class DashboardCampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all().order_by("pathway_stage", "-created_at")
    serializer_class = CampaignSerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardCampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"


class DashboardPodcastListCreateView(generics.ListCreateAPIView):
    queryset = Podcast.objects.all().order_by("-publication_date")
    serializer_class = PodcastSerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardPodcastDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"


# Category & Tag Dashboard CRUD
class DashboardCategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"


class DashboardTagListCreateView(generics.ListCreateAPIView):
    queryset = Tag.objects.all().order_by("name")
    serializer_class = TagSerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardTagDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"


class DashboardMediaListCreateView(generics.ListCreateAPIView):
    queryset = MediaAsset.objects.all().order_by("-created_at")
    serializer_class = MediaAssetSerializer
    permission_classes = [IsAuthorOrEditorOrAdmin]


class DashboardMediaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer
    permission_classes = [IsAuthorOrEditorOrAdmin]
    lookup_field = "id"


# Campaign & Podcast Dashboard and Public Views
class PublicCampaignListView(generics.ListAPIView):
    queryset = Campaign.objects.filter(status="active").order_by("pathway_stage", "-created_at")
    serializer_class = CampaignSerializer
    permission_classes = [permissions.AllowAny]


class DashboardCampaignListCreateView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all().order_by("-created_at")
    serializer_class = CampaignSerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardCampaignDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"


class PublicPodcastListView(generics.ListAPIView):
    queryset = Podcast.objects.all().order_by("-publication_date")
    serializer_class = PodcastSerializer
    permission_classes = [permissions.AllowAny]


class DashboardPodcastListCreateView(generics.ListCreateAPIView):
    queryset = Podcast.objects.all().order_by("-publication_date")
    serializer_class = PodcastSerializer
    permission_classes = [IsEditorOrAdmin]


class DashboardPodcastDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    permission_classes = [IsEditorOrAdmin]
    lookup_field = "id"



# Media Upload View (Cloudinary with local Pillow validation)
class MediaUploadView(APIView):
    permission_classes = [IsAuthorOrEditorOrAdmin]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        if "file" not in request.FILES:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES["file"]

        if image_file.size > 10 * 1024 * 1024:
            return Response({"error": "File size exceeds 10MB limit"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            img = Image.open(image_file)
            img.verify()
            image_file.seek(0)
        except Exception:
            return Response({"error": "Invalid or corrupted image file"}, status=status.HTTP_400_BAD_REQUEST)

        cloud_name = getattr(settings, "CLOUDINARY_CLOUD_NAME", "")
        api_key = getattr(settings, "CLOUDINARY_API_KEY", "")
        api_secret = getattr(settings, "CLOUDINARY_API_SECRET", "")

        file_url = ""
        if cloud_name and api_key and api_secret:
            try:
                cloudinary.config(
                    cloud_name=cloud_name,
                    api_key=api_key,
                    api_secret=api_secret
                )
                res = cloudinary.uploader.upload(
                    image_file,
                    folder="carcino_cms_media",
                    resource_type="image",
                )
                file_url = res.get("secure_url") or res.get("url")
            except Exception as e:
                return Response({"error": f"Cloudinary upload failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            import base64
            image_bytes = image_file.read()
            format_name = (img.format or "JPEG").lower()
            b64_str = base64.b64encode(image_bytes).decode("utf-8")
            file_url = f"data:image/{format_name};base64,{b64_str}"

        # Create MediaAsset record
        media_asset = MediaAsset.objects.create(
            name=image_file.name,
            file_url=file_url,
            file_size=image_file.size,
            file_type=image_file.content_type or "image",
            alt_text=request.data.get("alt_text", image_file.name),
        )

        return Response({
            "id": str(media_asset.id),
            "url": file_url,
            "name": media_asset.name,
            "alt_text": media_asset.alt_text,
        })
