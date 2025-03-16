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

