from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

# Token expiration in days (default: 7 days)
TOKEN_EXPIRE_DAYS = getattr(settings, "TOKEN_EXPIRE_DAYS", 7)


class ExpiringTokenAuthentication(TokenAuthentication):
    """
    Extends DRF TokenAuthentication to provide token expiration.
    Tokens older than TOKEN_EXPIRE_DAYS (default: 7 days) are rejected
    with an AuthenticationFailed error and purged from the database.
    """

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related("user").get(key=key)
        except model.DoesNotExist:
            raise AuthenticationFailed("Invalid or expired token.")

        if not token.user.is_active:
            raise AuthenticationFailed("User account is inactive or deleted.")

        # Check token expiration
        time_elapsed = timezone.now() - token.created
        if time_elapsed > timedelta(days=TOKEN_EXPIRE_DAYS):
            token.delete()
            raise AuthenticationFailed("Authentication token has expired. Please log in again.")

        return (token.user, token)
