from datetime import datetime
from hashlib import sha256
from django.core.validators import EmailValidator, ValidationError
import re


def validate_username(UserClass, username):
    try:
        UserClass.objects.get(pk=username)
        return False
    except UserClass.DoesNotExist:
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
            password: str
            output: password encrypted
        """
    return sha256(password.encode()).hexdigest()


def is_email(email, simple=False):
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
    if isinstance(date, datetime):
        return date.strftime(new_format)
    return datetime.strptime(date, old_format).strftime(new_format)


def format_newline(latex):
    """
        format latex code with '\n' in it to html newline for each newline char
    """
    splits = latex.split(r"\n")
    return "$$ $$".join(splits)


def format_tags(tags):
    fmt = []
    for tag in tags:
        block = "-".join(tag.nombre.split(" "))
        fmt.append("".join(["#", block]))
    return fmt


def populate_cache(POST, cache, data_map):
    """
        translates keys in POST to Model fields based on data_map dict
        args:
            POST: QueryDict
            cache: dict
            data_map: dict-like {
                'key': 
                {
                'sub_key': [value, func], 
                'sub_key2': value ...}
                }
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


def get_choices(Model):
    return tuple([
        (obj.id, obj.nombre) for obj in Model.objects.all()
    ])
