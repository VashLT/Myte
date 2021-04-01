from django import template

from django.utils.translation import gettext as _

from django.utils.html import mark_safe

register = template.Library()


@register.filter
def call_method(obj, method_name, *args):
    method = getattr(obj, method_name)
    return method(*args)


@register.filter
def level2class(level):
    """
        map integer to css flash class based on:
        DEBUG	10
        INFO	20
        SUCCESS	25
        WARNING	30
        ERROR	40

    """
    body = "flash-box--"
    cat = ""
    if level == 10:
        cat = "debug"
    elif level == 20:
        cat = "info"
    elif level == 25:
        cat = "success"
    elif level == 30:
        cat = "warning"
    else:
        cat = "error"
    return body + cat


@register.filter
def default_option(body, name):
    if name == 'career':
        text = "Seleccionar carrera"

    elif name == 'level':
        text = "Nivel educativo"

    else:
        text = "Seleccionar"

    tag = _('<option value="select">%(text)s</option>' % {'text': text})

    split_body = str(body).split("\n")
    split_body.insert(1, tag)

    return mark_safe('\n'.join(split_body))
