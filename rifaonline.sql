CREATE DATABASE rifaonline;

USE rifaonline;

CREATE TABLE participante (
    idParticipante int PRIMARY KEY AUTO_INCREMENT,
    cpf varchar(30),
    tel varchar(30),
    nome varchar(200)
);

CREATE TABLE Rifa (
    NumRifa int PRIMARY KEY AUTO_INCREMENT,
    numero varchar(100),
    idParticipante int,
    FOREIGN KEY (idParticipante) REFERENCES participante(idParticipante)
);
