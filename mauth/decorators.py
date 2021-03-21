from django.shortcuts import redirect

def unauthenticated_user(view):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('main:home')
        else:
            return view(request, *args, **kwargs)
    return wrapper