CREATE DATABASE expenses;

CREATE TABLE users(
    id VARCHAR(50) PRIMARY KEY,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE transactions(
    transactionId VARCHAR(50) NOT NULL,
    concepto VARCHAR(100) NOT NULL,
    monto INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    userId VARCHAR(50) NOT NUll,
    FOREIGN KEY(userId) REFERENCES users(id)
);