const { Sequelize } = require('sequelize');
const { database } = require("./config");

const sequelize  = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
);

module.exports = sequelize;

// execute the require() of models/index and thus execute all model files to create them in the bd

require('./models');


sequelize.sync({force: false}) // sync: true -->  es para resetear la base de datos al correr de nuevo el programa
.then(async () => {
    console.log("Conectado a la base de datos");
    // require('./insertExamples');
})
.catch((err) => {
    console.log(err);
});

