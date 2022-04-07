"# PFG-backend" 

El primer paso es instalar las dependencias necesarias para poder correr el proyecto:

En segundo lugar, es necesario crear la base de datos MYSQL y usuario de la base de datos, asi como darle los permisos necesarios al usuario de la base de datos:

DROP SCHEMA IF EXISTS padelDB;
DROP USER IF EXISTS 'deployer'@'localhost';
CREATE SCHEMA padelDB;
CREATE USER IF NOT EXISTS 'deployer'@'localhost' IDENTIFIED BY 'deployer';
GRANT ALL ON padelDB.* TO 'deployer'@'localhost';

El siguiente comando añade ejemplos a la base de datos y crea la cuenta de administrador por defecto:


Las credenciales para la cuenta de administrador son:
  - email: admin@gmail.com
  - contraseña: 12345678

Por útlimo, iniciaremos la aplicación con el siguiente comando:
