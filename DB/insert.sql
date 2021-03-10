SET @new_line = "\\n";

-- DB Variables
INSERT INTO MyteVar (nombre, valor) VALUES ("current_user", 1);

-- Rol
INSERT INTO Rol VALUES (1, "Normal");
INSERT INTO Rol VALUES (2, "Premium");
INSERT INTO Rol VALUES (3, "Administrador");

-- Nivel educativo
INSERT INTO NivelEducativo VALUES
    (1, "Bachillerato"),
    (2, "Pregrado"),
    (3, "Otro")
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

-- Categoria
INSERT INTO Categoria VALUES
    (1, NULL, "Matemáticas"),
    (2, NULL, "Física"),
    (3, NULL, "Química"),
    (4, 1, "Álgebra"),
    (5, 1, "Álgebra lineal"),
    (6, 1, "Geometría Analítica"),
    (7, 1, "Aritmética"),
    (8, 1, "Cálculo"),
    (9, 1, "Estadística"),
    (10, 1, "Geometría"),
    (11, 1, "Probabilidades"),
    (12, 1, "Trigonometría"),
    (13, 2, "Mecánica Clásica"),
    (14, 2, "Electromagnetismo"),
    (15, 2, "Ondas"),
    (16, 2, "Termodinámica"),
    (17, 8, "Cálculo diferencial"),
    (18, 8, "Cálculo Integral"),
    (19, 8, "Cálculo Numérico"),
    (20, 13, "Estática"),
    (21, 13, "Dinámica"),
    (22, 13, "Cinemática")
;

-- Interes (prueba)
INSERT INTO Interes VALUES 
    (1, 12),
    (2, 3)
;

-- Recomendacion
INSERT INTO Recomendacion (id_categoria, id_niveleducativo, id_carrera) VALUES
    (1, 1, 3),
    (1, 1, 4),
    (4, 1, 3),
    (4, 1, 4),
    (7, 1, 3),
    (7, 1, 4),
    (9, 1, 3),
    (9, 1, 4),
    (10, 1, 3),
    (10, 1, 4),
    (11, 1, 3),
    (11, 1, 4),
    (12, 1, 3),
    (12, 1, 4),
    (2, 1, 2),
    (13, 1, 2),
    (20, 1, 2),
    (21, 1, 2),
    (22, 1, 2),
    (3, 1, 5),
    (9, 2, 1),
    (11, 2, 1),
    (1, 2, 2),
    (2, 2, 2),
    (1, 2, 3),
    (2, 2, 3),
    (1, 2, 4),
    (2, 2, 4),
    (1, 2, 5),
    (2, 2, 5),
    (3, 2, 5),
    (1, 2, 6),
    (2, 2, 6),
    (6, 2, 6),
    (1, 2, 7),
    (2, 2, 7),
    (6, 2, 7),
    (1, 2, 8),
    (2, 2, 8),
    (1, 2, 9),
    (2, 2, 9),
    (1, 2, 10),
    (2, 2, 10),
    (1, 2, 11),
    (2, 2, 11),
    (16, 2, 11),
    (1, 2, 12),
    (2, 2, 12),
    (19, 2, 12),
    (1, 2, 13),
    (2, 2, 13),
    (16, 2, 13),
    (1, 2, 14),
    (2, 2, 14),
    (16, 2, 14),
    (1, 2, 15),
    (2, 2, 15),
    (16, 2, 15),
    (1, 2, 16),
    (3, 2, 16),
    (6, 2, 16)
;

-- Formulas por categoria
INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    4,
    "Porcentaje de Masa", 
    "\\frac{\\text{masa de soluto (g)}}{\\text{masa de disolución (g)}} \\cdot 100",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    5,
    "Porcentaje de Volumen", 
    "\\frac{\\text{volumen de soluto (ml)}}{\\text{volumen de disolución (ml)}} \\cdot 100",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    6,
    "Molaridad", 
    "M = \\frac{\\text{moles}_{\\text{(soluto)}} \\ (n)}{\\text{Volumen}_{\\text{(solucion)}} \\ (L)}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    7,
    "Molalidad", 
    "m = \\frac{\\text{moles}_{\\text{(soluto)}} \\ (n)}{\\text{Kg}_{\\text{(disolvente)}}}",
    CAST(NOW() AS DATE),
    0
);



-- Relacionando Categoria-Formula
INSERT INTO CategoriaFormula VALUES 
    (3, 4),
    (3, 5),
    (3, 6),
    (3, 7)
;

-- test user premium
INSERT INTO MetaUsuario VALUES (
    "pepe1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    1, 3, "pepe1", "Pepe Andres Bolivar",
    CURDATE(), "pepe1@gmail.com", STR_TO_DATE("7/5/1995", "%d/%m/%Y")
);

-- test user normal

INSERT INTO MetaUsuario VALUES (
    "ana1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    2, 1, "ana1", "Ana de las nieves",
    CURDATE(), "ana1@gmail.com", STR_TO_DATE("7/5/2002", "%d/%m/%Y")
);

-- Formula
INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    1, 
    "Valor promedio", 
    "\\frac{1}{b-a}\\cdot \\int_{a}^{b}f(x)dx",
    STR_TO_DATE("7-3-2021", "%d-%m-%Y"),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    2,
    "Método de Euler", 
    CONCAT("y_{k+1} = y_k + h\\cdot f(t_k, y_k)", @new_line, "t_{k+1} = t_k + h"),
    CAST(NOW() AS DATE),
    0
);

-- formula creada
INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    3,
    "Longitud de arco", 
    "s = \\int_a^b\\sqrt{1+f'(x)}dx",
    CAST(NOW() AS DATE),
    1
);

-- Indice, manual unlike previous insertion
INSERT INTO Indice (id_usuario, id_formula, numero_usos) VALUES (
    2, 3, 1
);

-- Tag
INSERT INTO Tag (id_tag, id_usuario, nombre) VALUES (
    1, 1, "parcial final"
);

-- TagFormula
INSERT INTO TagFormula (id_tag, id_formula) VALUES (1, 3);




