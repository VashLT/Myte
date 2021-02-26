from . import db

from flask_login import UserMixin
from sqlalchemy.sql import func


class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    nombre_usuario = db.Column(
        db.String(100), db.ForeignKey('metausuario.nombre_usuario'))
    nombre = db.Column(db.String(100))
    email = db.Column(db.String(100))

    fecha_registro = db.Column(db.DateTime(timezone=True), default=func.now())
    fecha_nacimiento = db.Column(db.DateTime())

    meta = db.relationship('MetaUsuario')

    def __repr__(self):
        return "<User %r>" % self.nombre


class MetaUsuario(db.Model):
    __tablename__ = 'metausuario'
    nombre_usuario = db.Column(db.String(100), primary_key=True)
    clave_encriptada = db.Column(db.String(100))


class Formula(db.Model):
    __tablename__ = 'formula'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    codigo_latex = db.Column(db.String(250))
    fecha_creacion = db.Column(db.DateTime)
    creada = db.Column(db.Boolean)
    eliminada = db.Column(db.Boolean, )
