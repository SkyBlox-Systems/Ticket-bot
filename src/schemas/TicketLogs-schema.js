const mongoose = require('mongoose')

const CloseSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ticket: {
    type: [Object],
    required: true,
  },
})

module.exports = mongoose.model('ticket', CloseSchema)