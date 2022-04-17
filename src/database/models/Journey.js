// const { Model, DataTypes } = require("sequelize");
// const sequelize = require("../db");
// const Ranking = require("./Ranking");

// class Journey extends Model {}
//     Journey.init({
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//         number: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0
//         },
//     }, {
//         sequelize,
//         modelName: "journey"
//     });

// Journey.belongsTo(Ranking, {
//     foreignKey: "rankingId",
//     as: "ranking",
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE"
// });

// module.exports = Journey;