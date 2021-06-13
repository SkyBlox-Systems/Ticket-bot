const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../../schemas/ticketclaim')

module.exports = class TicketCommand extends BaseCommand {
  constructor() {
    super('ticket', 'Main', []);
  }

  async run(client, message, args) {
    function makeURL(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const generator = makeURL(20)

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

      message.guild.channels.create(name, { parent: Ticketcat }).then(async (chan) => {
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
        chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
          MANAGE_CHANNELS: true,
          ATTACH_FILES: true,
        })

        const open = new MessageEmbed()
          .setColor('#f6f7f8')
          .setTimestamp()
          .setFooter(`Ticket ID: <#${chan.id}>`)
          .setTitle(`Ticket`)
          .addField('Information', `<@${message.author.id}> I have open a ticket for you!`, true)
          .addField('Channel', `Your ticket is <#${chan.id}>`, true)
        await message.channel.send(open);

        const DmPerson = new MessageEmbed()
          .setColor('#f6f7f8')
          .setTimestamp()
          .setTitle('Ticket open')
          .setDescription(`You have open a ticket! You can found your ticket here: <#${chan.id}>`)
          .addField('Issue', `${MSG}.`, true)
          .addField('TicketID', `${generator}`, true)
        await message.author.send(DmPerson);

        const thankyou = new MessageEmbed()
          .setColor('#f6f7f8')
          .setTimestamp()
          .setFooter(`Ticket ID: <#${chan.id}>`)
          .setTitle('Ticket')
          .addField('Information', `Thank you for contacting Support! Please wait for a customer support to claim your ticket.`, true)
          .addField('Issue', `${MSG}.`, true)
          .addField('User', `<@${message.author.id}>`, true)
          .addField('Staff', `N/A.`, true)
          .addField('Ticket Id', `${generator}`, true)
        await chan.send(thankyou).then((m) => {
          m.pin()
        })
        ClaimTicket.findOne({ id: message.author.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            message.channel.send('There is already ticket open with this id')
          } else {
            data = new ClaimTicket({
              id: message.author.id,
              TicketIDs: generator,
              ServerID: message.guild.id,
              ChannelID: chan.id,
              Reason: MSG,
              ClaimUserID: ""
            })
            data.save()
              .catch(err => console.log(err))
            const TicketClainCommandSend = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "text")
            const TicketSupportID = message.guild.roles.cache.find(roles => roles.name === 'ticket support')
            TicketClainCommandSend.send(`<@${TicketSupportID.id}> \n<@${message.author.id}> has open a ticket and needs support. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
          }

        })
      })
    }
  }
}