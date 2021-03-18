from django import forms

from mauth.templates.widgets import FengyuanChenDatePicker

TIME_FORMAT = r"%d/%m/%Y"


class RegisterForm(forms.Form):
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

    @property
    def media(self):
        return self.fields['birthdate'].widget.media
