from django import template

register = template.Library()


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
