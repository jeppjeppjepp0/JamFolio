const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class MusicianInstruments extends Model {};

MusicianInstruments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        musician_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'musician',
                key: 'id',
            }
        },
        instrument_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'instruments',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'musicianinstruments'
    }
);

module.exports = MusicianInstruments;