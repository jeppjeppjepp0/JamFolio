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
            type: DataTypes.TEXT,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING(30),
        },
        original_author: {
            type: DataTypes.STRING(30),
        },
        songs_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'songs',
    }
);

module.exports = Songs;