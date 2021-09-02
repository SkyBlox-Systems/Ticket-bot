const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData')

module.exports = class TicketCommand extends BaseCommand {
  constructor() {
    super('ticket', 'Main', []);
  }

  async run(client, message, args) {

    MainDatabase.findOne({ ServerID: message.guild.id }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        if (data01.TicketTrackerChannelID === 'N/A') {
          const ErrorDataBase = new MessageEmbed()
            .setTitle('Error')
            .setDescription(`The Ticket Tracker is not set up in settings. Please edit it by using the command ${client.prefix}settings`)
          message.channel.send(ErrorDataBase)
        } else {

          const MSG = args.slice(0).join(" ")

          const InvaildCode2 = new MessageEmbed()
            .setTitle(`No reason is provided. ${client.prefix}ticket <reason>`)
      
          if (!MSG) return message.channel.send(InvaildCode2)

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
            ClaimTicket.findOne({ id: message.author.id }, async (err45, data45) => {
              if (err45) throw err;
              if (data45) {
                const embed = new MessageEmbed()
                  .setTitle(`Ticket`)
                  .addField('Information', `You have already opened a ticket. Please close your current ticket.`, true)
                  .addField('Channel', `<#${data45.ChannelID}>`, true)
                  .addField('Reason', `${data45.Reason}.`, true)
                  .addField('Ticket ID', `${data45.TicketIDs}`, true)
                await message.channel.send(embed)
              }
            })
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
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
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
                .setDescription(`You have open a ticket in the server ${message.guild.name}. You can found your ticket here: <#${chan.id}>`)
                .addField('Issue', `${MSG}.`, true)
                .addField('TicketID', `${generator}`, true)
                .setFooter(`${message.guild.name}| ${message.guild.id}`)
              await message.author.send(DmPerson);

              const TicketSupportID2 = message.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
              const TicketManagerID2 = message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

              const thankyou = new MessageEmbed()
                .setColor('#f6f7f8')
                .setTimestamp()
                .setFooter(`Ticket ID: <#${chan.id}>`)
                .setTitle('Ticket')
                .addField('Information', `Thank you for contacting Support! Please wait for a customer support to claim your ticket.`, true)
                .addField('Issue', `${MSG}.`, true)
                .addField('User', `<@${message.author.id}>`, true)
                .addField('Staff', `${TicketManagerID2} ${TicketSupportID2}`, true)
                .addField('Ticket Id', `${generator}`, true)
              await chan.send(thankyou).then((m) => {
                m.pin()
              })
              ClaimTicket.findOne({ id: message.author.id, ServerID: message.guild.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                  if (data.ServerID !== message.guild.id) {
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
                    const TicketSupportID = message.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                    TicketClainCommandSend.send(`${TicketSupportID} \n<@${message.author.id}> has open a ticket and needs support. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                  } else {


                    const DatabaseTicketMessage = new MessageEmbed()
                      .setTitle('Ticket error')
                      .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                      .addField('Ticket ID', `${data.TicketIDs}`, true)
                      .addField('reason', `${data.Reason}.`, true);

                    message.channel.send(DatabaseTicketMessage).then(m2 => {
                      m2.react('✅')

                      const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                      const collector25 = m2.createReactionCollector(filter25, { max: 1, time: 30000 }); // 5 min

                      collector25.on('collect', () => {
                        m2.delete()
                        ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data.ServerID }, async (err3, data3) => {
                          if (err3) throw err;
                          console.log(data3)
                          const deletedd = new MessageEmbed()
                            .setTitle('Info removed from database, please make another ticket!')
                          message.channel.send(deletedd)
                          const DeleteChannelWhenError = message.guild.channels.cache.get(`${chan.id}`);
                          DeleteChannelWhenError.delete();

                          setTimeout(() => {

                          }, 5000);
                          m2.delete()
                        })
                      })
                    })

                  }
                } else {
                  data = new ClaimTicket({
                    id: message.author.id,
                    TicketIDs: generator,
                    ServerID: message.guild.id,
                    ChannelID: chan.id,
                    Reason: MSG,
                    Time: currentDateAndTime,
                    ClaimUserID: ""
                  })
                  data.save()
                    .catch(err => console.log(err))
                  const TicketClainCommandSend = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "text")
                  const TicketSupportID = message.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                  TicketClainCommandSend.send(`${TicketSupportID} \n<@${message.author.id}> has open a ticket and needs support. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                  MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { TicketNumber: +1 }, async (err20, data20) => {
                    if (err20) throw err20;
                    if (data20) {
                      data20.save()
                      const MainTicketTrackerChannel = message.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                      MainTicketTrackerChannel.setName(`Tickets: ${data20.TicketNumber+1}`)
                    }
                  })
                }

              })
            })
          }

        }
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        message.channel.send(NoData)
      }
    })

  }
}