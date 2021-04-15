DROP DATABASE IF EXITS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (30)
);

