const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Ranking = require("./Ranking");
const User = require("./User");

class Partner extends Model {}
    Partner.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: "partner"
    });

Partner.belongsTo(Ranking, {
    foreignKey: "rankingId",
    as: "ranking",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

Partner.belongsTo(User, {
    foreignKey: "playerOneId",
    as: "playerOne",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});


Partner.belongsTo(User, {
    foreignKey: "playerTwoId",
    as: "playerTwo",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

module.exports = Partner;