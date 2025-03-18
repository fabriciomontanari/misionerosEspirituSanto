CREATE TABLE EVENTOS (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombreEvento NVARCHAR(255) NOT NULL,
    descripcion NVARCHAR(MAX) NULL,
    fecha DATE NOT NULL,
    hora NVARCHAR(5) NOT NULL,
    lugar NVARCHAR(255) NOT NULL,
    edadMinima INT NOT NULL,
    edadMaxima INT NOT NULL,
    imagen VARBINARY(MAX) NOT  NULL
);

CREATE TABLE INSCRIPCIONES (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(255) NOT NULL,
    correo NVARCHAR(255) NOT NULL,
    telefono NVARCHAR(20) NOT NULL,
    eventoID INT NOT NULL,
    FOREIGN KEY (eventoID) references EVENTOS(id) ON DELETE CASCADE
);

CREATE TABLE USUARIOS (
    ID INT IDENTITY(1,1) PRIMARY KEY, 
    correo NVARCHAR(255) UNIQUE NOT NULL,
    contrasena NVARCHAR(255) NOT NULL
);

INSERT INTO USUARIOS (correo, contrasena) 
VALUES ('noreplymisionerosespiritusanto@gmail.com', 'admin123');