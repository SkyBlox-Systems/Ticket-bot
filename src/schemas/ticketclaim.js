
const mongoose = require('mongoose')

const TicketClaimMain = mongoose.Schema({
  id: String,
  TicketIDs: String,
  ServerID: String,
  ChannelID: String,
  Reason: String,
  Locked: String,
  Time: String,
  ClaimUserID: String
})

module.exports = mongoose.model('TicketClaim',  TicketClaimMain)