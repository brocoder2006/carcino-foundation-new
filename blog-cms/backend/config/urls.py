from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health_check(request):
    return JsonResponse({"status": "ok", "message": "Backend service is healthy"})


urlpatterns = [
    path("", health_check, name="health-check-root"),
    path("health/", health_check, name="health-check-slash"),
    path("healthz", health_check, name="health-check-z"),
    path("api/health/", health_check, name="health-check-api"),
    path("admin/", admin.site.urls),
    path("api/v1/accounts/", include("accounts.urls")),
    path("api/v1/", include("blog.urls")),
]
