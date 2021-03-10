from hashlib import sha256
from config import Config
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


def get_id(cursor, table_name, id=None):
    if not id:
        id = "".join(["id_", table_name.lower()])
    cursor.execute(f"""
        SELECT {id} FROM {table_name} ORDER BY {id} DESC LIMIT 1
    """)
    raw_result = cursor.fetchone()
    if not raw_result:
        return 1
    return int(raw_result[0]) + 1


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS


def format_path(path):
    subpath = path.split("static")[-1][1:]
    return subpath.replace("\\", "/")
