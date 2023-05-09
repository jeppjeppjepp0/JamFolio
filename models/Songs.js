const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Songs extends Model {};

Songs.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(30),
        },
        originalAuthor: {
            type: DataTypes.STRING(30),
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }
);

module.exports = Songs;