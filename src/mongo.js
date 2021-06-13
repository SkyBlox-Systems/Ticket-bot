const mongoose = require('mongoose');
const { mongoPath } = require('./config.json')

module.exports = {
  init: () => {
    const DatabaseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(mongoPath,DatabaseOptions)
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
      console.log('The bot has connected to the Ticket Database!');
    })

    mongoose.connection.on('disconnected', () => {
      console.log('The bot has disconnected from the database: TicketBot');
    })
  }
}