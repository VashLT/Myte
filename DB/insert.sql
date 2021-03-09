SET @new_line = "\n";

-- Rol
INSERT INTO Rol VALUES (1, "Normal");
INSERT INTO Rol VALUES (2, "Premium");
INSERT INTO Rol VALUES (3, "Administrador");

-- Nivel educativo
INSERT INTO NivelEducativo VALUES
    (1, "Bachillerato"),
    (2, "Pregrado"),
    (3, "Posgrado")
;

-- Carrera
INSERT INTO Carrera (nombre) VALUES
    ("Biología"),
    ("Física"),
    ("Licenciatura en Matemáticas"),
    ("Matemáticas"),
    ("Química"),
    ("Diseño Industrial"),
    ("Ingeniería Civil"),
    ("Ingeniería de Eléctrica"),
    ("Ingeniería de Electrónica"),
    ("Ingeniería Industrial"),
    ("Ingeniería Mecánica"),
    ("Ingeniería de Sistemas"),
    ("Ingeniería Metalúrgica"),
    ("Ingeniería de Petróleos"),
    ("Ingeniería Química"),
    ("Geología")
;

-- Formula
INSERT INTO Formula (nombre, codigo_latex, fecha_creacion, creada) VALUES (
    "Valor promedio", 
    "\frac{1}{b-a}\cdot \int_{a}^{b}f(x)dx",
    STR_TO_DATE("7-3-2021", "%d-%m-%Y"),
    0
);

INSERT INTO Formula (nombre, codigo_latex, fecha_creacion, creada) VALUES (
    "Método de Euler", 
    CONCAT("y_{k+1} = y_k + h\cdot f(t_k, y_k)", @new_line, "t_{k+1} = t_k + h"),
    CAST(NOW() AS DATE),
    0
);

-- Default user
INSERT INTO MetaUsuario VALUES (
    "pepe1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    3, "pepe1", "Pepe Andres Bolivar",
    CURDATE(), "pepe1@gmail.com", STR_TO_DATE("7/5/1995", "%d/%m/%Y")
);

-- Indice