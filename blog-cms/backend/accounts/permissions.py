from rest_framework import permissions
from .models import UserRole


class IsAdminUserRole(permissions.BasePermission):
    """Allows access only to Admin users."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin())


class IsEditorOrAdmin(permissions.BasePermission):
    """Allows access to Editors and Admins."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_editor())


class IsAuthorOrEditorOrAdmin(permissions.BasePermission):
    """Allows access to authenticated Authors, Editors, and Admins."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.user.is_editor():
            return True
        # Authors can only modify their own posts
        if hasattr(obj, "author"):
            return obj.author == request.user
        return False
