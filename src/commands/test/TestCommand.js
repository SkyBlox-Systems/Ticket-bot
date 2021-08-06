const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons');
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData')
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
require('discord-buttons')(client)
const moment = require('moment');
require('moment-duration-format')





module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    message.channel.send('N/A')
  }
}
