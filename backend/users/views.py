from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login


from django.contrib.auth.models import User, Group

from users import utils

class CheckAuth(View):

    def get(self, request):
        response = {
            'data': {
                'username': 'test',
                'avatarurl': 'test.png',
                'email': 'test',
            }
        }

        return JsonResponse(response)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterUser(View):

    def get(self, request):

        username = 'Jose'

        if not utils.username_exists(username):
            user = User.objects.create_user(username, 'jose@gmail.com', 'root') #type: ignore
            user.save()

            response = {
                'result': 'Success'
            }
        
        else:
            response = {
                'result': 'Username already exists'
            }

        return JsonResponse(response)
    
    def post(self, request):
        username = request.headers['username']
        name = request.headers['name'] #This will be user when the User model is ready
        email = request.headers['email']
        password = request.headers['password']

        if not utils.username_exists(username):
            user = User.objects.create_user(username, email, password) #type: ignore
            user.save()

            response = {
                'result': 'Success'
            }
        
        else:
            response = {
                'result': 'Username already exists'
            }

        return JsonResponse(response)

@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(View):

    def get(self, request):
        username = 'Jose'
        password = 'root'

        return JsonResponse(self.login_user(request, username, password))
    
    def post(self, request):
        username = request.headers['username']
        password = request.headers['password']
        
        return JsonResponse(self.login_user(request, username, password))

    def login_user(self, request, username, password):
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            response = {'result': 'Success'}

        else:
            response = {'result': 'Username already exists'}

        return response