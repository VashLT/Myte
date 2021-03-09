DROP TRIGGER IF EXISTS myte.new_formula;
delimiter $$
CREATE TRIGGER new_formula AFTER INSERT ON Formula
FOR EACH ROW
BEGIN
    INSERT INTO Historial (id_usuario, id_formula, fecha_registro) VALUES (
        (SELECT valor FROM MyteVar WHERE nombre="current_user"),
        NEW.id_formula,
        CURDATE()
    );
    IF NEW.creada = 1 THEN
        INSERT INTO Indice(id_usuario, id_formula, numero_usos) VALUES (
            (SELECT valor FROM MyteVar WHERE nombre="current_user"),
            NEW.id_formula,
            0
        );
    END IF;
END; 
$$
delimiter ;

DROP TRIGGER IF EXISTS delete_meta;
delimiter $$
CREATE TRIGGER delete_meta AFTER DELETE ON Usuario
FOR EACH ROW
BEGIN
    DELETE FROM MetaUsuario WHERE nombre_usuario = OLD.nombre_usuario;
END; 
$$
delimiter ;