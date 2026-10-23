from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.authtoken.models import Token
from django.contrib.auth import login as django_login, logout as django_logout
from django.core.cache import cache
from .models import User
from .serializers import (
    UserSerializer,
    UserCreateSerializer,
    LoginSerializer,
    PasswordChangeSerializer,
)
from .permissions import IsAdminUserRole, IsEditorOrAdmin


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "unknown")


class LoginView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "login"

    def post(self, request):
        raw_ident = str(request.data.get("username_or_email", "")).strip().lower()
        client_ip = get_client_ip(request)

        user_lock_key = f"lockout_user_{raw_ident}"
        ip_lock_key = f"lockout_ip_{client_ip}"

        if cache.get(user_lock_key) or cache.get(ip_lock_key):
            return Response(
                {"error": "Account or IP is temporarily locked due to multiple failed login attempts. Please try again in 15 minutes."},
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            # Record failed attempt
            user_fails_key = f"fails_user_{raw_ident}"
            ip_fails_key = f"fails_ip_{client_ip}"

            user_fails = (cache.get(user_fails_key) or 0) + 1
            ip_fails = (cache.get(ip_fails_key) or 0) + 1

            cache.set(user_fails_key, user_fails, timeout=900)
            cache.set(ip_fails_key, ip_fails, timeout=900)

            if user_fails >= 5:
                cache.set(user_lock_key, True, timeout=900)
            if ip_fails >= 10:
                cache.set(ip_lock_key, True, timeout=900)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Successful authentication: clear failure counters
        cache.delete(f"fails_user_{raw_ident}")
        cache.delete(user_lock_key)

        user = serializer.validated_data["user"]
        
        # Django session login
        django_login(request, user)

        # DRF Token rotation: purge any existing token so previous sessions/leaked keys are invalidated
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)

        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
            "message": "Login successful",
        }, status=status.HTTP_200_OK)


class PasswordChangeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        user = request.user
        user.set_password(serializer.validated_data["new_password"])
        user.save()

        # Token rotation on password change
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)

        # Log security audit entry
        try:
            from blog.models import AuditLog
            AuditLog.objects.create(
                user=user,
                action="PASSWORD_CHANGE",
                details={"message": f"Password changed successfully for user {user.username}"}
            )
        except Exception:
            pass

        return Response({
            "message": "Password changed successfully. Your session has been updated.",
            "token": token.key,
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if hasattr(request.user, "auth_token"):
            request.user.auth_token.delete()
        django_logout(request)
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by("-date_joined")

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUserRole()]
        return [IsEditorOrAdmin()]


    def get_serializer_class(self):
        if self.request.method == "POST":
            return UserCreateSerializer
        return UserSerializer


class UserDetailUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUserRole]

