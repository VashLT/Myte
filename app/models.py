from . import db

from flask_login import UserMixin
from sqlalchemy.sql import func


class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'
    id_usuario = db.Column(db.Integer, primary_key=True)
    id_rol = db.Column(db.Integer, db.ForeignKey(
        'rol.id_rol', ondelete='CASCADE'))
    nombre_usuario = db.Column(
        'nombre_usuario',
        db.String(100),
        db.ForeignKey('metausuario.nombre_usuario', ondelete='CASCADE')
    )
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    fecha_registro = db.Column(db.DateTime(timezone=True), default=func.now())
    fecha_nacimiento = db.Column(db.DateTime())

    def __repr__(self):
        return "<User %r>" % self.nombre


class MetaUsuario(db.Model):
    __tablename__ = 'metausuario'
    nombre_usuario = db.Column(db.String(100), primary_key=True)
    clave_encriptada = db.Column(db.String(100))
    usuario = db.relationship('Usuario', backref='metausuario', lazy=True)


class Formula(db.Model):
    __tablename__ = 'formula'
    id = db.Column('id_formula', db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    codigo_latex = db.Column(db.String(250))
    fecha_creacion = db.Column(db.DateTime(timezone=True), default=func.now())
    creada = db.Column(db.Boolean, nullable=False)
    eliminada = db.Column(db.Boolean, nullable=False)


class Rol(db.Model):
    __tablename__ = 'rol'
    id = db.Column("id_rol", db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    usuario = db.relationship('Usuario', backref='rol', lazy=True)
