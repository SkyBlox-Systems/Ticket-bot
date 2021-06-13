const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const axios = require('axios');
const Commando = require('discord.js-commando');

module.exports = class DashboardCommand extends BaseCommand {
  constructor() {
    super('dashboard', 'Owner', []);
  }

 async run(client, message, args) {
   const OwnerOnly = new MessageEmbed()
   .setTitle('Command is only for the bot Owner!')
   .setColor('#f6f7f8')
  if (message.author.id !== '838546930169937930') return message.channel.send(OwnerOnly);

  const Loaded = new MessageEmbed()
  .setTitle('Dashboard Loaded on all shards correctly!')
  .setColor('#f6f7f8')
    message.channel.send(Loaded)
    require('../../dashboard/server')
  }
}