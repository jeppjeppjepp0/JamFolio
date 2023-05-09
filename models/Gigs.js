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
            type: DataTypes.VARCHAR(30),
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
            type: DataType.INTEGER,
        },
        admission: {
            type: DataType.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        musician_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'musicians',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }
);

module.exports = Gigs;