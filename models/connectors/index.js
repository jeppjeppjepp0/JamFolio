const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/connection');

const MusicianInstruments = require('./MusicianInstruments.js');
const MusicianSongs = require('./MusicianSongs.js');

module.exports = { MusicianInstruments, MusicianSongs };