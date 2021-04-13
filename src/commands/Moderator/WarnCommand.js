const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'Moderator', []);
  }

  async run(client, message, args) {
    const Main = new Discord.MessageEmbed()
    .setTitle('Error')
    .setColor('RED')
    .setDescription('Due to the bot kicking instead of warning users, we have disabled this command until further notice.')
    .setTimestamp()

    message.channel.send(Main)
  }
}