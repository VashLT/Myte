from datetime import datetime
from hashlib import sha256
from django.core.validators import EmailValidator, ValidationError
import re


def validate_username(UserClass, username):
    if UserClass.objects.filter(pk=username).exists():
        return False
    return True


def display(ModelClass):
    print(f"Listing below data from {ModelClass.__name__}")
    [print(obj) for obj in ModelClass.objects.all()]


def format_name(name):
    return " ".join([
        name_part.capitalize()
        for name_part in name.split(" ")
    ])


def encrypt(password):
    """
            > password: str

            OUTPUT: password encrypted (str)
        """
    return sha256(password.encode()).hexdigest()


def is_email(email, simple=False):
    """
        if 'simple' is True performs a basic email regex
    """
    if simple:
        return re.match(
            r"[A-Za-z0-9.]+@[A-Za-z.]+[A-Za-z]$",
            email
        )
    try:
        EmailValidator(email)
        return True
    except ValidationError:
        return False


def format_date(date, old_format=r"%d/%m/%Y", new_format=r"%Y-%m-%d"):
    """
        handles Django required date format
    """
    if isinstance(date, datetime):
        return date.strftime(new_format)
    return datetime.strptime(date, old_format).strftime(new_format)


def format_tags(tags):
    """
        returns tags-like #{tag name}
    """
    fmt = []
    for tag in tags:
        block = "-".join(tag.nombre.split(" "))
        fmt.append("".join(["#", block]))
    return fmt


def populate_cache(POST, cache, data_map):
    """
        translates keys in POST to Model fields based on data_map dict
        POST > QueryDict
        cache > dict
        data_map > dict-like {
            'key': 
            {
            'sub_key': [value, func], 
            'sub_key2': value ...}
            }

        OUTPUT: None, cache ref is affected

    """
    for key, value in data_map.items():
        cache.setdefault(key, {})
        temp_dict = {}
        for key_map, value_map in value.items():
            if isinstance(value_map, list):
                new_key = value_map[0]
                func = value_map[1]
                val = func(POST[key_map])
            else:
                new_key = value_map
                val = POST[key_map]
            temp_dict.setdefault(new_key, val)
        cache[key].update(temp_dict)
