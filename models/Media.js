const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Media extends Model {};

Media.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        musician_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        media_type: {
            type: DataTypes.ENUM('image', 'audio', 'video'),
            allowNull: false
        },
        media_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'media',
        }
);

module.exports = Media;
