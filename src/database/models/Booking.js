const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");
const Court = require("./Court");

class Booking extends Model {}
    Booking.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        day: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        finishTime: {
            type: DataTypes.TIME,
            allowNull: false
        },
        withLight: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        amountToPay: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "booking"
    });

Booking.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Booking.belongsTo(Court, {
    foreignKey: "courtId",
    as: "court",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


module.exports = Booking;