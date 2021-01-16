const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

module.exports = class TicketCommand extends BaseCommand {
  constructor() {
    super('ticket', 'Main', []);
  }

 async run(client, message, args) {
  const user = message.author.id;
    const name = "ticket-" + user;
    if (message.guild.channels.cache.find(ch => ch.name == name)) {
      const embed = new MessageEmbed()
        .setTitle(`Ticket`)
        .addField('Information', `You have already opened a ticket. Please close your other ticket.`, true)
        .addField('Channel', `Your ticket is`, true);
      await message.channel.send(embed)
    } else {

        let MSG = message.content
        .split(`${client.prefix}ticket`)
        .join("");
        const Ticketcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "category")

      message.guild.channels.create(name, {parent: Ticketcat}).then(async (chan) => {
        chan.setTopic(`Your ticket ID is: ${message.author.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

        chan.updateOverwrite(message.guild.roles.everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false
        })
        chan.updateOverwrite(user, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          ATTACH_FILES: true,
          MANAGE_CHANNELS: true,
        })
        chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          MANAGE_CHANNELS: true,
          ATTACH_FILES: true,
        })
        chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            ATTACH_FILES: true,
          })

        const open = new MessageEmbed()
          .setColor('RANDOM')
          .setTimestamp()
          .setFooter(`Ticket ID: <#${chan.id}>`)
          .setTitle(`Ticket`)
          .addField('Information', `<@${message.author.id}> I have open a ticket for you!`, true)
          .addField('Channel', `Your ticket is <#${chan.id}>`, true)
        await message.channel.send(open);

        const thankyou = new MessageEmbed()
          .setColor('RANDOM')
          .setTimestamp()
          .setFooter(`Ticket ID: <#${chan.id}>`)
          .setTitle('Ticket')
          .addField('Information', `Thank you for contacting Support! Support will be with you shortly.`, true)
          .addField('Issue', `${MSG}.` , true)
          .addField('User', `<@${message.author.id}>`, true)
          .addField('Staff', `N/A.`, true)
        await chan.send(thankyou).then((m) => {
          m.pin()
        })
      })
    }
  }
}