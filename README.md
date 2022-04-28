# PFG-backend

![node version](https://img.shields.io/badge/node-v16.14.0-green)
![npm](https://img.shields.io/badge/npm-v8.5.4-green)
![mysql](https://img.shields.io/badge/mysql-5.5-blue)

## Table of Contents

1. [Technologies](#technologies)
2. [Installation](#installation)
3. [Examples](#examples)

<a name="technologies"></a>

### Technologies

---

A list of technologies used within this **API REST** project:

- [NODE JS](https://nodejs.org/): Version 16.14.0
- [NPM](https://www.npmjs.com/): Version 8.5.4
- [MYSQL](https://www.mysql.com/): Version 5.5

<a name="instalation"></a>

### Instalation

---

The first step to begin with the instalation is to install the necessary dependencies that are used:

```
npm i
```

The next step is to create the MYSQL database and the user that will be used, and give the user the correct permissions in order to interact with the database:

```
DROP SCHEMA IF EXISTS padelDB;
CREATE SCHEMA padelDB;
DROP USER IF EXISTS 'deployer'@'%';
CREATE USER IF NOT EXISTS 'deployer'@'%' IDENTIFIED BY 'deployer';
GRANT ALL ON padelDB.* TO 'deployer'@'%';
```

Before starting to run the scripts, you must configure an .env file. You have an example (/.env.example) on the source code with the required variables.

Then, yo might want to insert some examples to the databse, which will also create the default administrator account:

```
npm run insertExamplesDB
```

The credentials to access as the administrator are:

- email: admin@gmail.com
- password: 12345678

You can now run the application with the next command:

```
npm start
```

You cant test that the application runs correctly by accessing to: http://localhost:5000.

If you want to execute the FRONTEND appliaction, go to the [FRONTEND REPOSITORY](https://github.com/gonzaloeiza/PFG-frontend) and follow the instructions.

You can test everything works correctly by logging as an user with this credentials:

- email: eizaguirregonzalo@gmail.com
- password: 12345678

<a name="examples"></a>

### Examples

---

Here you have some examples of how to use this API REST:

- Login as user:

  #### Request

  `post /api/auth/signin`

  ```
  curl -i -X POST -H "Content-Type: application/x-www-form-urlencoded" http://localhost:5000/api/auth/signin -d "email=eizaguirregonzalo@gmail.com&password=12345678"
  ```

  #### Response

  ```
  HTTP/1.1 200 OK
  X-Powered-By: Express
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Content-Length: 184
  ETag: W/"b8-0eP/4avaedTMzrKZ8ezbOJWMwVQ"
  Date: Fri, 22 Apr 2022 09:18:02 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5

  {
      "message":{
          "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUwNjE5MDgyLCJleHAiOjE2NTA3MDM2ODJ9.uEjjo80Cr5fQ9XSFfNe71k5MJ22fhqtNa4f_JP2C-ac",
          "name":"Gonzalo"
      }
  }
  ```

- Login as administrator:

  #### Request

  `post /api/auth/admin/signin`

  ```
  curl -i -X POST -H "Content-Type: application/x-www-form-urlencoded" http://localhost:5000/api/admin/auth/signin -d "email=admin@gmail.com&password=12345678"
  ```

  #### Reponse

  ```
  HTTP/1.1 200 OK
  X-Powered-By: Express
  Access-Control-Allow-Origin: *
  Content-Type: application/json; charset=utf-8
  Content-Length: 167
  ETag: W/"a7-8qEk5Z+LSLsgdVnJdmL66M96oI4"
  Date: Fri, 22 Apr 2022 09:23:19 GMT
  Connection: keep-alive
  Keep-Alive: timeout=5

  {
      "message":{
          "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwNjE5Mzk5LCJleHAiOjE2NTA3MDM5OTl9.yMpt8VmoheDB12O1fwPRoEEQdo6SVDssr27K8E50LU8"
      }
  }
  ```

- Get all the courts:

  #### Request

  `get /api/courts/`

  ```
  curl -i -X GET http://localhost:5000/api/courts
  ```

  #### Reponse

  ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Access-Control-Allow-Origin: *
    Content-Type: application/json; charset=utf-8
    Content-Length: 2461
    ETag: W/"99d-YAqt4ChkOQzAfKOkCJTs9IBwEJc"
    Date: Fri, 22 Apr 2022 09:26:15 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"message":[{"id":1,"name":"Pista DAM","description":"","picture":"Pista DAM.png","smartCitizenId":"15262","bookReservationTime":90,"priceWithoutLight":35,"priceWithLight":40,"numberOfDaysToBookBefore":2,"numberOfHoursToCancelCourt":6,"opensAt":"09:00:00","closesAt":"19:30:00","updatedAt":"2022-04-22T08:37:53.000Z","last_reading_at":"2022-04-17T08:09:59Z","smartCitizenURL":"https://smartcitizen.me/kits/15262","sensors":[{"name":"AMS CCS811 - eCO2","description":"Equivalent Carbon Dioxide Digital Indoor Sensor","unit":"ppm","value":0},{"name":"ICS43432 - Noise","description":"I2S Digital Mems Microphone with custom Audio Processing Algorithm","unit":"dBA","value":46.19},{"name":"MPL3115A2 - Barometric Pressure","description":"Digital Barometric Pressure Sensor","unit":"kPa","value":100.53},{"name":"PMS5003 - PM1.0","description":"Particle Matter PM 1","unit":"ug/m3","value":5},{"name":"PMS5003 - PM10","description":"Particle Matter PM 10","unit":"ug/m3","value":9},{"name":"PMS5003 - PM2.5","description":"Particle Matter PM 2.5","unit":"ug/m3","value":9},{"name":"SHT31 - Humidity","description":"Humidity","unit":"%","value":63.29},{"name":"SHT31 - Temperature","description":"Temperature","unit":"ºC","value":20.1}]},{"id":2,"name":"Pista CUPRA","description":"","picture":"Pista CUPRA.png","smartCitizenId":"15262","bookReservationTime":60,"priceWithoutLight":30,"priceWithLight":45,"numberOfDaysToBookBefore":2,"numberOfHoursToCancelCourt":4,"opensAt":"09:30:00","closesAt":"21:30:00","updatedAt":"2022-04-22T08:37:53.000Z","last_reading_at":"2022-04-17T08:09:59Z","smartCitizenURL":"https://smartcitizen.me/kits/15262","sensors":[{"name":"AMS CCS811 - eCO2","description":"Equivalent Carbon Dioxide Digital Indoor Sensor","unit":"ppm","value":0},{"name":"ICS43432 - Noise","description":"I2S Digital Mems Microphone with custom Audio Processing Algorithm","unit":"dBA","value":46.19},{"name":"MPL3115A2 - Barometric Pressure","description":"Digital Barometric Pressure Sensor","unit":"kPa","value":100.53},{"name":"PMS5003 - PM1.0","description":"Particle Matter PM 1","unit":"ug/m3","value":5},{"name":"PMS5003 - PM10","description":"Particle Matter PM 10","unit":"ug/m3","value":9},{"name":"PMS5003 - PM2.5","description":"Particle Matter PM 2.5","unit":"ug/m3","value":9},{"name":"SHT31 - Humidity","description":"Humidity","unit":"%","value":63.29},{"name":"SHT31 - Temperature","description":"Temperature","unit":"ºC","value":20.1}]}]}
  ```
