const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');


module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {

    console.log(client.user.tag + ' has logged in.');
    
  }
}