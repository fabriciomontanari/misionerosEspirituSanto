CREATE TABLE EVENTOS (
    id SERIAL PRIMARY KEY,
    nombreEvento VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    hora VARCHAR(5) NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    edadMinima INTEGER NOT NULL,
    edadMaxima INTEGER NOT NULL,
    imagen BYTEA NOT NULL
);

CREATE TABLE INSCRIPCIONES (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    eventoID INTEGER NOT NULL,
    FOREIGN KEY (eventoID) REFERENCES EVENTOS(id) ON DELETE CASCADE
);

CREATE TABLE USUARIOS (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

INSERT INTO USUARIOS (correo, contrasena) 
VALUES ('noreplymisionerosespiritusanto@gmail.com', 'admin123');
