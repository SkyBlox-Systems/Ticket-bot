const mongoose  = require('mongoose');
const Discord = require('discord.js');


const DatabaseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guidID: String
});

module.exports = mongoose.model('Servers', DatabaseSchema)