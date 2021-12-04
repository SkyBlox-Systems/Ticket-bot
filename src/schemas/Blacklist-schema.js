const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    UserID: String,
    Reason: String,
    Time: String,
    Admin: String,
})

module.exports = mongoose.model('blacklist', Schema)