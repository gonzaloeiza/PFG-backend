const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db");


class Court extends Model {}
    Court.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        bookReservationTime: {  //if you book a court, for how long can you play 
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
        },
        numberOfDaysToBookBefore: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numberOfHoursToCancelCourt: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "court"
    });

module.exports = Court;