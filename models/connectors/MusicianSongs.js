const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

class MusicianSongs extends Model {};

MusicianSongs.init(
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
        songs_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'songs',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'musiciansongs'
    }
);

module.exports = MusicianSongs;