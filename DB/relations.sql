ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_rol
    FOREIGN KEY (id_rol) REFERENCES Rol(id_rol);

ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_metausuario
    FOREIGN KEY (nombre_usuario) REFERENCES MetaUsuario(nombre_usuario);

ALTER TABLE Usuario
ADD CONSTRAINT fk_usuario_historial
    FOREIGN KEY (id_historial) REFERENCES Historial(id_historial);

ALTER TABLE Tag
ADD CONSTRAINT fk_tag_usuario
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE PinPago
ADD CONSTRAINT fk_pinpago_usuario
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE UsuarioTarjeta
ADD CONSTRAINT fk_usuariotarjeta_usuario
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE UsuarioTarjeta
ADD CONSTRAINT fk_usuariotarjeta_tarjetacredito
    FOREIGN KEY (id_tarjetacredito) REFERENCES TarjetaCredito(id_tarjetacredito);

ALTER TABLE Indice
ADD CONSTRAINT fk_indice_usuario
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE Indice
ADD CONSTRAINT fk_indice_formula
    FOREIGN KEY (id_formula) REFERENCES Formula(id_formula);

ALTER TABLE Historial
ADD CONSTRAINT fk_historial_usuario
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario);

ALTER TABLE Historial
ADD CONSTRAINT fk_historial_formula
    FOREIGN KEY (id_formula) REFERENCES Formula(id_formula);

ALTER TABLE Recomendacion
ADD CONSTRAINT fk_recomendacion_categoria
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria);

ALTER TABLE Recomendacion
ADD CONSTRAINT fk_recomendacion_niveleducativo
    FOREIGN KEY (id_niveleducativo) REFERENCES NivelEducativo(id_niveleducativo);

ALTER TABLE Recomendacion
ADD CONSTRAINT fk_recomendacion_carrera
    FOREIGN KEY (id_carrera) REFERENCES Carrera(id_carrera);

ALTER TABLE Categoria
ADD CONSTRAINT fk_categoria_categoria
    FOREIGN KEY (id_categoriapadre) REFERENCES Categoria(id_categoria);

ALTER TABLE Imagen
ADD CONSTRAINT fk_imagen_formula
    FOREIGN KEY (id_formula) REFERENCES Formula(id_formula);

ALTER TABLE Script
ADD CONSTRAINT fk_script_formula
    FOREIGN KEY (id_formula) REFERENCES Formula(id_formula);
