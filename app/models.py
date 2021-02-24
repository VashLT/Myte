from flask_login import UserMixin
from . import db


class User(db.Model, UserMixin):
    # TODO: create missing models and set relations
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    email = db.Column(db.String(100))

    fecha_registro = db.Column(db.DateTime)
    fecha_nacimiento = db.Column(db.DateTime)

    def __repr__(self):
        return "<User %r>" % self.nombre

