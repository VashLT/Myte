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
    (20, 13, "Energías"),
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

-- more users added

INSERT INTO MetaUsuario VALUES (
    "carla1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    3, 1, "carla1", "Carla Mendes",
    CURDATE(), "carla1@gmail.com", STR_TO_DATE("17/11/2000", "%d/%m/%Y")
);

INSERT INTO MetaUsuario VALUES (
    "mario1", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    4, 2, "mario1", "Mario de las montañas",
    CURDATE(), "mario1@gmail.com", STR_TO_DATE("14/9/1998", "%d/%m/%Y")
);

INSERT INTO MetaUsuario VALUES (
    "carmen", 
    "b221d9dbb083a7f33428d7c2a3c3198ae925614d70210e28716ccaa7cd4ddb79"   -- pw: hola
);
INSERT INTO Usuario (id_usuario, id_rol, nombre_usuario, nombre, fecha_registro, email, fecha_nacimiento)
VALUES (
    5, 2, "carmen", "Carmen Leticia",
    CURDATE(), "carmen@gmail.com", STR_TO_DATE("8/5/1995", "%d/%m/%Y")
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

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    8,
    "Fórmula cuadrática general", 
    "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    9,
    "Binomio de Newton", 
    "(a+b)^n = \\sum_{i=0}^{n} \\left( \\begin{matrix} n \\ i \\end{matrix} \\right) a^{n-i} \\cdot b^n",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    10,
    "Cálculo de un determinante de orden 2", 
    "|A| = a_{11} \\cdot a_{22} - a_{12} \\cdot a_{21}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    11,
    "Matriz inversa", 
    "A^{-1} = \\frac{1}{|A|} \\cdot (A^*)^t",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    12,
    "Volumen de un paralelepípedo", 
    "V = A_b \\cdot h",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    13,
    "Área del paralelogramo", 
    CONCAT("A = |\\vec{u} \\times \\vec{v}|", @new_line, "\\text{Siendo estos vectores sus lados}"),
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    14,
    "Regla de 3 simple y directa", 
    CONCAT("\\frac{A_1}{A_2} =  \\frac{C}{x}", @new_line, "x = \\frac{A_2 \\cdot C}{A_1}"),
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    15,
    "Division fracciones", 
    "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot c}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    16,
    "Media o promedio", 
    "\\overline{x} = \\frac{\\sum_{i = 1}^{n} x_i}{n}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    17,
    "Diagonal cuadrado", 
    "D = \\sqrt{2 \\cdot L^2}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    18,
    "Área de un círculo", 
    "A = \\pi \\cdot R^2",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    19,
    "Permutación", 
    "_nP_r = \\frac{n!}{(n-r)!}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    20,
    "Combinación", 
    "_nC_r = \\frac{n!}{r!(n-r)!}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    21,
    "Ángulo mitad Seno", 
    "\\sin{\\frac{\\theta}{2}} = \\sqrt{\\frac{1-\\cos{\\theta}}{2}}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    22,
    "Producto a suma", 
    "\\sin{x} \\cdot \\cos{y} = \\frac{1}{2} [\\sin{(x+y)} + \\sin{(x-y)}]",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    23,
    "Fuerza entre dos cargas", 
    "\\vec{f} = \\frac{q_1 q_2 \\vec{r}}{r^2(4 \\pi \\epsilon_0)}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    24,
    "Velocidad de una onda", 
    "v = \\frac{\\lambda}{T}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    25,
    "Flujo volumétrico", 
    CONCAT("Q_v = A \\cdot v", @new_line, "\\text{Donde 'A' es el área de la tubería y 'v' la velocidad del fluido}"),
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    26,
    "Derivada de un producto", 
    CONCAT("f(x) = u \\cdot v", @new_line, "f'(x) = u' \\cdot v + u \\cdot v'"),
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    27,
    "Integral por partes", 
    "\\int_{a}^{b} U \ dV = U \\cdot V - \\int_{a}^{b} V \ dU",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    28,
    "Error absoluto", 
    "\\text{Error absoluto} = |p - \\hat{p}|",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    29,
    "Error relativo", 
    "\\text{Error relativo} = \\frac{|p - \\hat{p}|}{|p|}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    30,
    "Serie de Taylor para la función exponencial", 
    "e^{x} = 1 + x + \\frac{x^2}{2} + ... + \\frac{x^n}{n!}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    31,
    "Energía mecánica", 
    CONCAT("E_m = E_c + E_p", @new_line, "E_c = \\frac{1}{2} mv^2", @new_line, "E_p = m \\cdot g \\cdot h"),
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    32,
    "Fuerzas", 
    "\\sum \\vec{F} = m \\cdot \\vec{a}",
    CAST(NOW() AS DATE),
    0
);

