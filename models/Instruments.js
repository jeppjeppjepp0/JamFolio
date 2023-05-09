const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Instruments extends Model {};

module.exports = Instruments;