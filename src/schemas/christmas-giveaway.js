
const mongoose = require('mongoose')

const ChristmasGiveaway = mongoose.Schema({
  id: String,
  ServerID: String,
  Email: String,

})

module.exports = mongoose.model('ChristmasGiveaway',  ChristmasGiveaway)