const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class SupportCommand extends BaseCommand {
  constructor() {
    super('support', 'Info', []);
  }

 async run(client, message, args) {
   const main = new MessageEmbed()
   .setTitle('Support')
   .setDescription('If you need help, please join our discord server: https://www.ticketbot.tk/discord or check our docs: https://docs.ticketbot.tk')
   .setColor('BLUE')

    message.channel.send({ embeds: [main]});
  }
}