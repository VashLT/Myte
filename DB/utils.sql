delimiter $$
CREATE TRIGGER new_formula AFTER INSERT ON Formula
FOR EACH ROW
BEGIN
    INSERT INTO Historial (id_usuario, id_formula, fecha_registro) VALUES (
        (SELECT valor FROM MyteVar WHERE nombre="current_user"),
        NEW.id_formula,
        CURDATE()
    );
END; 
$$
delimiter ;

delimiter $$
CREATE TRIGGER delete_meta AFTER DELETE ON Usuario
FOR EACH ROW
BEGIN
    DELETE FROM MetaUsuario WHERE nombre_usuario = OLD.nombre_usuario;
END; 
$$
delimiter ;



