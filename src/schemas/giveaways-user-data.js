
const mongoose = require('mongoose')

const Giveaways = mongoose.Schema({
    UserID: String,
    Email: String,
    Why: String,
    Usage: Number,
})

module.exports = mongoose.model('Giveaways',  Giveaways)