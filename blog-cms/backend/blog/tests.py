from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from datetime import timedelta
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import User, UserRole
from blog.models import Category, Tag, Post, PostRevision, PostStatus
from django.core.management import call_command


class BlogModelAndApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username="admin", email="admin@example.com", password="password123", role=UserRole.ADMIN
        )
        self.author1 = User.objects.create_user(
            username="author1", email="author1@example.com", password="password123", role=UserRole.AUTHOR
        )
        self.author2 = User.objects.create_user(
            username="author2", email="author2@example.com", password="password123", role=UserRole.AUTHOR
        )

        self.category = Category.objects.create(name="Tech", description="Technology articles")
        self.tag = Tag.objects.create(name="Django")

        # Published post
        self.published_post = Post.objects.create(
            title="Published Post Title",
            content={"type": "doc", "content": [{"type": "paragraph", "text": "Hello world"}]},
            excerpt="Excerpt of published post",
            author=self.author1,
            category=self.category,
            status=PostStatus.PUBLISHED,
            publication_date=timezone.now() - timedelta(days=1),
        )

        # Draft post
        self.draft_post = Post.objects.create(
            title="Draft Post Title",
            content={"type": "doc", "content": []},
            author=self.author1,
            category=self.category,
            status=PostStatus.DRAFT,
        )

        # Scheduled post
        self.scheduled_post = Post.objects.create(
            title="Scheduled Post Title",
            content={"type": "doc", "content": []},
            author=self.author2,
            category=self.category,
            status=PostStatus.SCHEDULED,
            publication_date=timezone.now() - timedelta(minutes=10),
        )

    def test_slug_collision_handling(self):
        p1 = Post.objects.create(title="Unique Title Test", author=self.author1)
        p2 = Post.objects.create(title="Unique Title Test", author=self.author1)
        self.assertEqual(p1.slug, "unique-title-test")
        self.assertEqual(p2.slug, "unique-title-test-1")

    def test_public_posts_api_privacy(self):
        url = reverse("public-post-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should only return published posts (1 post)
        results = response.data.get("results", response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["title"], "Published Post Title")

    def test_public_post_detail_privacy(self):
        # Published post detail -> 200
        pub_url = reverse("public-post-detail", kwargs={"slug": self.published_post.slug})
        response = self.client.get(pub_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Draft post detail -> 404 for public
        draft_url = reverse("public-post-detail", kwargs={"slug": self.draft_post.slug})
        response = self.client.get(draft_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_dashboard_posts_author_isolation(self):
        url = reverse("dashboard-post-list-create")
        self.client.force_authenticate(user=self.author1)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get("results", response.data)
        # Author 1 should see only their 2 posts (published_post & draft_post)
        self.assertEqual(len(results), 2)

        # Admin sees all 3 posts
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(url)
        results = response.data.get("results", response.data)
        self.assertEqual(len(results), 3)

    def test_post_creation_and_revision(self):
        url = reverse("dashboard-post-list-create")
        self.client.force_authenticate(user=self.author1)
        payload = {
            "title": "New Created Post",
            "excerpt": "My new excerpt",
            "content": {"type": "doc", "content": []},
            "status": "DRAFT",
            "tag_names": ["React", "Python"],
        }
        response = self.client.post(url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        created_id = response.data["id"]
        post = Post.objects.get(id=created_id)
        self.assertEqual(post.author, self.author1)
        self.assertEqual(post.revisions.count(), 1)
        self.assertEqual(post.tags.count(), 2)

    def test_publish_unpublish_flow(self):
        self.client.force_authenticate(user=self.author1)
        pub_url = reverse("dashboard-post-publish", kwargs={"id": self.draft_post.id})
        response = self.client.post(pub_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.draft_post.refresh_from_db()
        self.assertEqual(self.draft_post.status, PostStatus.PUBLISHED)

        unpub_url = reverse("dashboard-post-unpublish", kwargs={"id": self.draft_post.id})
        response = self.client.post(unpub_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.draft_post.refresh_from_db()
        self.assertEqual(self.draft_post.status, PostStatus.DRAFT)

    def test_publish_scheduled_posts_command(self):
        self.assertEqual(self.scheduled_post.status, PostStatus.SCHEDULED)
        call_command("publish_scheduled_posts")
        self.scheduled_post.refresh_from_db()
        self.assertEqual(self.scheduled_post.status, PostStatus.PUBLISHED)

    def test_author_cannot_modify_other_author_post(self):
        self.client.force_authenticate(user=self.author1)
        other_post_url = reverse("dashboard-post-detail", kwargs={"id": self.scheduled_post.id})
        response = self.client.patch(other_post_url, {"title": "Hacked Title"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_campaign_and_podcast_endpoints(self):
        self.client.force_authenticate(user=self.admin)
        # Campaign creation
        camp_url = reverse("dashboard-campaign-list-create")
        camp_res = self.client.post(camp_url, {
            "title": "Stage 01 Navigation",
            "pathway_stage": "stage-01",
            "summary": "Clinical navigation support"
        }, format="json")
        self.assertEqual(camp_res.status_code, status.HTTP_201_CREATED)

        # Public campaign list
        pub_camp_url = reverse("public-campaign-list")
        res = self.client.get(pub_camp_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Podcast creation
        pod_url = reverse("dashboard-podcast-list-create")
        pod_res = self.client.post(pod_url, {
            "code": "TCF 101",
            "title": "Oncology Today",
            "description": "Episode 1"
        }, format="json")
        self.assertEqual(pod_res.status_code, status.HTTP_201_CREATED)

        # Public podcast list
        pub_pod_url = reverse("public-podcast-list")
        res2 = self.client.get(pub_pod_url)
        self.assertEqual(res2.status_code, status.HTTP_200_OK)

