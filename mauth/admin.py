from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import ReadOnlyPasswordHashField


from mauth.models import User, MetaUser, Rol
from mauth import utils


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('meta', 'nombre',
                  'email', 'fecha_nacimiento', 'rol')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        meta = MetaUser(
            nombre_usuario=self.cleaned_data["nombre_usuario"],
        )
        meta.set_password(self.cleaned_data["password1"])
        if commit:
            meta.save()
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('meta', 'nombre',
                  'email', 'fecha_nacimiento', 'rol', 'is_active')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    list_display = ('meta', 'nombre', 'email')
    list_filter = ()
    fieldsets = (
        (None, {'fields': ('meta',)}),
        ('Personal info', {'fields': ('nombre', 'email', 'fecha_nacimiento')}),
        ('Permissions', {'fields': ('rol',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    search_fields = ('meta', 'email')
    ordering = ('meta', 'email')
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
admin.register(MetaUser)
admin.register(Rol)
