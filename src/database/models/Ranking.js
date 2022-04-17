const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const {rankingTypes} = require("../../config");

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
    }, {
        sequelize,
        modelName: "ranking"
    });



module.exports = Ranking;