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
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: new Date().getFullYear()
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "Ranking nuevo" 
        },
        rankingType: {
            type: DataTypes.ENUM(rankingTypes),
            allowNull: false
        },
        registrationOpen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        currentJourney: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }

    }, {
        sequelize,
        modelName: "ranking"
    });



module.exports = Ranking;