INSERT INTO Formula (id_formula, nombre, codigo_latex, fecha_creacion, creada) VALUES (
    33,
    "Posición horizontal - MRU", 
    "x_f = x_i + v_x (t_f - t_i)",
    CAST(NOW() AS DATE),
    0
);

-- Relacionando Categoria-Formula
INSERT INTO CategoriaFormula VALUES 
    (3, 4),
    (3, 5),
    (3, 6),
    (3, 7),
    (4, 8),
    (4, 9),
    (5, 10),
    (5, 11),
    (6, 12),
    (6, 13),
    (7, 14),
    (7, 15),
    (9, 16),
    (10, 17),
    (10, 18),
    (11, 19),
    (11, 20),
    (12, 21),
    (12, 22),
    (14, 23),
    (15, 24),
    (16, 25),
    (17, 26),
    (18, 27),
    (19, 28),
    (19, 29),
    (19, 30),
    (20, 31),
    (21, 32),
    (22, 33)
;

-- Indice, manual unlike previous insertion
INSERT INTO Indice (id_usuario, id_formula, numero_usos) VALUES (
    2, 3, 1
);

-- Tag
INSERT INTO Tag (id_tag, id_usuario, nombre) VALUES 
    (1, 1, "parcial final"),
    (2, 1, "análisis 2 corte"),
    (3, 1, "física I"),
    (4, 1, "cálculo I"),
    (5, 1, "lab análisis"),
    (6, 2, "cuadratica general"),
    (7, 2, "taller 1"),
    (8, 2, "regla para despejar"),
    (9, 2, "multiplicación cruzada"),
    (10, 2, "parcial estadística"),
    (11, 3, "formula del estudiante"),
    (12, 3, "primer tema"),
    (13, 3, "area circulo"),
    (14, 4, "cálculo II"),
    (15, 4, "flujo álgebra"),
    (16, 4, "permutaciones"),
    (17, 5, "propiedad trigonométricas"),
    (18, 5, "física II corte 1")
;

-- TagFormula
INSERT INTO TagFormula (id_tag, id_formula) VALUES 
    (1, 3),
    (2, 30),
    (3, 33),
    (4, 26),
    (5, 28),
    (6, 8),
    (7, 10),
    (8, 14),
    (9, 15),
    (10, 16),
    (11, 8),
    (12, 17),
    (13, 18),
    (14, 27),
    (15, 25),
    (16, 19),
    (17, 22),
    (18, 23)
;

-- Scripts
INSERT INTO Script VALUES
    (1, 30, "sum([x**i / math.factorial(i) for i in range(int(n))])", "x,n"),
    (2, 6, "ms/vs", "ms,vs"),
    (3, 8, "(-b + math.sqrt(b**2 - 4*a*c))/(2*a)", "a,b,c"),
    (4, 8, "(-b - math.sqrt(b**2 - 4*a*c))/(2*a)", "a,b,c"),
    (5, 10, "a11 * a22 - a21 * a12", "a11,a12,a21,a22"),
    (6, 12, "ab * h", "ab,h"),
    (7, 14, "c * b / a", "a,b,c"),
    (8, 18, "math.pi * r**2", "r"),
    (9, 19, "math.factorial(n) / math.factorial(n-r)", "n,r"),
    (10, 23, "(q1 * q2)/(r**2 * math.pi * 8.854187817 * 10**(-12))", "q1,q2,r"),
    (11, 24, "l / T", "l,T"),
    (12, 25, "a * v", "a,v"),
    (13, 28, "abs(p - pp)", "p,pp"),
    (14, 29, "abs(p - pp) / abs(p)", "p,pp"),
    (15, 31, "1/2 * m * v**2 + m * g * h", "m,g,h,v"),
    (16, 33, "xi + vx * (tf-ti)", "xi,vx,tf,ti")
;

-- Añadiendo tarjetas de crédito
INSERT INTO TarjetaCredito VALUES
    (1, "5360197024854264", STR_TO_DATE("07/2027", "%m/%Y"), 675),
    (2, "5218957329108300", STR_TO_DATE("01/2025", "%m/%Y"), 353),
    (3, "4451606084585520", STR_TO_DATE("01/2027", "%m/%Y"), 434)
;

-- UsuarioTarjeta relaciones manuales
INSERT INTO UsuarioTarjeta VALUES
    (1, 1, 0),
    (2, 3, 1200)
;

-- Pinpago manual
INSERT INTO PinPago VALUES
    (1, 2, 1000, STR_TO_DATE("12/3/2021", "%d/%m/%Y"), 1440, "086727485698"),
    (2, 5, 900, STR_TO_DATE("15/3/2021", "%d/%m/%Y"), 2842, "097524574855")
;

