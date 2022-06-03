const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData')



var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Ticket Command')
  .addStringOption(option =>
    option.setName('reason')
      .setDescription('Add a reason to ticket')
      .setRequired(true));

module.exports.run = (client, interaction) => {
  const MSG = interaction.options.getString('reason')
  const Xmas95 = new Date('December 31, 2021 00:00:00');
  if (Xmas95.getDate() == dd) {
    const DisabledInAllServers = new MessageEmbed()
      .setTitle('Disabled!')
      .setDescription('The bot owner has disabled all creations of ticket in all servers for worldwide events. Please expect this to be enabled within 24 hours')

    interaction.reply({ embeds: [DisabledInAllServers] })
  }
  if (dd != Xmas95.getDate()) {
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        if (data01.TicketTrackerChannelID === 'N/A') {
          const ErrorDataBase = new MessageEmbed()
            .setTitle('Error')
            .setDescription(`The Ticket Tracker is not set up in settings. Please edit it by using the command ${client.prefix}settings`)
          interaction.reply({ embeds: [ErrorDataBase] })
        } else {
          if (data01.EnableTicket === 'Enabled') {




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
            const generator2 = makeURL(5)

            const user = interaction.user.id;
            const name = "ticket-" + generator2;
              ClaimTicket.findOne({ id: user, ServerID: interaction.guildId}, async (err45, data45) => {
                if (err45) throw err;
                if (data45) {
                  const embed = new MessageEmbed()
                    .setTitle(`Ticket`)
                    .addField('Information', `You have already opened a ticket. Please close your current ticket.`, true)
                    .addField('Channel', `<#${data45.ChannelID}>`, true)
                    .addField('Reason', `${data45.Reason}.`, true)
                    .addField('Ticket ID', `${data45.TicketIDs}`, true)
                    await interaction.reply({ embeds: [embed] })
                } else {
                  const Ticketcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")

                  if(data01.ModMail === 'Enabled') {
                    interaction.guild.channels.create(name, { parent: Ticketcat }).then(async (chan) => {
                      chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
      
                      chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                      })
                      chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
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
                        .addField('Information', `<@${interaction.user.id}> ${data01.OpenTicket}`, true)
                        .addField('Channel', `Your ticket is <#${chan.id}>`, true)
                      await interaction.reply({ embeds: [open] });
      
                      const DmPerson = new MessageEmbed()
                        .setColor('#f6f7f8')
                        .setTimestamp()
                        .setTitle('Ticket open')
                        .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                        .addField('TicketID', `${generator}`, true)
                        .setFooter(`${interaction.guild.name}| ${interaction.guild.id}`)
                      await interaction.user.send({ embeds: [DmPerson] });
      
                      const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                      const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)
      
                      const thankyou = new MessageEmbed()
                        .setColor('#f6f7f8')
                        .setTimestamp()
                        .setFooter(`Ticket ID: <#${chan.id}>`)
                        .setTitle('Ticket')
                        .setDescription('To reply to this user ticket, please use the following command `/ticketreply message:` ')
                        .addField('Information', `${data01.TicketMessage}`, true)
                        .addField('Issue', `${MSG}.`, true)
                        .addField('User', `<@${interaction.user.id}>`, true)
                        .addField('Staff', `${TicketManagerID2} ${TicketSupportID2}`, true)
                        .addField('Ticket Id', `${generator}`, true)
                      await chan.send({ embeds: [thankyou] }).then((m) => {
                        m.pin()
                      })
                      ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guildId }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                          if (data.ServerID !== interaction.guildId) {
                            data = new ClaimTicket({
                              id: interaction.user.id,
                              TicketIDs: generator,
                              ServerID: interaction.guildId,
                              ChannelID: chan.id,
                              Reason: MSG,
                              Locked: "No",
                              Time: currentDateAndTime,
                              AddedUser: Array,
                              Type: 'Channel',
                              ClaimUserID: ""
                            })
                            data.save()
                              .catch(err => console.log(err))
                            const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                          } else {
                            const DatabaseTicketMessage = new MessageEmbed()
                              .setTitle('Ticket error')
                              .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                              .addField('Ticket ID', `${data01.TicketIDs}`, true)
                              .addField('reason', `${data01.Reason}.`, true);
      
                            interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                              m2.react('✅')
      
                              const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                              const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min
      
                              collector25.on('collect', () => {
                                m2.delete()
                                ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                  if (err3) throw err;
                                  console.log(data3)
                                  const deletedd = new MessageEmbed()
                                    .setTitle('Info removed from database, please make another ticket!')
                                  interaction.channel.send({ embeds: [deletedd] })
                                  const DeleteChannelWhenError = interaction.guild.channels.cache.get(`${chan.id}`);
                                  DeleteChannelWhenError.delete();
      
                                  setTimeout(() => {
      
                                  }, 5000);
                                })
                              })
                            })
      
      
                          }
                        } else {
                          data = new ClaimTicket({
                            id: interaction.user.id,
                            TicketIDs: generator,
                            ServerID: interaction.guildId,
                            ChannelID: chan.id,
                            Reason: MSG,
                            Locked: "No",
                            Time: currentDateAndTime,
                            AddedUser: Array,
                            Type: 'Channel',
                            ClaimUserID: ""
                          })
                          data.save()
                            .catch(err => console.log(err))
                          const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                          const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                          TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket! \n With slash commands, please run /claim ticketid:${generator}`)
                          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: +1 }, async (err20, data20) => {
                            if (err20) throw err20;
                            if (data20) {
                              data20.save()
                              const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                              MainTicketTrackerChannel.setName(`Tickets: ${data20.TicketNumber + 1}`)
                            }
                          })
                        }
      
                      })
                    })
                  } else {
                    if (data01.ModMail === 'Disabled') {
                      interaction.guild.channels.create(name, { parent: Ticketcat }).then(async (chan) => {
                        chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
        
                        chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
                          SEND_MESSAGES: false,
                          VIEW_CHANNEL: false
                        })
                        chan.permissionOverwrites.create(user, {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: true,
                        })
                        chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
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
                          .addField('Information', `<@${interaction.user.id}> I have open a ticket for you!`, true)
                          .addField('Channel', `Your ticket is <#${chan.id}>`, true)
                        await interaction.reply({ embeds: [open] });
        
                        const DmPerson = new MessageEmbed()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setTitle('Ticket open')
                          .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                          .addField('TicketID', `${generator}`, true)
                          .setFooter(`${interaction.guild.name}| ${interaction.guild.id}`)
                        await interaction.user.send({ embeds: [DmPerson] });
        
                        const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                        const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)
        
                        const thankyou = new MessageEmbed()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setFooter(`Ticket ID: <#${chan.id}>`)
                          .setTitle('Ticket')
                          .addField('Information', `${data01.TicketMessage}`, true)
                          .addField('Issue', `${MSG}.`, true)
                          .addField('User', `<@${interaction.user.id}>`, true)
                          .addField('Staff', `${TicketManagerID2} ${TicketSupportID2}`, true)
                          .addField('Ticket Id', `${generator}`, true)
                        await chan.send({ embeds: [thankyou] }).then((m) => {
                          m.pin()
                        })
                        ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guildId }, async (err, data) => {
                          if (err) throw err;
                          if (data) {
                            if (data.ServerID !== interaction.guildId) {
                              data = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guildId,
                                ChannelID: chan.id,
                                Reason: MSG,
                                Locked: "No",
                                Time: currentDateAndTime,
                                AddedUser: Array,
                                Type: 'Channel',
                                ClaimUserID: ""
                              })
                              data.save()
                                .catch(err => console.log(err))
                              const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                              const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                              TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                            } else {
                              const DatabaseTicketMessage = new MessageEmbed()
                                .setTitle('Ticket error')
                                .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                .addField('Ticket ID', `${data01.TicketIDs}`, true)
                                .addField('reason', `${data01.Reason}.`, true);
        
                              interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                m2.react('✅')
        
                                const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min
        
                                collector25.on('collect', () => {
                                  m2.delete()
                                  ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                    if (err3) throw err;
                                    console.log(data3)
                                    const deletedd = new MessageEmbed()
                                      .setTitle('Info removed from database, please make another ticket!')
                                    interaction.channel.send({ embeds: [deletedd] })
                                    const DeleteChannelWhenError = interaction.guild.channels.cache.get(`${chan.id}`);
                                    DeleteChannelWhenError.delete();
        
                                    setTimeout(() => {
        
                                    }, 5000);
                                  })
                                })
                              })
        
        
                            }
                          } else {
                            data = new ClaimTicket({
                              id: interaction.user.id,
                              TicketIDs: generator,
                              ServerID: interaction.guildId,
                              ChannelID: chan.id,
                              Reason: MSG,
                              Locked: "No",
                              Time: currentDateAndTime,
                              Type: 'Channel',
                              ClaimUserID: ""
                            })
                            data.save()
                              .catch(err => console.log(err))
                            const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket! \n With slash commands, please run /claim ticketid:${generator}`)
                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: +1 }, async (err20, data20) => {
                              if (err20) throw err20;
                              if (data20) {
                                data20.save()
                                const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                MainTicketTrackerChannel.setName(`Tickets: ${data20.TicketNumber + 1}`)
                              }
                            })
                          }
        
                        })
                      })
                      
                    }
                  }

                  
                }
              })



          } else {
            if (data01.EnableTicket === 'Disabled') {
              const disabledTicket = new MessageEmbed()
                .setTitle('Disabled!')
                .setDescription('Server owner has disabled the creation of tickets in this server.')

              interaction.reply({ embeds: [disabledTicket] })

            }



          }
        }
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        interaction.reply({ embeds: [NoData] })
      }
    })
  }


}