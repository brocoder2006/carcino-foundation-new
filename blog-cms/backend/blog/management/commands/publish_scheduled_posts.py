from django.core.management.base import BaseCommand
from django.utils import timezone
from blog.models import Post, PostStatus


class Command(BaseCommand):
    help = "Publish posts that are scheduled for publication at or before the current time."

    def handle(self, *args, **options):
        now = timezone.now()
        scheduled_posts = Post.objects.filter(
            status=PostStatus.SCHEDULED,
            publication_date__lte=now,
        )

        count = 0
        for post in scheduled_posts:
            post.status = PostStatus.PUBLISHED
            post.save(update_fields=["status"])
            self.stdout.write(
                self.style.SUCCESS(f"Successfully published scheduled post '{post.title}' (ID: {post.id})")
            )
            count += 1

        self.stdout.write(self.style.SUCCESS(f"Finished publishing {count} scheduled post(s)."))
