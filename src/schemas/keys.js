
const mongoose = require('mongoose')

const TicketKeys = mongoose.Schema({
  OwnerID: String,
  Pro: Array
})

module.exports = mongoose.model('Keys',  TicketKeys)