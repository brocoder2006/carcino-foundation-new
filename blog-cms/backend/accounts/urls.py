from django.urls import path
from .views import LoginView, LogoutView, CurrentUserView, UserListCreateView, UserDetailUpdateView

urlpatterns = [
    path("login/", LoginView.as_view(), name="auth-login"),
    path("logout/", LogoutView.as_view(), name="auth-logout"),
    path("me/", CurrentUserView.as_view(), name="auth-me"),
    path("users/", UserListCreateView.as_view(), name="user-list-create"),
    path("users/<uuid:pk>/", UserDetailUpdateView.as_view(), name="user-detail-update"),
]
