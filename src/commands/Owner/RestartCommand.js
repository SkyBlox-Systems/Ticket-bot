const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class RestartCommand extends BaseCommand {
  constructor() {
    super('restart', 'Owner', []);
  }

  async run(client, message, args) {
    if (message.author.id !== '406164395643633665') {
      const NotOwner = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setTitle('Help')
        .setDescription('You cannot use the following the command: `!restart`. The command is only available for the owner.')
      return message.channel.send(NotOwner)
    }
    const send = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Restart')
      .setDescription('We are restarting the bot. Please wait while we get everything working.')
      .setTimestamp()
    await message.channel.send(send)
    process.exit();
  }
}