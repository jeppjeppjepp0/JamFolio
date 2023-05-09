const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Gigs extends Model {};

module.exports = Gigs;