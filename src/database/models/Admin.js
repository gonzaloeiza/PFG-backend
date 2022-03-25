const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Admin extends Model {}
    Admin.init({
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
        }        
    }, {
        sequelize,
        modelName: "admin"
    });

module.exports = Admin;