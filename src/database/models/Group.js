const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Journey = require("./Journey");

class Group extends Model {}
    Group.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "group"
    });

Group.belongsTo(Journey, {
    foreignKey: "journeyId",
    as: "journey",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = Group;