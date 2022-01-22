const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class AnnounceCommand extends BaseCommand {
  constructor() {
    super('announce', 'admin', []);
  }

  async run(client, message, args) {

    let rChannel = message.guild.channels.cache.get(args[0]);
    if (!rChannel)
      return message.channel.send(
        `You did not specify your channel to send the announcement too!`
      );
    console.log(rChannel);
    let MSG = message.content
      .split(`${client.prefix}announce ${rChannel.id} `)
      .join("");
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);
    const _ = new MessageEmbed()
      .setTitle(`New announcement!`)
      .setDescription(`${MSG}`)
      .setFooter(`Announced by ${message.author.username}`)
      .setColor("RANDOM");
    rChannel.send({ embeds: [_]});
    message.delete();
  }
}