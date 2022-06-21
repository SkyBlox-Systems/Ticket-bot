
const mongoose = require('mongoose')

const TicketData = mongoose.Schema({
  ServerID: String,
  OwnerID: String,
  TicketChannelID: String,
  TicketNumber: Number,
  TicketTrackerChannelID: String,
  FeedbackChannelID: String,
  BotPrefix: String,
  SupportRoleID: String,
  ManagerRoleID: String,
  AdminRoleID: String,
  BetaKey: String,
  PaidGuild: String,
  Tier: String,
  PremiumCode: String,
  Transcript: String,
  UseTicketReactions: String,
  UseDashboard: String,
  APIKey: String,
  TicketMessage: String,
  CloseMessage: String,
  ClaimTicketMessage: String,
  OpenTicket: String,
  DisabledCommands: String,
  TranscriptMessage: String,
  EnableTicket: String,
  ModMail: String,
  VoiceTicket: String,
  CustomBots: String,
  TicketIDLength: String,
<<<<<<< Updated upstream
=======
  SecondServer: String,
  SecondServerID: String,
  SecondServerSupportRoleID: String,
  SecondServerAdminRoleID: String,
  SecondServerManagerRoleID: String,
  SecondServerClaimChannel: String,
  SecondServerLogsChannel: String,
  SecondServerTranscriptChannel: String,
>>>>>>> Stashed changes
  BotVersion: String
})

module.exports = mongoose.model('TicketData',  TicketData)