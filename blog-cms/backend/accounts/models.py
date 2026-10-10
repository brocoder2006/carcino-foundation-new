import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.TextChoices):
    ADMIN = "ADMIN", "Admin"
    EDITOR = "EDITOR", "Editor"
    AUTHOR = "AUTHOR", "Author"


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.AUTHOR,
    )
    bio = models.TextField(blank=True, default="")
    avatar_url = models.URLField(blank=True, null=True)

    REQUIRED_FIELDS = ["email"]

    def is_admin(self):
        return self.role == UserRole.ADMIN or self.is_superuser

    def is_editor(self):
        return self.role in [UserRole.ADMIN, UserRole.EDITOR] or self.is_superuser

    def __str__(self):
        return f"{self.username} ({self.role})"
