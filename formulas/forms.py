from django import forms

from mauth.models import User, Carrera, Niveleducativo

from mauth.templates.widgets import FengyuanChenDatePicker

from mauth import utils

TIME_FORMAT = r"%d/%m/%Y"


class AddFormulaForm(forms.Form):
    # stage 1
    nombre = forms.CharField(max_length=100)
    codigo_latex = forms.CharField(max_length=250, widget=forms.Textarea)
    
