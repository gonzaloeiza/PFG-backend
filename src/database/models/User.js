const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const {genderOptions} = require("../../config");

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
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        pendingSignUp: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        rankingPoints: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
        
    }, {
        sequelize,
        modelName: "user"
    });

module.exports = User;