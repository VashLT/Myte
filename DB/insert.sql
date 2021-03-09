SET @new_line = "\\n";

-- DB Variables
INSERT INTO MyteVar (nombre, valor) VALUES ("current_user", 1);

-- Rol
INSERT INTO Rol VALUES (1, "Normal");
INSERT INTO Rol VALUES (2, "Premium");
INSERT INTO Rol VALUES (3, "Administrador");

-- Default user
INSERT INTO MetaUsuario VALUES (
    "pepe1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    1, 3, "pepe1", "Pepe Andres Bolivar",
    CURDATE(), "pepe1@gmail.com", STR_TO_DATE("7/5/1995", "%d/%m/%Y")
);

-- Formula
SET @current_user = 1; -- assumes pepe1 is current user
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

-- Indice
INSERT INTO Indice (id_usuario, id_formula, numero_usos) VALUES (
    1, 1, 1
);

-- Tag
INSERT INTO Tag (id_tag, id_usuario, nombre) VALUES (
    1, 1, "parcial final"
);

-- TagFormula
INSERT INTO TagFormula (id_tag, id_formula) VALUES (1, 3);



