from hashlib import sha256
import re


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


def is_email(email):
    return re.match(
        r"[A-Za-z0-9.]+@[A-Za-z.]+[A-Za-z]$", email
    )


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


def dictionarize(cursor, table_name, id=None, value='nombre'):
    if not id:
        id = "".join(["id_", table_name.lower()])
    cursor.execute(f"""
        SELECT {id}, {value} FROM {table_name}
    """)
    raw_result = cursor.fetchall()
    return dict(raw_result)
