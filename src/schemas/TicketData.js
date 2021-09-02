
const mongoose = require('mongoose')

const TicketData = mongoose.Schema({
  ServerID: String,
  OwnerID: String,
  TicketChannelID: String,
  TicketNumber: Number,
  TicketTrackerChannelID: String,
  BotPrefix: String,
  SupportRoleID: String,
  ManagerRoleID: String,
  AdminRoleID: String,
  BetaKey: String,
  PaidGuild: String,
  Transcript: String,
  UseTicketReactions: String,
  UseDashboard: String,
  APIKey: String,
  BotVersion: String
})

module.exports = mongoose.model('TicketData',  TicketData)