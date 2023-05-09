const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gigs extends Model {};

Gigs.init(
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
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
        },
        admission: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        musician_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'musician',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'gigs',
    }
);

module.exports = Gigs;