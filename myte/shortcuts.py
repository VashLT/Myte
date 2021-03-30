from django.shortcuts import redirect

def home():
    return redirect('main:home')