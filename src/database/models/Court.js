const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db");


class Court extends Model {}
    Court.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        timeUnity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 60 //minutes
        },
        priceWithoutLight: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        priceWithLight: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "court"
    });

module.exports = Court;