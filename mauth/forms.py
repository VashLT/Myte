from django import forms

from mauth.models import User, Carrera, Niveleducativo

from mauth.templates.widgets import FengyuanChenDatePicker

from mauth import utils

TIME_FORMAT = r"%d/%m/%Y"


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(max_length=100, widget=forms.PasswordInput())


class RegisterForm(forms.Form):
    # stage 1
    username = forms.CharField(max_length=100)
    fullname = forms.CharField(max_length=100)
    email = forms.CharField(max_length=100)
    birthdate = forms.DateTimeField(
        label="Fecha de nacimiento",
        input_formats=[TIME_FORMAT, ],
        required=True,
        widget=FengyuanChenDatePicker()
    )
    pw1 = forms.CharField(max_length=100, widget=forms.PasswordInput())
    pw2 = forms.CharField(max_length=100, widget=forms.PasswordInput())

    # stage 2
    career = forms.CharField(
        max_length=100,
        widget=forms.Select(choices=Carrera.get_choices())
    )
    level = forms.CharField(
        max_length=100,
        widget=forms.Select(choices=Niveleducativo.get_choices())
    )

    @property
    def media(self):
        return self.fields['birthdate'].widget.media
