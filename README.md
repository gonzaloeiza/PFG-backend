# PFG-backend
![node version](https://img.shields.io/badge/node-v16.14.0-green)
![npm](https://img.shields.io/badge/npm-v8.5.4-green)
![mysql](https://img.shields.io/badge/mysql-5.5-blue)

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)

<a name="general-info"></a>
### General Info
***

<a name="technologies"></a>
### Technologies
***

<a name="instalation"></a>
### Instalation
***

The first step to begin with the instalation is to install the necessary dependencies that are used:

```
npm i
```

The next step is to create the MYSQL database and the user that will be used, and give the user the correct permissions in order to interact with the database:

```
DROP SCHEMA IF EXISTS padelDB;
DROP USER IF EXISTS 'deployer'@'localhost';
CREATE SCHEMA padelDB; CREATE USER IF NOT EXISTS 'deployer'@'localhost' IDENTIFIED BY 'deployer';
GRANT ALL ON padelDB.* TO 'deployer'@'localhost';
```

Then, yo might want to insert some examples to the databse, which will also create the default administrator account:

```
npm run insertExamplesDB
```

The credentials to access as the administrator are:

* email: admin@gmail.com
* password: 12345678

You can now run the application with the next command:

```
npm start
```

You cant test that the application runs correctly by accessing to: http://localhost:5000.

If you want to execute the FRONTEND appliaction, go to the [FRONTEND REPOSITORY](https://github.com/gonzaloeiza/PFG-frontend)  and follow the instructions.


<a name="collarboration"></a>
### Collaboration
***

<a name="faqs"></a>
### FAQs
***
