DROP DATABASE IF EXISTS myte;
CREATE DATABASE myte CHARACTER SET utf8;

DROP DATABASE IF EXISTS dj_db;
CREATE DATABASE dj_db CHARACTER SET utf8;

DROP USER IF EXISTS 'dj_user'@'%';
CREATE USER 'dj_user'@'%' IDENTIFIED BY 'django';
GRANT ALL ON myte.* TO 'dj_user'@'%';
GRANT ALL ON dj_db.* TO 'dj_user'@'%';
FLUSH PRIVILEGES;

USE myte;
-- creates
CREATE TABLE Usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_rol INT,
    nombre_usuario VARCHAR(100),
    nombre VARCHAR(100) NOT NULL,
    fecha_registro DATE,
    email VARCHAR(120) NOT NULL,
    fecha_nacimiento DATE,
    activo INT DEFAULT 1,
    ultimo_ingreso DATETIME
);
CREATE TABLE Historial(
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_formula INT,
    fecha_registro DATE
);
CREATE TABLE Indice(
    id_index INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_formula INT,
    numero_usos INT DEFAULT 0
);
CREATE TABLE Tag(
    id_tag INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE PinPago(
    id_pinpago INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    valor DOUBLE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    ref_pago INT NOT NULL,
    pin VARCHAR(30) NOT NULL
);
CREATE TABLE UsuarioTarjeta(
    id_tarjetacredito INT,
    id_usuario INT,
    valor DOUBLE,
    PRIMARY KEY (id_tarjetacredito, id_usuario)
);
CREATE TABLE Rol(
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100)
);
CREATE TABLE TarjetaCredito(
    id_tarjetacredito INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(20) NOT NULL,
    fecha_caducidad DATE,
    CVV INT
);
CREATE TABLE Interes(
    id_usuario INT,
    id_carrera INT,
    PRIMARY KEY (id_usuario, id_carrera)
);
CREATE TABLE Carrera(
    id_carrera INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE MetaUsuario(
    nombre_usuario VARCHAR(100) PRIMARY KEY,
    clave_encriptada VARCHAR(100) NOT NULL
);
CREATE TABLE NivelEducativo(
    id_niveleducativo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE TagFormula(
    id_tag INT,
    id_formula INT,
    PRIMARY KEY (id_tag, id_formula)
);
CREATE TABLE Script(
    id_script INT PRIMARY KEY AUTO_INCREMENT,
    id_formula INT,
    contenido VARCHAR(1000) NOT NULL,
    variables VARCHAR(100) 
);
CREATE TABLE Formula(
    id_formula INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo_latex VARCHAR(250),
    fecha_creacion DATE,
    creada BOOLEAN NOT NULL,
    eliminada BOOLEAN NOT NULL DEFAULT 0
);
CREATE TABLE Imagen(
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    id_formula INT,
    path VARCHAR(200) NOT NULL,
    url VARCHAR(200) NOT NULL
);
CREATE TABLE CategoriaFormula(
    id_categoria INT,
    id_formula INT,
    PRIMARY KEY (id_categoria, id_formula)
);
CREATE TABLE Categoria(
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    id_categoriapadre INT,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE Recomendacion(
    id_recomendacion INT PRIMARY KEY AUTO_INCREMENT,
    id_categoria INT,
    id_niveleducativo INT,
    id_carrera INT
);

CREATE TABLE MyteVar(
    nombre VARCHAR(50) PRIMARY KEY,
    valor INT NOT NULL
);
