const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require('discord.js');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'Owner', []);
  }

 async run(client, message, args) {
  if (message.author.id !== '406164395643633665') {
    const NotOwner = new MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setTitle('Help')
      .setDescription('You cannot use the following the command: `!servers`. The command is only available for the owner.')
    return message.channel.send(NotOwner)
  }
  client.guilds.cache.forEach(guild => {

    message.channel.send(`${guild.name} | ${guild.id}`)
  })
  }
}