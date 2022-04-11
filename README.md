# PFG-backend
![node version](https://img.shields.io/badge/node-v16.14.0-green)
![npm](https://img.shields.io/badge/npm-v8.5.4-green)
![mysql](https://img.shields.io/badge/mysql-5.5-blue)

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4.[Collaboration](#collaboration)
5. [FAQs](#faqs)

El primer paso es instalar las dependencias necesarias para poder correr el proyecto:

```
npm i
```

En segundo lugar, es necesario crear la base de datos MYSQL 5.5 y usuario de la base de datos, asi como darle los permisos necesarios al usuario de la base de datos:
```
DROP SCHEMA IF EXISTS padelDB;
DROP USER IF EXISTS 'deployer'@'localhost';
CREATE SCHEMA padelDB; CREATE USER IF NOT EXISTS 'deployer'@'localhost' IDENTIFIED BY 'deployer';
GRANT ALL ON padelDB.* TO 'deployer'@'localhost';
```

El siguiente comando añade ejemplos a la base de datos y crea la cuenta de administrador por defecto:
```
npm run insertExamplesDB
```
Las credenciales para la cuenta de administrador son:

* email: admin@gmail.com
* contraseña: 12345678

Por útlimo, iniciaremos la aplicación con el siguiente comando:

```
npm start
```

Puedes comprobar que la conexión funciona correctamente dirigiéndote a: http://localhost:5000

Para ejecutar la aplicación FRONTEND, dirígete al repositorio y sigue sus instrucciones: https://github.com/gonzaloeiza/PFG-frontend



