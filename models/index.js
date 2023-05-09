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
    as: 'musician_instruments'
});

Instruments.belongsToMany(Musician, {
    through: {
        model: MusicianInstruments,
        unique: false,
    },
    as: 'instruments_musician'
});

Musician.belongsToMany(Songs, {
    through: {
        model: MusicianSongs,
        unique: false,
    },
    as: 'musician_songs'
});

Songs.belongsToMany(Musician, {
    through: {
        model: MusicianSongs,
        unique: false,
    },
    as: 'songs_musician'
});

module.exports = { Musician, 
                   Instruments,
                   Songs,
                   Gigs,
                   MusicianInstruments,
                   MusicianSongs
                };