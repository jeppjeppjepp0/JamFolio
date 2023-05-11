const Musician = require('./Musician.js');
const Instruments = require('./Instruments.js');
const Songs = require('./Songs.js');
const Gigs = require('./Gigs.js');
const MusicianInstruments = require('./connectors/MusicianInstruments.js');
const MusicianSongs = require('./connectors/MusicianSongs.js');

Musician.hasMany(Gigs, {
    foreignKey: 'musician_id',
    onDelete: 'CASCADE'
});

Gigs.belongsTo(Musician, {
    foreignKey: 'musician_id'
});

Musician.belongsToMany(Instruments, {
    through: {
        model: MusicianInstruments,
        unique: false,
    },
    as: 'played_instruments' // Updated alias
});

Instruments.belongsToMany(Musician, {
    through: {
        model: MusicianInstruments,
        unique: false,
    },
    as: 'musicians' // Updated alias
});

Musician.belongsToMany(Songs, {
    through: {
        model: MusicianSongs,
        unique: false,
    },
    foreignKey: 'musician_id',
    otherKey: 'songs_id',
    as: 'performed_songs' // Updated alias
});

Songs.belongsToMany(Musician, {
    through: {
        model: MusicianSongs,
        unique: false,
    },
    foreignKey: 'songs_id',
    otherKey: 'musician_id',
    as: 'performed_songs' // Updated alias

});

module.exports = { Musician, 
                   Instruments,
                   Songs,
                   Gigs,
                   MusicianInstruments,
                   MusicianSongs
                };