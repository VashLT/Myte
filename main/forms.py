from django import forms

from main.models import Pinpago, Tarjetacredito

from mauth.templates.widgets import FengyuanChenDatePicker


class UpgradeForm(forms.Form):
    pay_method = forms.CharField(
        max_length=100,
        widget=forms.Select(
            choices=((1, "Tarjeta de Credito"), (2, "Pin de pago")))
    )
