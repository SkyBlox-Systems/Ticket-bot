const mongoose = require('mongoose')

let CommandsSchema = new mongoose.Schema({
    Guild: String,
    Cmds: Array
})

module.exports = mongoose.model('cnds', CommandsSchema)