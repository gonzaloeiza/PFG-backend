const { Sequelize, Model, DataTypes, STRING } = require("sequelize");
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
        smartCitizenId: {
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
        },
        opensAt: {  //first hour of the day you can start playing in the court
            type: DataTypes.TIME, 
            defaultValue: "10:00",
        },
        closesAt: { //last hour of the day you can start playing in the court
            type: DataTypes.TIME,
            defaultValue: "19:30",
        }
    }, {
        sequelize,
        modelName: "court"
    });

module.exports = Court;