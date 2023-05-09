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
            type: DataTypes.VARCHAR(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genre: {
            type: DataTypes.VARCHAR(30),
        },
        originalAuthor: {
            type: DataTypes.VARCHAR(30),
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