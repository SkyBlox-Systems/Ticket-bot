const BaseEvent = require('../../utils/structures/BaseEvent');
const blacklist = require('../../schemas/Blacklist-schema');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const db = require('../../schemas/commands')
const MainDatabase = require('../../schemas/TicketData')
const getprefix = require('../../utils/getprefix');
const { BotVersions } = require('../../../slappey.json')


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {

    
  }
}
