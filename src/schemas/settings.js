const mongoose = require('mongoose');

const SettingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guidID: String,
    lastEdited: String,
    prefix: { type: String, default: "!" },
    muteRoleID: { type: String, required: false },
    memberRoleID: { type: String, required: false }
  });
  
  module.exports = mongoose.model('GuildSettings', SettingsSchema)