const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const SettingsSchema = require('../../schemas/settings');
const { MessageEmbed, Guild } = require('discord.js');

module.exports = class SettingsCommand extends BaseCommand {
  constructor() {
    super('settings', 'Admin', []);
  }

  async run(client, message, args) {

    let embed = new MessageEmbed()
      .setTitle(`${message.guild.name} Ticket Bot settings`)
      .setDescription('If you see no fields below, it is because there is nothing saved in the database')
      .setColor('#f6f7f8')
      .addField(`prefix`, `${client.prefix}`)

    message.channel.send(embed);
  }
}