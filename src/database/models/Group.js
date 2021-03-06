const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Partner = require("./Partner");
const Ranking = require("./Ranking");

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

Group.belongsTo(Ranking, {
    foreignKey: "rankingId",
    as: "ranking",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Group.belongsTo(Partner, {
    foreignKey: "partnerOneId",
    as: "partnerOne",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Group.belongsTo(Partner, {
    foreignKey: "partnerTwoId",
    as: "partnerTwo",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Group.belongsTo(Partner, {
    foreignKey: "partnerThreeId",
    as: "partnerThree",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


module.exports = Group;