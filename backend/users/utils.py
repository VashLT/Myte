from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

def username_exists(username):
    if User.objects.filter(username=username).exists():
        return True
    
    return False

class TokenAuthSupportCookie(TokenAuthentication):
    """
    Extend the TokenAuthentication class to support cookie based authentication
    """
    def authenticate(self, request):
        # Check if 'access_token' is in the request cookies.
        # Give precedence to 'Authorization' header.
        print('He sido engalletado!')
        if 'access_token' in request.COOKIES:
            print(request.COOKIES.get('access_token'))
            return self.authenticate_credentials(request.COOKIES.get('access_token'))

        return super().authenticate(request)