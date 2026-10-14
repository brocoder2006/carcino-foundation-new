from datetime import timedelta
from django.utils import timezone
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import User, UserRole


class AccountsModelAndApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username="adminuser",
            email="admin@example.com",
            password="adminpassword123",
            role=UserRole.ADMIN,
        )
        self.editor_user = User.objects.create_user(
            username="editoruser",
            email="editor@example.com",
            password="editorpassword123",
            role=UserRole.EDITOR,
        )
        self.author_user = User.objects.create_user(
            username="authoruser",
            email="author@example.com",
            password="authorpassword123",
            role=UserRole.AUTHOR,
        )

    def test_user_roles(self):
        self.assertTrue(self.admin_user.is_admin())
        self.assertTrue(self.editor_user.is_editor())
        self.assertFalse(self.author_user.is_editor())

    def test_login_api_success(self):
        url = reverse("auth-login")
        response = self.client.post(url, {
            "username_or_email": "authoruser",
            "password": "authorpassword123",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("token", response.data)
        self.assertEqual(response.data["user"]["username"], "authoruser")

    def test_login_api_with_email(self):
        url = reverse("auth-login")
        response = self.client.post(url, {
            "username_or_email": "editor@example.com",
            "password": "editorpassword123",
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["user"]["username"], "editoruser")

    def test_login_api_failure(self):
        url = reverse("auth-login")
        response = self.client.post(url, {
            "username_or_email": "authoruser",
            "password": "wrongpassword",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_current_user_authenticated(self):
        self.client.force_authenticate(user=self.author_user)
        url = reverse("auth-me")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "authoruser")

    def test_user_management_admin_only(self):
        url = reverse("user-list-create")

        # Anonymous request -> 401
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Author request -> 403 Forbidden
        self.client.force_authenticate(user=self.author_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Admin request -> 200 OK
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_rotation_on_login(self):
        url = reverse("auth-login")
        # First login
        res1 = self.client.post(url, {
            "username_or_email": "authoruser",
            "password": "authorpassword123",
        })
        self.assertEqual(res1.status_code, status.HTTP_200_OK)
        token1 = res1.data["token"]

        # Second login
        res2 = self.client.post(url, {
            "username_or_email": "authoruser",
            "password": "authorpassword123",
        })
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        token2 = res2.data["token"]

        # Tokens must be different (rotated)
        self.assertNotEqual(token1, token2)

        # Old token must no longer exist in DB
        self.assertFalse(Token.objects.filter(key=token1).exists())
        self.assertTrue(Token.objects.filter(key=token2).exists())

    def test_token_expiration(self):
        # Create a fresh token for author
        token = Token.objects.create(user=self.author_user)
        url = reverse("auth-me")

        # Active token works
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
        res = client.get(url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Age the token beyond 7 days
        Token.objects.filter(key=token.key).update(
            created=timezone.now() - timedelta(days=8)
        )

        # Expired token is rejected
        res_expired = client.get(url)
        self.assertEqual(res_expired.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("expired", str(res_expired.data).lower())

        # Expired token has been purged
        self.assertFalse(Token.objects.filter(key=token.key).exists())
