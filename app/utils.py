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



