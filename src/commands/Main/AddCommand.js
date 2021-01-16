const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class AddCommand extends BaseCommand {
  constructor() {
    super('add', 'Main', []);
  }

  async run(client, message, args) {
    const perms = new MessageEmbed()
      .setColor('RED')
      .setTimestamp()
      .setTitle(`Error`)
      .setDescription(`You don't have the following permissions: Manage_message.`)

    const invaild = new MessageEmbed()
      .setColor('RED')
      .setTimestamp()
      .setTitle(`Error`)
      .setDescription(`You didn't mention a user, or you gave an invaild id.`)

    const NoMessage = new MessageEmbed()
      .setColor('RED')
      .setTimestamp()
      .setTitle(`Error`)
      .setDescription(`You did not specify your message`)

    const Added = new MessageEmbed()
      .setColor('GREEN')
      .setTimestamp()
      .setTitle('Added')
      .setDescription(`<@${message.author.id}> have added you to the following ticket <#${message.channel.id}>`)

    if (!message.channel.name.startsWith("ticket-")) return message.channel.send("This is not a valid ticket")
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(perms);
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(invaild);
    user.user
      .send(Added)
    message.channel.updateOverwrite(user, {
      SEND_MESSAGES: true,
      VIEW_CHANNEL: true,
      ATTATCH_FILES: true,
      MANAGE_CHANNELS: false,
    })
    const Logs = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")
    .then(() => Logs.send(`Added ${user.user.tag} to the following ticket <@${message.channel.id}>`))
      .then(() => message.channel.send(`Added ${user.user.tag} to this ticket!`));
  }
}