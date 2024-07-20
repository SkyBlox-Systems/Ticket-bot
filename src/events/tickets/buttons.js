const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const { BotVersions } = require('../../../slappey.json')
const MainDatabase = require('../../schemas/TicketData');
const ClaimTicket = require('../../schemas/ticketclaim');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { StringSelectMenuBuilder, ChannelType, ComponentType, PermissionsBitField } = require('discord.js'); const { Permissions } = require('discord.js');
const { MessageCollector, Collector } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const discordTranscripts = require('discord-html-transcripts');
const timestamp = require('unix-timestamp');
timestamp.round = true



module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {

    // Ticket Buttons 
    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return
      if (interaction.customId === 'close') {
        const ButtonList = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("rate1")
              .setLabel("1")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("⭐"),
            new ButtonBuilder()
              .setCustomId("rate2")
              .setLabel("2")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("⭐"),
            new ButtonBuilder()
              .setCustomId("rate3")
              .setLabel('3')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⭐'),
            new ButtonBuilder()
              .setCustomId("rate4")
              .setLabel('4')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⭐'),
            new ButtonBuilder()
              .setCustomId("rate5")
              .setLabel('5')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⭐')
          );




        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            if (data.SecondServer === 'Enabled') {
              interaction.reply('This feature is currently disabled')
            } else {

              ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err2001, data2001) => {
                if (err2001) throw err2001;
                if (data2001) {
                  if (data2001.Locked === 'Yes') {
                    const cannotclose = new EmbedBuilder()
                      .setTitle('Can not close')
                      .setDescription('This ticket can not be closed because it is currently locked. Please unlock it by one of the staff members.')
                    return interaction.reply({ embeds: [cannotclose] })
                  } else {
                    if (data2001.Locked === 'No') {
                      MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
                        if (err01) throw err01;
                        if (data01) {

                          ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err200, data200) => {
                            if (err200) throw err200;
                            if (data200) {
                              if (data200.ClaimUserID === "") {

                                if (!interaction.member.roles.cache.some(r => r.id === `${data01.SupportRoleID}`)) {
                                  const NoPerms2 = new EmbedBuilder()
                                    .setTitle('Error')
                                    .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                                  return interaction.reply({ embeds: [NoPerms2] })
                                }

                                const NoClaimer = new EmbedBuilder()
                                  .setTitle('Error')
                                  .setDescription('No staff member has not claimed the ticket. This ticket can not be closed')

                                interaction.reply({ embeds: [NoClaimer] })

                              } else {

                                if (data01.Transcript === "Yes") {
                                  function makeURL(length) {
                                    var result = '';
                                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                                    var charactersLength = characters.length;
                                    for (var i = 0; i < length; i++) {
                                      result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                    }
                                    return result;
                                  }
                                  const generators = makeURL(20)


                                  const ticketembed = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`<@${interaction.user.id}>, are you sure you want to close this ticket? **yes**. If not, it will cancel the command within 10 seconds.`)

                                  const closed = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`You have closed the following ticket: ${interaction.channel.name}.`)

                                  const Logs = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle('Ticket-logs')
                                    .setDescription(`<@${interaction.user.id}> has close the following ticket: ${interaction.channel.name} successfully. \n\n All tickets are removed of our server within 24 hours.`)

                                  const notclosed = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`Close cancelled.`)

                                  const closing = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`Your ticket will be closed in 5 seconds`)
                                    .setFooter({ text: `Making a transcript....` })

                                  const ticketembed2 = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`<@${interaction.user.id}>, are you sure you want to close this ticket? **yes**. If not, it will automatticaly close within 10 seconds.`)

                                  const closed2 = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`You have closed the following ticket: ${interaction.channel.name}.`)

                                  const Logs2 = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle('Ticket-logs')
                                    .setDescription(`<@${interaction.user.id}> has close the following ticket: ${interaction.channel.name} successfully.`)

                                  const notclosed2 = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`Close cancelled.`)

                                  const closing2 = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle(`Ticket`)
                                    .setDescription(`Your ticket will be closed in 5 seconds`)

                                  if (!interaction.member.roles.cache.some(r => r.id === `${data01.SupportRoleID}`)) {
                                    const NoPerms3 = new EmbedBuilder()
                                      .setTitle('Error')
                                      .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                                    return interaction.reply({ embeds: [NoPerms3] })
                                  }

                                  if (data01.ModMail === 'Enabled') {

                                    if (!interaction.channel.name.startsWith("ticket-")) return interaction.channel.send("This is not a valid ticket")
                                    if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send("You need MANAGE_CHANNELS permission to use this command")
                                    interaction.reply({ embeds: [ticketembed] })
                                      .then((m) => {
                                        interaction.channel.awaitMessages({
                                          filter: response => response.content == "yes",
                                          max: 1,
                                          time: 10000,
                                          errors: ['time']
                                        }).then(() => {
                                          interaction.channel.send({ embeds: [closing] })

                                          setTimeout(() => {
                                            ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
                                              if (err) throw err;
                                              if (data) {

                                                const DMTicketCreatorClosed = new EmbedBuilder()
                                                  .setColor('#f5f5f5')
                                                  .setTimestamp()
                                                  .setTitle(`Ticket`)
                                                  .setDescription(`<@${data.ClaimUserID}> ${data01.CloseMessage}. Please rate the support below`)
                                                  .addFields([
                                                    { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
                                                    { name: 'Opened By', value: `<@${data.id}>`, inline: true },
                                                    { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
                                                    { name: 'Transcript', value: 'Soon', inline: true },
                                                    { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
                                                    { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                                    { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
                                                    { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
                                                    { name: 'Priority', value: `${data.Priority}`, inline: true }
                                                  ])


                                                const DMTicketClaimClosed = new EmbedBuilder()
                                                  .setColor('#f5f5f5')
                                                  .setTimestamp()
                                                  .setTitle(`Ticket`)
                                                  .setDescription(`You have closed the following ticket-${data.ChannelID} for the following user <@${data.id}>.`)


                                                const ticketttcreator = client.users.cache.get(data.id)
                                                ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

                                                const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
                                                ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
                                                setTimeout(() => {
                                                  ClaimTicket.findOneAndDelete({ ChannelID: data.ChannelID }, async (err02, data02) => {
                                                    if (err02) throw err02;
                                                    if (data02) {
                                                      console.log(`${data.id} ticket has been removed from the database`)
                                                    }
                                                  })
                                                }, 5000);


                                              }

                                              MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err30, data30) => {
                                                if (err30) throw err30;
                                                if (data30) {
                                                  const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                                  MainTicketTrackerChannel.setName(`Tickets: ${data30.TicketNumber - 1}`)
                                                }
                                              })
                                              interaction.channel.delete()

                                              const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                                              const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)

                                              const UserName = client.users.cache.find(user => user.id === data.id)
                                              console.log(UserName)

                                              SupportLogs.send({ embeds: [Logs] })

                                              const CloseEmbed = new EmbedBuilder()
                                                .setTitle('Transcript')
                                                .setDescription(`Transcript for the user ${data.id}`)
                                              TranscriptLogs.send({ embeds: [CloseEmbed] })


                                              const discordTranscripts = require('discord-html-transcripts');

                                              const channelsss = interaction.channel;
                                              const attachment = await discordTranscripts.createTranscript(channelsss, {
                                                limit: -1, // Max amount of messages to fetch.
                                                returnBuffer: false, // Return a buffer instead of a MessageAttachment 
                                                fileName: `${generators}.html` // Only valid with returnBuffer false. Name of attachment. 
                                              });

                                              TranscriptLogs.send({ files: [attachment] })


                                            })

                                          }, 5000);
                                        }).catch(() => {
                                          m.edit({ embeds: [notclosed] })
                                        })
                                      }).catch(() => {
                                        m.edit({ embeds: [notclosed] })
                                      })

                                  } else {
                                    if (data01.ModMail === 'Disabled') {

                                      if (!interaction.channel.name.startsWith("ticket-")) return interaction.channel.send("This is not a valid ticket")
                                      if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send("You need MANAGE_CHANNELS permission to use this command")
                                      interaction.reply({ embeds: [ticketembed] })
                                        .then((m) => {
                                          interaction.channel.awaitMessages({
                                            filter: response => response.content == "yes",
                                            max: 1,
                                            time: 10000,
                                            errors: ['time']
                                          }).then(() => {
                                            interaction.channel.send({ embeds: [closing] })

                                            setTimeout(() => {
                                              ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
                                                if (err) throw err;
                                                if (data) {

                                                  const DMTicketCreatorClosed = new EmbedBuilder()
                                                    .setColor('#f5f5f5')
                                                    .setTimestamp()
                                                    .setTitle(`Ticket`)
                                                    .setDescription(`<@${data.ClaimUserID}> ${data01.CloseMessage}. Please rate the support below`)
                                                    .addFields([
                                                      { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
                                                      { name: 'Opened By', value: `<@${data.id}>`, inline: true },
                                                      { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
                                                      { name: 'Transcript', value: 'Soon', inline: true },
                                                      { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
                                                      { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                                      { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
                                                      { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
                                                      { name: 'Priority', value: `${data.Priority}`, inline: true }
                                                    ])



                                                  const DMTicketClaimClosed = new EmbedBuilder()
                                                    .setColor('#f5f5f5')
                                                    .setTimestamp()
                                                    .setTitle(`Ticket`)
                                                    .setDescription(`You have closed the following ticket-${data.ChannelID} for the following user <@${data.id}>.`)


                                                  const ticketttcreator = client.users.cache.get(data.id)
                                                  ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

                                                  const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
                                                  ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
                                                  setTimeout(() => {
                                                    ClaimTicket.findOneAndDelete({ ChannelID: data.ChannelID }, async (err02, data02) => {
                                                      if (err02) throw err02;
                                                      if (data02) {
                                                        console.log(`${data.id} ticket has been removed from the database`)
                                                      }
                                                    })
                                                  }, 5000);


                                                }

                                                MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err30, data30) => {
                                                  if (err30) throw err30;
                                                  if (data30) {
                                                    const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                                    MainTicketTrackerChannel.setName(`Tickets: ${data30.TicketNumber - 1}`)
                                                  }
                                                })
                                                interaction.channel.delete()

                                                const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                                                const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)

                                                const UserName = client.users.cache.find(user => user.id === data.id)
                                                console.log(UserName)

                                                SupportLogs.send({ embeds: [Logs] })

                                                const CloseEmbed = new EmbedBuilder()
                                                  .setTitle('Transcript')
                                                  .setDescription(`Transcript for the user ${data.id}`)
                                                TranscriptLogs.send({ embeds: [CloseEmbed] })


                                                const discordTranscripts = require('discord-html-transcripts');

                                                const channelsss = interaction.channel;
                                                const attachment = await discordTranscripts.createTranscript(channelsss, {
                                                  limit: -1, // Max amount of messages to fetch.
                                                  returnBuffer: false, // Return a buffer instead of a MessageAttachment 
                                                  fileName: `${generators}.html` // Only valid with returnBuffer false. Name of attachment. 
                                                });

                                                TranscriptLogs.send({ files: [attachment] })
                                              })

                                            }, 5000);
                                          }).catch(() => {
                                            m.edit({ embeds: [notclosed] })
                                          })
                                        }).catch(() => {
                                          m.edit({ embeds: [notclosed] })
                                        })

                                    }
                                  }





                                } else {
                                  if (!message.member.roles.cache.some(r => r.id === `${data01.SupportRoleID}`)) {
                                    const NoPerms = new EmbedBuilder()
                                      .setTitle('Error')
                                      .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                                    return interaction.reply({ embeds: [NoPerms] })
                                  }


                                  if (!interaction.channel.name.startsWith("ticket-")) return interaction.reply("This is not a valid ticket")
                                  if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply("You need MANAGE_CHANNELS permission to use this command")
                                  interaction.reply({ embeds: [ticketembed2] }).then((m) => {
                                    interaction.channel.awaitMessages({
                                      filter: response => response.content == "yes",
                                      max: 1,
                                      time: 10000,
                                      errors: ['time']
                                    }).then(() => {
                                      interaction.channel.send(closing2)
                                      Transcriptmain();
                                      setTimeout(() => {
                                        ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
                                          if (err) throw err;
                                          if (data) {

                                            const DMTicketCreatorClosed = new EmbedBuilder()
                                              .setColor('#f5f5f5')
                                              .setTimestamp()
                                              .setTitle(`Ticket`)
                                              .setDescription(`<@${data.ClaimUserID}> has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you. Please rate the support below`)
                                              .addFields([
                                                { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
                                                { name: 'Opened By', value: `<@${data.id}>`, inline: true },
                                                { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
                                                { name: 'Transcript', value: 'Soon', inline: true },
                                                { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
                                                { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                                { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
                                                { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
                                                { name: 'Priority', value: `${data.Priority}`, inline: true }
                                              ])


                                            const DMTicketClaimClosed = new EmbedBuilder()
                                              .setColor('#f5f5f5')
                                              .setTimestamp()
                                              .setTitle(`Ticket`)
                                              .setDescription(`You have closed the following ticket ${data.ChannelID} for the following user <@${data.id}>.`)


                                            const ticketttcreator = client.users.cache.get(data.id)
                                            ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

                                            const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
                                            ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
                                            setTimeout(() => {
                                              ClaimTicket.findOneAndDelete({ ChannelID: interaction.channel.id }, async (err02, data02) => {
                                                if (err02) throw err02;
                                                if (data02) {
                                                  console.log(`${data.id} ticket has been removed from the database`)
                                                }
                                              })
                                            }, 5000);


                                          }

                                          MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err300, data300) => {
                                            if (err300) throw err300;
                                            if (data300) {
                                              const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                              MainTicketTrackerChannel.setName(`Tickets: ${data300.TicketNumber - 1}`)
                                            }
                                          })
                                          interaction.channel.delete()

                                          const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == "text")
                                          const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")

                                          const UserName = client.users.cache.find(user => user.id === data.id)
                                          console.log(UserName)

                                          SupportLogs.send({ embeds: [Logs2] })


                                        })

                                      }, 5000);
                                    }).catch(() => {
                                      interaction.channel.send({ embeds: [notclosed2] })
                                    })
                                  }).catch(() => {
                                    interaction.channel.send({ embeds: [notclosed2] })
                                  })
                                }

                              }
                            }
                          })

                        } else {
                          const NoData = new EmbedBuilder()
                            .setTitle('Not updated')
                            .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

                          interaction.reply({ embeds: [NoData] })
                        }
                      })

                    }
                  }
                } else {
                  interaction.reply('This is not a vaild ticket.')
                }
              })

            }
          }
        })


      }
      if (interaction.customId === 'lock') {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
          const NoPerms = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
          return interaction.reply({ embeds: [NoPerms] })
        }
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            if (data.ModMail === 'Enabled') {
              interaction.reply('We can not lock this ticket as ModMail is not supported via buttons **YET**')
            } else {
              ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err1, data1) => {
                if (err1) throw err;
                if (data1) {
                  if (data1.Locked === 'Yes') {
                    interaction.reply('This chat is already locked')
                  } else {
                    const ClaimUser = data1.ClaimUserID
                    const UserID = data1.id
                    if (data1.Locked === 'No') {


                      interaction.channel.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.cache.find(roles => roles.id === `${data.ManagerRoleID}`),
                          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles],
                          deny: [PermissionsBitField.Flags.ManageChannels]
                        }
                      ])
                      interaction.channel.permissionOverwrites.set([
                        {
                          id: ClaimUser,
                          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ManageChannels]
                        }
                      ])

                      interaction.channel.permissionOverwrites.set([
                        {
                          id: UserID,
                          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                          deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles]
                        }
                      ])
                      interaction.channel.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                        }
                      ])
                      const NoLocked = new EmbedBuilder()
                        .setTitle('Locked')
                        .setDescription(`<@${interaction.user.id}> has locked your ticket! This ticket can not be closed unless it has been unlocked once again. Please contact an Ticket Support manager if this was a mistake.`)
                      interaction.reply({ embeds: [NoLocked] })

                      ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: 'Yes' }, async (err2, data2) => {
                        if (err2) throw err2;
                        if (data2) {
                          data2.save()
                        }
                      })

                    }
                  }
                }
              })
            }
          }
        })
      }
      if (interaction.customId === 'unlock') {
        if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
          const NoPerms = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
          return interaction.reply({ embeds: [NoPerms] })
        }
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
          if (err) throw err;
          if (data) {
            if (data.ModMail === 'Enabled') {
              interaction.reply('We can not lock this ticket as ModMail is not supported via buttons **YET**')
            } else {
              ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err1, data1) => {
                if (err1) throw err;
                if (data1) {
                  if (data1.Locked === 'No') {
                    interaction.reply('This chat is already unlocked')
                  } else {
                    const ClaimUser = data1.ClaimUserID
                    const UserID = data1.id
                    if (data1.Locked === 'Yes') {
                      interaction.channel.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.cache.find(roles => roles.id === `${data.ManagerRoleID}`),
                          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles],
                          deny: [PermissionsBitField.Flags.ManageChannels]
                        }
                      ])

                      interaction.channel.permissionOverwrites.set([
                        {
                          id: ClaimUser,
                          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.ManageChannels]
                        }
                      ])

                      interaction.channel.permissionOverwrites.set([
                        {
                          id: UserID,
                          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                          deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.AttachFiles]
                        }
                      ])
                      interaction.channel.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                        }
                      ])
                      const NoLocked = new EmbedBuilder()
                        .setTitle('Locked')
                        .setDescription(`<@${interaction.user.id}> has unlocked your ticket! This ticket can not be closed unless it has been unlocked once again. Please contact an Ticket Support manager if this was a mistake.`)
                      interaction.reply({ embeds: [NoLocked] })

                      ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: 'No' }, async (err2, data2) => {
                        if (err2) throw err2;
                        if (data2) {
                          data2.save()
                        }
                      })

                    }
                  }
                }
              })
            }
          }
        })
      }
      if (interaction.customId === 'transcript') {
        const channelsss = interaction.channel;
        const attachment = await discordTranscripts.createTranscript(channelsss, {
          limit: -1, // Max amount of messages to fetch.
          returnBuffer: false, // Return a buffer instead of a MessageAttachment 
          fileName: `${channelsss}.html` // Only valid with returnBuffer false. Name of attachment. 
        });

        interaction.reply({ content: 'Below, we have given you the transcript. This can only be shown to you', files: [attachment], ephemeral: true })
      }
    });

    // Ticket Reactions
    client.on('interactionCreate', interaction => {
      if (!interaction.isButton()) return
      if (interaction.customId === 'create') {

        function makeURL(length) {
          var result = '';
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
        };

        const ButtonList = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('close')
              .setLabel('Close')
              .setStyle(ButtonStyle.Success)
              .setEmoji('📫'),
            new ButtonBuilder()
              .setCustomId("lock")
              .setLabel("Lock")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("🔒"),
            new ButtonBuilder()
              .setCustomId("unlock")
              .setLabel("Unlock")
              .setStyle(ButtonStyle.Primary)
              .setEmoji("🔓"),
            new ButtonBuilder()
              .setCustomId("transcript")
              .setLabel('Transcript')
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('🎫')
          );


        var today = new Date();
        var dd = String(today.getDate());
        const Xmas95 = new Date('December 24, 2023 00:00:00');
        if (Xmas95.getDate() == dd) {
          const DisabledInAllServers = new EmbedBuilder()
            .setTitle('Disabled!')
            .setDescription('The bot owner has disabled all creations of ticket in all servers for worldwide events. https://status.skybloxsystems.com/incident/298944')

          interaction.reply({ embeds: [DisabledInAllServers] })
        }
        if (dd != Xmas95.getDate()) {
          MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
            if (err01) throw err01;
            if (data01) {
              if (data01.TicketTrackerChannelID === 'N/A') {
                const ErrorDataBase = new EmbedBuilder()
                  .setTitle('Error')
                  .setDescription(`The Ticket Tracker is not set up in settings. Please edit it by using the command /settings`)
                interaction.reply({ embeds: [ErrorDataBase] })
              } else {
                if (data01.EnableTicket === 'Enabled') {

                  const TicketIDMainLength = data01.TicketIDLength
                  const generator = makeURL(20)
                  const generator2 = makeURL(TicketIDMainLength)

                  const user = interaction.user.id;
                  const names = "ticket-" + generator2;
                  ClaimTicket.findOne({ id: user, ServerID: interaction.guild.id }, async (err45, data45) => {
                    if (err45) throw err;
                    if (data45) {
                      const embed = new EmbedBuilder()
                        .setTitle(`Ticket`)
                        .addFields([
                          { name: 'Infomation', value: `You have already opened a ticket. Please close your current ticket.`, inline: true },
                          { name: 'Channel', value: `<#${data45.ChannelID}>`, inline: true },
                          { name: 'Reason', value: `${data45.Reason}`, inline: true },
                          { name: 'Ticket ID', value: `${data45.TicketIDs}`, inline: true },
                          { name: 'Priority', value: `N/A`, inline: true }
                        ])
                      await interaction.reply({ embeds: [embed] })
                    } else {
                      const Ticketcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == Discord.ChannelType.GuildCategory)

                      if (data01.SecondServer === 'Enabled') {
                        if (data01.SecondServerID === 'N/A')
                          return interaction.reply('No other guild has been added')
                        if (data01.SecondServerSupportRoleID === 'N/A')
                          return interaction.reply('No support role ID has been setup on the other guild')
                        if (data01.SecondServerManagerRoleID === 'N/A')
                          return interaction.reply('No support manager role ID has been setup on the other guild')
                        const newguild = client.guilds.cache.get(data01.SecondServerID)

                        interaction.guild.channels.create({
                          name: names,
                          parent: Ticketcat,
                          type: ChannelType.GuildText,
                          permissionOverwrites: [
                            {
                              id: interaction.guild.roles.everyone,
                              deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                            },
                            {
                              id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                              allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.AttachFiles],
                            }
                          ]
                        }).then(async (chan) => {
                          chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been opened as from: ${currentDateAndTime} UTC.`)

                          const open = new EmbedBuilder()
                            .setColor('#f6f7f8')
                            .setTimestamp()
                            .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                            .setTitle(`Ticket`)
                            .addFields([
                              { name: 'Information', value: `<@${interaction.user.id}> ${data01.OpenTicket}`, inline: true },
                              { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                              { name: 'Priority', value: `N/A`, inline: true }
                            ])

                          await interaction.reply({ embeds: [open] });

                          // const LogsMessageOpen = new EmbedBuilder()
                          // .setTitle('Logs')
                          // .setDescription('A ticket has been opened in this guild')
                          // .addFields([
                          //   { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                          //   { name: 'Ticket ID', value: `${generator}`, inline: true },
                          //   { name: 'Priority', value: `${PriorityList}`|| `N/A`, inline: true }, 
                          //   { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                          // ])

                          // SupportLogs.send({ embed: [LogsMessageOpen ]})



                          const DmPerson = new EmbedBuilder()
                            .setColor('#f6f7f8')
                            .setTimestamp()
                            .setTitle('Ticket open')
                            .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                            .addFields([
                              { name: 'TicketID', value: `${generator}`, inline: true },
                              { name: 'Priority', value: `N/A`, inline: true }
                            ])
                            .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                          await interaction.user.send({ embeds: [DmPerson] });

                          const TicketSupportID = newguild.roles.cache.find(roles => roles.id === data01.SecondServerSupportRoleID)
                          const TicketManagerID = newguild.roles.cache.find(roles => roles.id === data01.SecondServerManagerRoleID)
                          newguild.channels.cache.get(`${data01.SecondServerClaimChannel}`).send(`${TicketSupportID}, ${TicketManagerID} \n<@${interaction.user.id}> has open a support ticket! Please run /claim ticketid:${generator} to claim the ticket!`)

                          ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err3, data3) => {
                            console.log(data3)
                            if (data3 === null) {
                              data3 = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: newguild.id,
                                ChannelID: chan.id,
                                Reason: 'N/A',
                                Locked: "No",
                                Time: timestamp.now(),
                                AddedUser: Array,
                                Type: 'Channel',
                                ClaimUserID: "",
                                ClaimTime: "00000",
                                Priority: 'N/A'
                              })
                              data3.save()
                              console.log('data saved')
                            }
                          })
                          MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1, ClosedTickets: +1 }, async (err20, data20) => {
                            if (err20) throw err20;
                            if (data20) {
                              data20.save()
                              const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                              MainTicketTrackerChannel.setName(`Tickets: ${data01.TicketNumber + 1}`)
                            }
                          })

                          const thankyou = new EmbedBuilder()
                            .setColor('#f6f7f8')
                            .setTimestamp()
                            .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                            .setTitle('Ticket')
                            .setDescription('To reply to this user ticket, please use the following command `/ticketreply message:` ')
                            .addFields([
                              { name: 'Infomation', value: `${data01.TicketMessage}`, inline: true },
                              { name: 'Issue', value: `N/A`, inline: true },
                              { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                              { name: 'Staff', value: `${TicketSupportID} ${TicketManagerID}`, inline: true },
                              { name: 'Ticket ID', value: `${generator}`, inline: true },
                              { name: 'Priority', value: `N/A`, inline: true }
                            ])
                          await chan.send({ embeds: [thankyou] }).then((m) => {
                            m.pin()
                          })
                        })
                      } else {
                        if (data01.SecondServer === 'Disabled') {
                          if (data01.ModMail === 'Enabled') {
                            if (data01.SecondServer === 'Enabled') {
                              // return nothing
                            }
                            if (data01.ROBLOX === 'Enabled')
                              return interaction.reply('ROBLOX support will not work as Mod Mail is enabled.')
                            interaction.guild.channels.create({
                              name: names,
                              parent: Ticketcat,
                              type: ChannelType.GuildText,

                              permissionOverwrites: [
                                {
                                  id: interaction.guild.roles.everyone,
                                  deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                                },
                                {
                                  id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                  allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.AttachFiles],
                                }
                              ]

                            }).then(async (chan) => {
                              chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                              const open = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                .setTitle(`Ticket`)
                                .addFields([
                                  { name: 'Infomation', value: `<@${interaction.user.id}> ${data01.OpenTicket}`, inline: true },
                                  { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                  { name: 'Priority', value: `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                ])

                              await interaction.reply({ embeds: [open], ephemeral: true });

                              // const LogsMessageOpen = new EmbedBuilder()
                              // .setTitle('Logs')
                              // .setDescription('A ticket has been opened in this guild')
                              // .addFields([
                              //   { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                              //   { name: 'Ticket ID', value: `${generator}`, inline: true },
                              //   { name: 'Priority', value: `${PriorityList}`|| `N/A`, inline: true }, 
                              //   { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                              // ])

                              // SupportLogs.send({ embed: [LogsMessageOpen ]})

                              const DmPerson = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setTitle('Ticket open')
                                .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                                .addFields([
                                  { name: 'TicketID', value: `${generator}`, inline: true },
                                  { name: 'Priority', value: `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                ])
                                .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })

                              await interaction.user.send({ embeds: [DmPerson] });

                              const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                              const TicketOpenLogs = new EmbedBuilder()
                                .setTitle('Logs')
                                .setDescription('A Ticket has been opened in this guild')
                                .addFields([
                                  { name: 'User', value: `${interaction.user.name}`, inline: true },
                                  { name: 'Ticket ID', value: `${generator}`, inline: true },
                                  { name: 'Priority', value: `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                ])

                              SupportLogs.send({ embeds: [TicketOpenLogs] })

                              const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                              const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                              const thankyou = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                .setTitle('Ticket')
                                .setDescription('To reply to this user ticket, please use the following command `/ticketreply message:` ')
                                .addFields([
                                  { name: 'Infomation', value: `${data01.TicketMessage}`, inline: true },
                                  { name: 'Issue', value: `N/A`, inline: true },
                                  { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                  { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                  { name: 'Ticket  ID', value: `${generator}`, inline: true },
                                  { name: 'Priority', value: `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                ])

                              await chan.send({ embeds: [thankyou], components: [ButtonList] }).then((m) => {
                                m.pin()
                              })
                              ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err, data) => {
                                if (err) throw err;
                                if (data) {
                                  if (data.ServerID !== interaction.guild.id) {
                                    data = new ClaimTicket({
                                      id: interaction.user.id,
                                      TicketIDs: generator,
                                      ServerID: newguild.id,
                                      ChannelID: chan.id,
                                      Reason: 'N/A',
                                      Locked: "No",
                                      Time: timestamp.now(),
                                      AddedUser: Array,
                                      Type: 'Channel',
                                      ClaimUserID: "",
                                      ClaimTime: "00000",
                                      Priority: 'N/A'
                                    })
                                    data.save()
                                      .catch(err => console.log(err))
                                    const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                    const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                    TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run /claim ticketid:${generator} to claim the ticket!`)
                                  } else {
                                    const DatabaseTicketMessage = new EmbedBuilder()
                                      .setTitle('Ticket error')
                                      .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                      .addFields([
                                        { name: 'Ticket ID', value: `${data01.TicketIDs}`, inline: true },
                                        { name: 'Reason', value: `${data01.Reason}`, inline: true },
                                      ])

                                    interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                      m2.react('✅')

                                      const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                      const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min

                                      collector25.on('collect', () => {
                                        m2.delete()
                                        ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                          if (err3) throw err;
                                          console.log(data3)
                                          const deletedd = new EmbedBuilder()
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
                                    ServerID: newguild.id,
                                    ChannelID: chan.id,
                                    Reason: 'N/A',
                                    Locked: "No",
                                    Time: timestamp.now(),
                                    AddedUser: Array,
                                    Type: 'Channel',
                                    ClaimUserID: "",
                                    ClaimTime: "00000",
                                    Priority: 'N/A'
                                  })
                                  data.save()
                                    .catch(err => console.log(err))
                                  const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                  const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                  TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run /claim ticketid:${generator}`)
                                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1, ClosedTickets: +1 }, async (err20, data20) => {
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
                              if (data01.ROBLOX === 'Enabled') {
                                var axios = require('axios');
                                var data = '';

                                var config = {
                                  method: 'get',
                                  url: 'https://v3.blox.link/developer/discord/406164395643633662',
                                  headers: {
                                    'api-key': '1c59b661-b2a2-4ec4-847c-77df8da64cee'
                                  },
                                  data: data
                                };

                                axios(config)
                                  .then(function (response) {
                                    const noblox = require('noblox.js')
                                    if (response.data.user.robloxId === undefined) {
                                      const RBLXusername = 'Not Linked to Bloxlink'
                                      interaction.guild.channels.create({
                                        name: names,
                                        parent: Ticketcat,
                                        type: ChannelType.GuildText,
                                        permissionOverwrites: [
                                          {
                                            id: interaction.guild.roles.everyone,
                                            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                                          },
                                          {
                                            id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.AttachFiles],
                                          }
                                        ]
                                      }).then(async (chan) => {
                                        chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                                        const open = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                          .setTitle(`Ticket`)
                                          .addFields([
                                            { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                            { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                          ])



                                        await interaction.reply({ embeds: [open], ephemeral: true });


                                        // const LogsMessageOpen = new EmbedBuilder()
                                        // .setTitle('Logs')
                                        // .setDescription('A ticket has been opened in this guild')
                                        // .addFields([
                                        //   { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                        //   { name: 'Ticket ID', value: `${generator}`, inline: true },
                                        //   { name: 'Priority', value: `${PriorityList}`|| `N/A`, inline: true }, 
                                        //   { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                        // ])

                                        // SupportLogs.send({ embeds: [LogsMessageOpen ]})

                                        const DmPerson = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setTitle('Ticket open')
                                          .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                          .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                          .addFields([
                                            { name: 'Ticket ID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },

                                          ])

                                        await interaction.user.send({ embeds: [DmPerson] });

                                        const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                                        const TicketOpenLogs = new EmbedBuilder()
                                          .setTitle('Logs')
                                          .setDescription('A Ticket has been opened in this guild')
                                          .addFields([
                                            { name: 'User', value: `${interaction.user.name}`, inline: true },
                                            { name: 'Ticket ID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                          ])

                                        SupportLogs.send({ embeds: [TicketOpenLogs] })

                                        const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                        const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                                        const thankyou = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                          .setTitle('Ticket')
                                          .addFields([
                                            { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                            { name: 'Issue', value: `N/A`, inline: true },
                                            { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                            { name: 'Roblox username', value: `${RBLXusername}`, inline: true },
                                            { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                            { name: 'Ticket ID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                          ])


                                        await chan.send({ embeds: [thankyou], components: [ButtonList] }).then((m) => {
                                          m.pin()
                                        })
                                        ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err, data) => {
                                          if (err) throw err;
                                          if (data) {
                                            if (data.ServerID !== interaction.guild.id) {
                                              data = new ClaimTicket({
                                                id: interaction.user.id,
                                                TicketIDs: generator,
                                                ServerID: interaction.guild.id,
                                                ChannelID: chan.id,
                                                Reason: 'N/A',
                                                Locked: "No",
                                                Time: timestamp.now(),
                                                AddedUser: Array,
                                                Type: 'Channel',
                                                ClaimUserID: "",
                                                ClaimTime: "00000",
                                                Priority: 'N/A'
                                              })
                                              data.save()
                                                .catch(err => console.log(err))
                                              const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                              const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                              TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run /claim ticketid:${generator} to claim the ticket!`)
                                            } else {
                                              const DatabaseTicketMessage = new EmbedBuilder()
                                                .setTitle('Ticket error')
                                                .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                                .addFields([
                                                  { name: 'Ticket ID', value: `${data01.TicketIDs}`, inline: true },
                                                  { name: 'Reason', value: `${data01.Reason}`, inline: true }
                                                ])
                                              interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                                m2.react('✅')

                                                const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                                const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min

                                                collector25.on('collect', () => {
                                                  m2.delete()
                                                  ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                                    if (err3) throw err;
                                                    console.log(data3)
                                                    const deletedd = new EmbedBuilder()
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
                                              ServerID: interaction.guild.id,
                                              ChannelID: chan.id,
                                              Reason: 'N/A',
                                              Locked: "No",
                                              Time: timestamp.now(),
                                              AddedUser: Array,
                                              Type: 'Channel',
                                              ClaimUserID: "",
                                              ClaimTime: "00000",
                                              Priority: 'N/A'
                                            })
                                            data.save()
                                              .catch(err => console.log(err))
                                            const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                            const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run  /claim ticketid:${generator}`)
                                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1, ClosedTickets: +1 }, async (err20, data20) => {
                                              if (err20) throw err20;
                                              if (data20) {
                                                data20.save()
                                                const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                                MainTicketTrackerChannel.setName(`Tickets: ${data01.TicketNumber + 1}`)
                                              }
                                            })
                                          }

                                        })
                                      })
                                    } else {
                                      const RBLXusername = noblox.getUsernameFromId(response.user.robloxId)
                                      interaction.guild.channels.create({
                                        name: names,
                                        parent: Ticketcat,
                                        type: ChannelType.GuildText,
                                        permissionOverwrites: [
                                          {
                                            id: interaction.guild.roles.everyone,
                                            deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                                          },
                                          {
                                            id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                            allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.AttachFiles],
                                          }
                                        ]
                                      }).then(async (chan) => {
                                        chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)



                                        const open = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                          .setTitle(`Ticket`)
                                          .addFields([
                                            { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                            { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                          ])




                                        await interaction.reply({ embeds: [open], ephemeral: true });

                                        // const LogsMessageOpen = new EmbedBuilder()
                                        // .setTitle('Logs')
                                        // .setDescription('A ticket has been opened in this guild')
                                        // .addFields([
                                        //   { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                        //   { name: 'Ticket ID', value: `${generator}`, inline: true },
                                        //   { name: 'Priority', value: `${PriorityList}`|| `N/A`, inline: true }, 
                                        //   { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                        // ])

                                        // SupportLogs.send({ embeds: [LogsMessageOpen ]})

                                        const DmPerson = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setTitle('Ticket open')
                                          .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                          .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                          .addFields([
                                            { name: 'TicketID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                          ])


                                        await interaction.user.send({ embeds: [DmPerson] });

                                        const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                                        const TicketOpenLogs = new EmbedBuilder()
                                          .setTitle('Logs')
                                          .setDescription('A Ticket has been opened in this guild')
                                          .addFields([
                                            { name: 'User', value: `${interaction.user.name}`, inline: true },
                                            { name: 'Ticket ID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                          ])

                                        SupportLogs.send({ embeds: [TicketOpenLogs] })

                                        const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                        const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                                        const thankyou = new EmbedBuilder()
                                          .setColor('#f6f7f8')
                                          .setTimestamp()
                                          .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                          .setTitle('Ticket')
                                          .addFields([
                                            { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                            { name: 'Issue', value: `N/A`, inline: true },
                                            { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                            { name: 'Roblox username', value: `${RBLXusername}`, inline: true },
                                            { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                            { name: 'Ticket ID', value: `${generator}`, inline: true },
                                            { name: 'Priority', value: `N/A`, inline: true },
                                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                          ])

                                        await chan.send({ embeds: [thankyou], components: [ButtonList] }).then((m) => {
                                          m.pin()
                                        })
                                        ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err, data) => {
                                          if (err) throw err;
                                          if (data) {
                                            if (data.ServerID !== interaction.guild.id) {
                                              data = new ClaimTicket({
                                                id: interaction.user.id,
                                                TicketIDs: generator,
                                                ServerID: interaction.guild.id,
                                                ChannelID: chan.id,
                                                Reason: 'N/A',
                                                Locked: "No",
                                                Time: timestamp.now(),
                                                AddedUser: Array,
                                                Type: 'Channel',
                                                ClaimUserID: "",
                                                ClaimTime: "00000",
                                                Priority: 'N/A'
                                              })
                                              data.save()
                                                .catch(err => console.log(err))
                                              const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                              const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                              TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run /claim ticketid:${generator} to claim the ticket!`)
                                            } else {
                                              const DatabaseTicketMessage = new EmbedBuilder()
                                                .setTitle('Ticket error')
                                                .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                                .addFields([
                                                  { name: 'Ticket ID', value: `${data01.TicketIDs}`, inline: true },
                                                  { name: 'Reason', value: `${data01.Reason}`, inline: true }
                                                ])

                                              interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                                m2.react('✅')

                                                const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                                const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min

                                                collector25.on('collect', () => {
                                                  m2.delete()
                                                  ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                                    if (err3) throw err;
                                                    console.log(data3)
                                                    const deletedd = new EmbedBuilder()
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
                                              ServerID: interaction.guild.id,
                                              ChannelID: chan.id,
                                              Reason: 'N/A',
                                              Locked: "No",
                                              Time: timestamp.now(),
                                              AddedUser: Array,
                                              Type: 'Channel',
                                              ClaimUserID: "",
                                              ClaimTime: "00000",
                                              Priority: 'N/A'
                                            })
                                            data.save()
                                              .catch(err => console.log(err))
                                            const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                            const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run /claim ticketid:${generator}`)
                                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1, ClosedTickets: +1 }, async (err20, data20) => {
                                              if (err20) throw err20;
                                              if (data20) {
                                                data20.save()
                                                const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                                MainTicketTrackerChannel.setName(`Tickets: ${data01.TicketNumber + 1}`)
                                              }
                                            })
                                          }

                                        })
                                      })
                                    }
                                  })



                              } else {
                                if (data01.ROBLOX === 'Disabled') {
                                  interaction.guild.channels.create({
                                    name: names,
                                    parent: Ticketcat,
                                    type: ChannelType.GuildText,
                                    permissionOverwrites: [
                                      {
                                        id: interaction.guild.roles.everyone,
                                        deny: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                                      },
                                      {
                                        id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.AttachFiles],
                                      }
                                    ]
                                  }).then(async (chan) => {
                                    chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                                    const open = new EmbedBuilder()
                                      .setColor('#f6f7f8')
                                      .setTimestamp()
                                      .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                      .setTitle(`Ticket`)
                                      .addFields([
                                        { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                        { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                        { name: 'Priority', value: `N/A`, inline: true },
                                        { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                      ])



                                    await interaction.reply({ embeds: [open], ephemeral: true });

                                    // const LogsMessageOpen = new EmbedBuilder()
                                    // .setTitle('Logs')
                                    // .setDescription('A ticket has been opened in this guild')
                                    // .addFields([
                                    //   { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                    //   { name: 'Ticket ID', value: `${generator}`, inline: true },
                                    //   { name: 'Priority', value: `${PriorityList}`|| `N/A`, inline: true }, 
                                    //   { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                    // ])

                                    // SupportLogs.send({ embed: [LogsMessageOpen ]})

                                    const DmPerson = new EmbedBuilder()
                                      .setColor('#f6f7f8')
                                      .setTimestamp()
                                      .setTitle('Ticket open')
                                      .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                      .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                      .addFields([
                                        { name: 'Ticket ID', value: `${generator}`, inline: true },
                                        { name: 'Priority', value: `N/A`, inline: true },
                                        { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                      ])

                                    await interaction.user.send({ embeds: [DmPerson] });

                                    const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                                    const TicketOpenLogs = new EmbedBuilder()
                                      .setTitle('Logs')
                                      .setDescription('A Ticket has been opened in this guild')
                                      .addFields([
                                        { name: 'User', value: `${interaction.user.name}`, inline: true },
                                        { name: 'Ticket ID', value: `${generator}`, inline: true },
                                        { name: 'Priority', value: `N/A`, inline: true },
                                        { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                      ])

                                    SupportLogs.send({ embeds: [TicketOpenLogs] })

                                    const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                    const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                                    const thankyou = new EmbedBuilder()
                                      .setColor('#f6f7f8')
                                      .setTimestamp()
                                      .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                      .setTitle('Ticket')
                                      .addFields([
                                        { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                        { name: 'Issue', value: `N/A`, inline: true },
                                        { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                        { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                        { name: 'Ticket ID', value: `${generator}`, inline: true },
                                        { name: 'Priority', value: `N/A`, inline: true },
                                        { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                      ])

                                    await chan.send({ embeds: [thankyou], components: [ButtonList] }).then((m) => {
                                      m.pin()
                                    })
                                    ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err, data) => {
                                      if (err) throw err;
                                      if (data) {
                                        if (data.ServerID !== interaction.guild.id) {
                                          data = new ClaimTicket({
                                            id: interaction.user.id,
                                            TicketIDs: generator,
                                            ServerID: interaction.guild.id,
                                            ChannelID: chan.id,
                                            Reason: 'N/A',
                                            Locked: "No",
                                            Time: timestamp.now(),
                                            AddedUser: Array,
                                            Type: 'Channel',
                                            ClaimUserID: "",
                                            ClaimTime: "00000",
                                            Priority: 'N/A'
                                          })
                                          data.save()
                                            .catch(err => console.log(err))
                                          const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                          const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                          TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                                        } else {
                                          const DatabaseTicketMessage = new EmbedBuilder()
                                            .setTitle('Ticket error')
                                            .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                            .addFields([
                                              { name: 'Ticket ID', value: `${data01.TicketIDs}`, inline: true },
                                              { name: 'Reason', value: `${data01.Reason}.`, inline: true },
                                            ])

                                          interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                            m2.react('✅')

                                            const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                            const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min

                                            collector25.on('collect', () => {
                                              m2.delete()
                                              ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                                if (err3) throw err;
                                                console.log(data3)
                                                const deletedd = new EmbedBuilder()
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
                                          ServerID: interaction.guild.id,
                                          ChannelID: chan.id,
                                          Reason: 'N/A',
                                          Locked: "No",
                                          Time: timestamp.now(),
                                          AddedUser: Array,
                                          Type: 'Channel',
                                          ClaimUserID: "",
                                          ClaimTime: "00000",
                                          Priority: 'N/A'
                                        })
                                        data.save()
                                          .catch(err => console.log(err))
                                        const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                                        const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                        TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run  /claim ticketid:${generator}`)
                                        MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1, ClosedTickets: +1 }, async (err20, data20) => {
                                          if (err20) throw err20;
                                          if (data20) {
                                            data20.save()
                                            const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
                                            MainTicketTrackerChannel.setName(`Tickets: ${data01.TicketNumber + 1}`)
                                          }
                                        })
                                      }

                                    })
                                  })
                                }
                              }

                            }
                          }


                        }

                      }
                    }


                  })



                } else {
                  if (data01.EnableTicket === 'Disabled') {
                    const disabledTicket = new EmbedBuilder()
                      .setTitle('Disabled!')
                      .setDescription('Server owner has disabled the creation of tickets in this server.')

                    interaction.reply({ embeds: [disabledTicket] })

                  }



                }
              }
            } else {
              const NoData = new EmbedBuilder()
                .setTitle('Not updated')
                .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

              interaction.reply({ embeds: [NoData] })
            }
          })
        }
      }
      if (interaction.customId === 'delete') {
        const ServerOwner = new EmbedBuilder()
          .setTitle('Error')
          .setDescription('This command is restricted to guild owner only. Please do not try and use this command because you will not get anywhere.')
        if (interaction.user.id != interaction.guild.ownerId)
          return interaction.reply({ embeds: [ServerOwner] });

        interaction.message.delete()
        const DMuser = client.users.cache.get(interaction.user.id)
        DMuser.send('Message has been deleted')
      }
    });

    // Ratings 
    client.on('interactionCreate', interaction => {
      if (!interaction.isButton()) return
      if (interaction.customId === '1') {
        interaction.reply('Thank you for your submission')
      }
    });

  }
}