const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const axios = require('axios');

module.exports = class DashboardCommand extends BaseCommand {
  constructor() {
    super('dashboard', 'Owner', []);
  }

  async run(client, message, args) {
    const ServerOwner = new MessageEmbed()
      .setTitle('Owner only')
      .setDescription('This command is only allow to be used by the server owner.')

    const ListCommands = new MessageEmbed()
      .setTitle('Dashboard commands')
      .setDescription(`You need to use one of the arguements below \n ${client.prefix}dashboard guild \n ${client.prefix}dashboard settings \n ${client.prefix}dashboard commands`)

    if (message.author.id != message.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner] });

    const reasons = args.slice(0).join(" ")

    if (!args.length) {
      return message.channel.send({ embeds: [ListCommands] });
    } else if (args[0] === 'guild') {
      const guildDashboard = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Guild Dashboard Section')
            .setStyle('LINK')
            .setURL('https://dashboard.ticketbot.tk/manage/'),
        );

      return message.channel.send({ content: 'Dashboard!', components: [guildDashboard] });

    } else if (args[0] === 'settings') {
      const SettingsDashboard = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Settings Dashboard Section')
            .setStyle('LINK')
            .setURL(`https://dashboard.ticketbot.tk/guild/${message.guildId}`),
        );
      return message.channel.send({ content: 'Dashboard!', components: [SettingsDashboard] });
    } else if (args[0] === 'commands') {
      const CommandsDashboard = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Commnads Dashboard Section')
            .setStyle('LINK')
            .setURL(`https://dashboard.ticketbot.tk/commands`),
        );
        return message.channel.send({ content: 'Dashboard!', components: [CommandsDashboard]});
    }

    message.channel.send({ embeds: [ListCommands] });


  }
}