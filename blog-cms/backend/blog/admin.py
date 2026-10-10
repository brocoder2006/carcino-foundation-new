from django.contrib import admin
from .models import Category, Tag, Post, PostRevision


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "created_at"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "category", "status", "publication_date", "created_at"]
    list_filter = ["status", "category", "created_at", "publication_date"]
    search_fields = ["title", "slug", "excerpt"]
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ["tags"]


@admin.register(PostRevision)
class PostRevisionAdmin(admin.ModelAdmin):
    list_display = ["post", "editor", "created_at"]
    list_filter = ["created_at"]
