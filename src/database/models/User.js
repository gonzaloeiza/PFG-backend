const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const {genderOptions, sidePlayingOptions} = require("../../config");

class User extends Model {}
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            isEmail: true
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstSurname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secondSurname: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        dateBirth: {
            type: DataTypes.DATEONLY,
        },
        gender: {
            type: DataTypes.ENUM(genderOptions),
            defaultValue: genderOptions[2]
        },
        sidePlaying: {
            type: DataTypes.ENUM(sidePlayingOptions),
            defaultValue: sidePlayingOptions[2]
        },
        direction: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        poblation: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        postalCode: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        province: {
            type: DataTypes.STRING,
            defaultValue: ""
        }
        
    }, {
        sequelize,
        modelName: "user"
    });

module.exports = User;