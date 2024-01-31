const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const { BotVersions } = require('../../../slappey.json')
const version = '6.2'
const mongoose = require('mongoose');



module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {

    console.log(`[SkyBlox Systems] - ${client.user.tag}` + ' has logged in.');
    setTimeout(() => {
          console.log(mongoose.connection.readyState);
    }, 3000);
    if (BotVersions === version) {
      console.log('[SkyBlox Systems] - Bot is up to date')
    } else {
      console.log(`[SkyBlox Systems] - The bot is on verison v${version} and the latest version is v${BotVersions}`)
    }
    
  }
}