
const mongoose = require('mongoose')

const TicketSupportMain = mongoose.Schema({
  id: String,
  TicketIDs: String,
  ChannelID: String,
  Reason: String,
  Locked: String,
  Time: String,
  AddedUser: Array,
  Type: String,
  ClaimUserID: String,
  ClaimTime: String,
  Priority: String
})

module.exports = mongoose.model('TicketSupport',  TicketSupportMain)