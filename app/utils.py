from hashlib import sha256

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



