const { SlashCommandBuilder } = require('@discordjs/builders');
const Channel  = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { StringSelectMenuBuilder, ChannelType,  ComponentType, PermissionsBitField } = require('discord.js');var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData')
const timestamp = require('unix-timestamp');
timestamp.round = true



var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
  .setName('vcticket')
  .setDescription('Voice Call Command')
  .addStringOption(option =>
    option.setName('reason')
      .setDescription('Add a reason to ticket')
      .setRequired(true));

module.exports.run = (client, interaction) => {
  const MSG = interaction.options.getString('reason')
  const Xmas95 = new Date('December 31, 2021 00:00:00');
  if (Xmas95.getDate() == dd) {
    const DisabledInAllServers = new EmbedBuilder()
      .setTitle('Disabled!')
      .setDescription('The bot owner has disabled all creations of ticket in all servers for worldwide events. Please expect this to be enabled within 24 hours')

    interaction.reply({ embeds: [DisabledInAllServers] })
  }
  if (dd != Xmas95.getDate()) {
    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        if (data01.TicketTrackerChannelID === 'N/A') {
          const ErrorDataBase = new EmbedBuilder()
            .setTitle('Error')
            .setDescription(`The Ticket Tracker is not set up in settings. Please edit it by using the command ${client.prefix}settings`)
          interaction.reply({ embeds: [ErrorDataBase] })
        } else {
          if (data01.VoiceTicket === 'Enabled') {




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
            const names = "ticket-" + generator2;
              ClaimTicket.findOne({ id: user, ServerID: interaction.guild.id}, async (err45, data45) => {
                if (err45) throw err;
                if (data45) {
                  const embed = new EmbedBuilder()
                    .setTitle(`Ticket`)
                    .addFields([
                      { name: 'Infomation', value: `You have already opened a ticket. Please close your current ticket.`, inline: true },
                      { name: 'Channel', value: `<#${data45.ChannelID}>`, inline: true },
                      { name: 'Reason', value: `${data45.Reason}`, inline: true },
                      { name: 'Ticket ID', value: `${data45.TicketIDs}`, inline: true },
                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true }
                    ])
                    await interaction.reply({ embeds: [embed] })
                } else {
                  const Ticketcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == Discord.ChannelType.GuildCategory)

                  if(data01.PaidGuild === 'Yes') {
                    interaction.guild.channels.create({name: names, parent: Ticketcat , type: Discord.ChannelType.GuildVoice }).then(async (chan) => {
      

                      chan.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.everyone,
                          deny: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
                        }
                      ])

                      chan.permissionOverwrites.set([
                        {
                          id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ManageChannels]
                        }
                      ])
      
                      const open = new EmbedBuilder()
                        .setColor('#f6f7f8')
                        .setTimestamp()
                        .setTitle(`Ticket`)
                        .addFields([
                          { name: 'Infomation', value: `<@${interaction.user.id}> ${data01.OpenTicket}`, inline: true },
                        ])
                      await interaction.reply({ embeds: [open] });
      
                      const DmPerson = new EmbedBuilder()
                        .setColor('#f6f7f8')
                        .setTimestamp()
                        .setTitle('Ticket open')
                        .setDescription(`You have open a ticket in the server ${interaction.guild.name}. Please wait for a reply back from us for the time of your meeting ticket.`)
                        .addFields([
                          { name: 'TicketID', value: `${generator}`, inline: true },
                        ])
                        .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                      await interaction.user.send({ embeds: [DmPerson] });
      
                      const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                      const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)
      

                      ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guild.id }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                          if (data.ServerID !== interaction.guild.id) {
                            data = new ClaimTicket({
                              id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guild.id,
                                ChannelID: chan.id,
                                Reason: MSG,
                                Locked: "No",
                                Time: timestamp.now(),
                                AddedUser: Array,
                                Type: 'Voice',
                                ClaimUserID: "",
                                Priority: PriorityList
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
                              ServerID: interaction.guild.id,
                              ChannelID: chan.id,
                              Reason: MSG,
                              Locked: "No",
                              Time: timestamp.now(),
                              AddedUser: Array,
                              Type: 'Voice',
                              ClaimUserID: "",
                              Priority: PriorityList
                          })
                          data.save()
                            .catch(err => console.log(err))
                          const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)
                          const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                          TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run /claim ticketid:${generator}`)
                          MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketNumber: +1 }, async (err20, data20) => {
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
              })



          } else {
            if (data01.VoiceTicket === 'Disabled') {
              const disabledTicket = new EmbedBuilder()
                .setTitle('Disabled!')
                .setDescription('Server owner has disabled the creation of voice tickets in this server or, this server do not own premium.')

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