import traceback

from django.shortcuts import redirect, render


def home():
    return redirect('main:home')


def error_page(request, title, description):

    return render(request, 'main/404.html', {
        "user": request.user,
        "title": title,
        "description": description,
        "trace": traceback.format_exc()
    })
