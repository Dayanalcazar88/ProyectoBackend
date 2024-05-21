create database prueba01;
use prueba01;

create table persona(
    id int auto_increment primary key,
    name  varchar(50) not null,
    last_name varchar(50) not null,
    age int
);
select * from persona;


CREATE USER 'prueba01'@'localhost' IDENTIFIED BY 'prueba01';
GRANT ALL PRIVILEGES ON prueba01.* TO 'prueba01'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'prueba01'@'localhost';