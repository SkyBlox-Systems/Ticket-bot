const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const { BotVersions } = require('../../../slappey.json')


module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {

    console.log(`[SkyBlox Systems] - ${client.user.tag}` + ' has logged in.');
    if (BotVersions === '4.1') {
      console.log('[SkyBlox Systems] - Bot is up to date')
    } else {
      console.log(`[SkyBlox Systems] - The bot is on verison v4.0 and the latest version is ${BotVersions}`)
    }
    
  }
}