const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Ranking extends Model {}
    Ranking.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "Ranking nuevo" 
        },
        registrationOpen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        journeyNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: "ranking"
    });



module.exports = Ranking;