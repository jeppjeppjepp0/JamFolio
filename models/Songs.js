const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Songs extends Model {};

module.exports = Songs;