# class CheckAuth(View):

#     def get(self, request):
#         response = {
#             'data': {
#                 'username': 'test',
#                 'avatarurl': 'test.png',
#                 'email': 'test',
#             }
#         }

#         return JsonResponse(response)

# class RegisterUser(View):

#     def get(self, request):

#         username = 'Jose'

#         if not utils.username_exists(username):
#             user = User.objects.create_user(username, 'jose@gmail.com', 'root') #type: ignore
#             user.save()

#             response = {
#                 'result': 'Success'
#             }
        
#         else:
#             response = {
#                 'result': 'Username already exists'
#             }

#         return JsonResponse(response)
    
#     def post(self, request):
#         username = request.headers['username']
#         name = request.headers['name'] #This will be user when the User model is ready
#         email = request.headers['email']
#         password = request.headers['password']

#         if not utils.username_exists(username):
#             user = User.objects.create_user(username, email, password) #type: ignore
#             user.save()

#             response = {
#                 'result': 'Success'
#             }
        
#         else:
#             response = {
#                 'result': 'Username already exists'
#             }

#         return JsonResponse(response)

# @method_decorator(csrf_exempt, name='dispatch')
# class LoginUser(View):

#     def get(self, request):
#         username = 'Jose'
#         password = 'root'

#         return JsonResponse(self.login_user(request, username, password))
    
#     def post(self, request):
#         username = request.headers['username']
#         password = request.headers['password']
        
#         return JsonResponse(self.login_user(request, username, password))

#     def options(self, request):
#         print('He sido opcionado!')
#         response = HttpResponse(status=200)
#         response['Access-Control-Allow-Origin'] = '*'

#         return response

#     def login_user(self, request, username, password):
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)
#             response = {
#                 'info': 'success validation',
#                 'success': 'whatever',
#                 }

#         else:
#             response = {
#                 'info': 'password or username are not valid',
#                 'failure': 'whatever',
#                 }

#         return response