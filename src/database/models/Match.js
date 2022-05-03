const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Group = require("./Group");
const Partner = require("./Partner");

class Match extends Model {}
    Match.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        partnerOneWins: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "match"
    });

Match.belongsTo(Group, {
    foreignKey: "groupId",
    as: "group",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Match.belongsTo(Partner, {
    foreignKey: "partnerOneId",
    as: "partnerOne",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Match.belongsTo(Partner, {
    foreignKey: "partnerTwoId",
    as: "partnerTwo",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = Match;