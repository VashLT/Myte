from . import db

from flask_login import UserMixin
from sqlalchemy.sql import func

# pylint: disable=bad-option-value
# pylint: disable=no-member


class Usuario(db.Model, UserMixin):
    __tablename__ = 'usuario'
    id = db.Column('id_usuario', db.Integer, primary_key=True)
    id_rol = db.Column(db.Integer, db.ForeignKey(
        'rol.id_rol'))
    nombre_usuario = db.Column(
        'nombre_usuario',
        db.String(100),
        db.ForeignKey('metausuario.nombre_usuario')
    )
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    fecha_registro = db.Column(db.DateTime(timezone=True), default=func.now())
    fecha_nacimiento = db.Column(db.DateTime())

    historial = db.relationship(
        'Historial', backref='usuario', lazy=True, uselist=True)

    def __repr__(self):
        return "<User %r>" % self.nombre

    def get_id(self):
        return self.id

    def is_premium(self):
        if self.id_rol == 1:
            return False
        return True


class MetaUsuario(db.Model):
    __tablename__ = 'metausuario'
    nombre_usuario = db.Column(db.String(100), primary_key=True)
    clave_encriptada = db.Column(db.String(100))
    usuario = db.relationship(
        'Usuario', backref='metausuario', lazy=True, uselist=False)


class Historial(db.Model):
    __tablename__ = "historial"
    id = db.Column('id_historial', db.Integer, primary_key=True)
    id_usuario = db.Column(
        db.Integer,
        db.ForeignKey('usuario.id_usuario'),
    )
    id_formula = db.Column(
        db.Integer,
        db.ForeignKey('formula.id_formula'),
    )
    fecha_registro = db.Column(db.DateTime(timezone=True), default=func.now())


class Formula(db.Model):
    __tablename__ = 'formula'
    id = db.Column('id_formula', db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    codigo_latex = db.Column(db.String(250))
    fecha_creacion = db.Column(db.DateTime(timezone=True), default=func.now())
    creada = db.Column(db.Boolean, nullable=False)
    eliminada = db.Column(db.Boolean, nullable=False)

    imagen = db.relationship(
        'Imagen', backref='formula', lazy=True, uselist=True)
    script = db.relationship(
        'Script', backref='formula', lazy=True, uselist=False)
    historial = db.relationship(
        'Historial', backref='formula', lazy=True, uselist=True)

    def __repr__(self):
        return "<Formula %r>" % self.nombre

    def is_created(self):
        return self.creada


class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column('id_tag', db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id_usuario'))
    nombre = db.Column(db.String(100), nullable=False)


class TagFormula(db.Model):
    __tablename__ = 'tagformula'
    id_tag = db.Column(
        db.Integer,
        db.ForeignKey('tag.id_tag'),
        primary_key=True
    )
    id_formula = db.Column(
        db.Integer,
        db.ForeignKey('formula.id_formula'),
        primary_key=True
    )


class Imagen(db.Model):
    __tablename__ = "imagen"
    id = db.Column('id_imagen', db.Integer, primary_key=True)
    id_formula = db.Column(db.Integer, db.ForeignKey('formula.id_formula'))
    path = db.Column(db.String(200), nullable=False)


class Script(db.Model):
    __tablename__ = "script"
    id = db.Column('id_script', db.Integer, primary_key=True)
    id_formula = db.Column(
        db.Integer,
        db.ForeignKey('formula.id_formula'),
        primary_key=True
    )
    contenido = db.Column(db.String(1000), nullable=False)
    variables_script = db.Column(db.String(100))


class Rol(db.Model):
    __tablename__ = 'rol'
    id = db.Column("id_rol", db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    usuario = db.relationship('Usuario', backref='rol',
                              lazy=True, uselist=False)
