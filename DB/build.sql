SHOW TABLES;

DROP DATABASE IF EXISTS Myte;

CREATE DATABASE Myte;
USE Myte;

-- creates
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY,
    id_rol INT,
    id_historial INT,
    nombre_usuario VARCHAR(100),
    nombre VARCHAR(100) NOT NULL,
    fecha_registro DATE,
    email VARCHAR(120) NOT NULL,
    fecha_nacimiento DATE
);

CREATE TABLE Historial(
    id_historial INT PRIMARY KEY,
    id_usuario INT,
    id_formula INT,
    fecha_registro DATE
);

CREATE TABLE Indice(
    id_index INT PRIMARY KEY,
    id_usuario INT,
    id_formula INT
);

CREATE TABLE Tag(
    id_tag INT PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE PinPago(
    id_pinpago INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    valor DOUBLE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    ref_pago INT NOT NULL,
    pin INT NOT NULL
);

CREATE TABLE UsuarioTarjeta(
    id_tarjetacredito INT,
    id_usuario INT,
    valor DOUBLE,
    PRIMARY KEY (id_tarjetacredito, id_usuario)
);

CREATE TABLE Rol(
    id_rol INT PRIMARY KEY,
    nombre VARCHAR(100)
);

CREATE TABLE TarjetaCredito(
    id_tarjetacredito INT PRIMARY KEY,
    numero INT NOT NULL,
    fecha_caducidad DATE,
    CVV INT
);

CREATE TABLE Interes(
    id_usuario INT,
    id_carrera INT,
    PRIMARY KEY (id_usuario, id_carrera)
);

CREATE TABLE Carrera(
    id_carrera INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE MetaUsuario(
    nombre_usuario VARCHAR(100) PRIMARY KEY,
    clave_encriptada VARCHAR(100) NOT NULL
);

CREATE TABLE NivelEducativo(
    id_niveleducativo INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE TagFormula(
    id_tag INT,
    id_formula INT,
    PRIMARY KEY (id_tag, id_formula)
);

CREATE TABLE Script(
    id_script INT PRIMARY KEY,
    id_formula INT,
    contenido VARCHAR(1000) NOT NULL
);

CREATE TABLE Formula(
    id_formula INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo_latex VARCHAR(250),
    fecha_creacion DATE,
    creada BOOLEAN NOT NULL,
    eliminada BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE Imagen(
    id_imagen INT PRIMARY KEY,
    id_formula INT,
    path VARCHAR(200) NOT NULL
);

CREATE TABLE CategoriaFormula(
    id_categoria INT,
    id_formula INT,
    PRIMARY KEY (id_categoria, id_formula)
);

CREATE TABLE Categoria(
    id_categoria INT PRIMARY KEY,
    id_categoriapadre INT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Recomendacion(
    id_recomendacion INT PRIMARY KEY,
    id_categoria INT,
    id_niveleducativo INT,
    id_carrera INT,
    nombre VARCHAR(100)
);

