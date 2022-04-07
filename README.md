# PFG-backend
[![npm version](https://img.shields.io/npm/v/if-node-version.svg)](https://www.npmjs.com/package/if-node-version)


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


