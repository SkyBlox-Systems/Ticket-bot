const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const mongoose = require('mongoose');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
  .setName('settings')
  .setDescription('Settings Command')
  .addStringOption(option =>
    option.setName('category')
      .setDescription('The main category')
      .setRequired(false)
      .addChoice('Ticket Tracker Channel ID', 'tracker')
      .addChoice('Ticket Channel ID', 'ticketchan')
      .addChoice('Feedback Channel ID', 'feedbackchann')
      .addChoice('Prefix', 'prefix')
      .addChoice('Support Role', 'support')
      .addChoice('Admin Role', 'admin')
      .addChoice('Manager Role', 'manager')
      .addChoice('Transcript', 'transcript')
      .addChoice('Tickets', 'tickets')
      .addChoice('Mod Mail', 'ModMail')
      .addChoice('View', 'view')
      .addChoice('Auto insert', 'Auto'))
  .addStringOption(NotNeeded =>
    NotNeeded.setName('optional')
      .setDescription('Only used if you are using prefix, role or channel and messages')
      .setRequired(false))
  .addStringOption(option =>
    option.setName('premium')
      .setDescription('This category can only be used by premium servers')
      .addChoice('Voice Tickets', 'Voice'))
  .addStringOption(option =>
    option.setName('change')
      .setDescription('List what messages you have access to')
      .addChoice('view', 'view')
      .addChoice('Ticket Message', 'ticketmessage')
      .addChoice('Close Message', 'closemessage')
      .addChoice('Claim Ticket Message', 'claimmessage')
      .addChoice('Transcript Message', 'transcriptmessage')
      .addChoice('Open Ticket Message (premium)', 'openticket'));


module.exports.run = (client, interaction) => {

  const ServerOwner = new MessageEmbed()
    .setTitle('Error')
    .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

  const teststring = interaction.options.getString('category');
  const optionalstring = interaction.options.getString('optional');
  const premiumstring = interaction.options.getString('premium');
  const changestring = interaction.options.getString('change')

  if (teststring === 'view') {
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.PaidGuild === 'Yes') {
          const ListSettingsPaid = new MessageEmbed()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription('List of the bot settings for the server.')
            .addField(`ServerID`, `${data.ServerID}`, true)
            .addField(`TicketChannelID`, `${data.TicketChannelID}`, true)
            .addField(`TicketNumber`, `${data.TicketNumber}`, true)
            .addField(`TicketTrackerChannelID`, `${data.TicketTrackerChannelID}`, true)
            .addField('FeedbackChannelID', `${data.FeedbackChannelID}`, true)
            .addField(`Prefix`, `${data.BotPrefix}`, true)
            .addField(`Support Role`, `${data.SupportRoleID}`, true)
            .addField('Manager Role', `${data.ManagerRoleID}`, true)
            .addField(`Admin Role`, `${data.AdminRoleID}`, true)
            .addField(`Beta Key`, `${data.BetaKey}`, true)
            .addField(`Tier`, `${data.Tier}`, true)
            .addField(`Create Transcripts`, `${data.Transcript}`, true)
            .addField('API Key', `${data.APIKey}`, true)
            .addField('Change messages', 'List messages', true)
            .addField('ModMail', `${data.ModMail}`, true)
            .addField(`Bot Version`, `${data.BotVersion}`, true)

          const ListSettingsPaid2 = new MessageEmbed()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription('List of the bot settings for the server (premium only).')
            .addField(`Voice Call Tickets`, `${data.VoiceTicket}`)
            .addField(`Amount of custom bots`, `${data.CustomBots}`)
            .addField(`Premium code`, `${data.PremiumCode}`)
            .addField(`Custom features`, `Soon`)

          const button1 = new Discord.MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Previous")
            .setStyle("DANGER");

          const button2 = new Discord.MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("SUCCESS");

          const pages = [
            ListSettingsPaid,
            ListSettingsPaid2
          ]


          const buttonList = [button1, button2];



          const timeout = '120000';


          pagination(interaction, pages, buttonList, timeout)
          interaction.reply({ content: 'Settings Premium' })

        } else {
          const ListSettings = new MessageEmbed()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription('List of the bot settings for the server.')
            .addField(`ServerID`, `${data.ServerID}`, true)
            .addField(`TicketChannelID`, `${data.TicketChannelID}`, true)
            .addField(`TicketNumber`, `${data.TicketNumber}`, true)
            .addField(`TicketTrackerChannelID`, `${data.TicketTrackerChannelID}`, true)
            .addField('FeedbackChannelID', `${data.FeedbackChannelID}`, true)
            .addField(`Prefix`, `${data.BotPrefix}`, true)
            .addField(`Support Role`, `${data.SupportRoleID}`, true)
            .addField('Manager Role', `${data.ManagerRoleID}`, true)
            .addField(`Admin Role`, `${data.AdminRoleID}`, true)
            .addField(`Beta Key`, `${data.BetaKey}`, true)
            .addField(`Tier`, `${data.Tier}`, true)
            .addField(`Create Transcripts`, `${data.Transcript}`, true)
            .addField('API Key', `${data.APIKey}`, true)
            .addField('Change messages', 'List messages', true)
            .addField('ModMail', `${data.ModMail}`, true)
            .addField(`Bot Version`, `${data.BotVersion}`, true)

          interaction.reply({ embeds: [ListSettings] })
        }
      }
    })
  }

  if (teststring === 'tracker') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketTrackerChannelID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedTracker = new MessageEmbed()
              .setTitle(`You have changed your ticket tracker channel ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedTracker] })
          }
        })
      }
    })
  }

  if (teststring === 'ticketchan') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketChannelID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedTicket = new MessageEmbed()
              .setTitle(`You have changed your ticket channel ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedTicket] })
          }
        })
      }
    })
  }

  if (teststring === 'feedbackchann') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { FeedbackChannelID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedTicket = new MessageEmbed()
              .setTitle(`You have changed your feedback channel ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedTicket] })
          }
        })
      }
    })
  }


  if (teststring === 'prefix') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { BotPrefix: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedprefix = new MessageEmbed()
              .setTitle(`You have changed your prefix in this server to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedprefix] })
          }
        })
      }
    })
  }

  if (teststring === 'support') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { SupportRoleID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedSupport = new MessageEmbed()
              .setTitle(`You have changed your support role ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedSupport] })
          }
        })
      }
    })
  }

  if (teststring === 'admin') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { AdminRoleID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedAdmin = new MessageEmbed()
              .setTitle(`You have changed your admin role ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedAdmin] })
          }
        })
      }
    })
  }

  if (teststring === 'manager') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { ManagerRoleID: optionalstring }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            data1.save()
            const updatedManager = new MessageEmbed()
              .setTitle(`You have changed your manager role ID to ${optionalstring}.`)
            interaction.reply({ embeds: [updatedManager] })
          }
        })
      }
    })
  }

  if (teststring === 'tickets') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.EnableTicket === 'Enabled') {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { EnableTicket: 'Disabled' }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              data1.save()
              const disabledtickets = new MessageEmbed()
                .setTitle('Tickets has been disabled on this server.')
              interaction.reply({ embeds: [disabledtickets] })
            }
          })
        } else {
          if (data.EnableTicket === 'Disabled') {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { EnableTicket: 'Enabled' }, async (err2, data2) => {
              data2.save()
              const enableddtickets = new MessageEmbed()
                .setTitle('Tickets has been enabled on this server.')
              interaction.reply({ embeds: [enableddtickets] })
            })
          }
        }
      }
    })

  }

  if (teststring === 'ModMail') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.ModMail === 'Enabled') {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { ModMail: 'Disabled' }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              data1.save()
              interaction.reply(`ModMail has been disabled in this server.`)
            }
          })
        } else {
          if (data.ModMail === 'Disabled') {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { ModMail: 'Enabled' }, async (err2, data2) => {

              if (err2) throw err;
              if (data2) {
                data2.save()
                interaction.reply(`ModMail has been enabled on this server.`)
              }
            })
          }
        }
      } else {
      }
    })
  }

  if (teststring === 'transcript') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });

    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.Transcript === 'Yes') {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { Transcript: "No" }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              data1.save()
              const disabledtranscript = new MessageEmbed()
                .setTitle('Transcript has been disabled on this server.')

              interaction.reply({ embeds: [disabledtranscript] })

            }
          })
        } else {
          if (data.Transcript === 'No') {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { Transcript: "Yes" }, async (err2, data2) => {
              if (err2) throw err;
              if (data2) {
                data2.save()
                const enabledtranscript = new MessageEmbed()
                  .setTitle('Transcript has been enabled on this server.')
                interaction.reply({ embeds: [enabledtranscript] })
              }
            })
          }
        }
      }
    })
  }

  if (teststring === 'Auto') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const TicketChannelMain2 = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "GUILD_TEXT")
        const FeedbackChannelID2 = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "feedback" && ch.type == "GUILD_TEXT")
        const TicketTrackerMain2 = interaction.guild.channels.cache.find(ch2 => ch2.name.toLowerCase() == `tickets: ${data.TicketNumber}` && ch2.type == "GUILD_VOICE")
        const SupportRoleMain2 = interaction.guild.roles.cache.find((r) => r.name === 'ticket support');
        const ManagerRoleMain2 = interaction.guild.roles.cache.find((r2) => r2.name === 'ticket manager');




        const AutoSetup = new MessageEmbed()
          .setTitle('Settings')
          .setDescription('This is only suggested to be used if this is your first time using the bot on the server The following thing will be added to settings. React with ✅ to do the setup or react with ❌ to cancel')
          .addField('TicketChannelID', `${TicketChannelMain2.id}`)
          .addField('TicketTrackerChannelID', `${TicketTrackerMain2.id}`)
          .addField('FeedbackChannelID', `${FeedbackChannelID2.id}`)
          .addField('Support Role', `${SupportRoleMain2}`)
          .addField('Manager Role', `${ManagerRoleMain2}`)

        const AutoSetupEmoji = await interaction.reply({ embeds: [AutoSetup], fetchReply: true })
        AutoSetupEmoji.react('✅')
        AutoSetupEmoji.react('❌')

        const Filter33 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector33 = AutoSetupEmoji.createReactionCollector({ filter: Filter33, max: 1, time: 2 * 60 * 1000 });
        const Filter34 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector34 = AutoSetupEmoji.createReactionCollector({ filter: Filter34, max: 1, time: 2 * 60 * 1000 });

        Collector33.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketChannelID: TicketChannelMain2.id, TicketTrackerChannelID: TicketTrackerMain2.id, FeedbackChannelID: FeedbackChannelID2.id, SupportRoleID: SupportRoleMain2.id, ManagerRoleID: ManagerRoleMain2.id }, async (err9, data9) => {
            if (err9) throw err9;
            if (data9) {
              data9.save()
              interaction.channel.send('Updated!')
            }
          })
        })

        Collector34.on('collect', () => {
          interaction.channel.send('Cancelled')
        })
      }
    }
    )
  }

  if (premiumstring === 'Voice') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.PaidGuild === 'Yes') {
          if (data.VoiceTicket === 'Disabled') {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { VoiceTicket: 'Enabled' }, async (err2, data2) => {
              if (err2) throw err;
              if (data2) {
                data2.save()
                interaction.reply('Voice tickets has been enabled on this server.')
              }
            })
          } else if (data.VoiceTicket === 'Enabled') {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { VoiceTicket: 'Disabled' }, async (err3, data3) => {
              if (err3) throw err;
              if (data3) {
                data3.save()
                interaction.reply('Voice tickets has been disabled on this server.')
              }
            })
          }
        }
      } else if (data.PaidGuild === 'No') {
        interaction.reply('This command can only be used by premium servers. Please upgrade here:')
      }
    })
  }

  if (changestring === 'view') {
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.PaidGuild === 'Yes') {
          const PremiumChange = new MessageEmbed()
            .setTitle('Change your message')
            .setDescription('Please select the message you want to change \n **The bold text in the message you can not change!**')
            .addField('Ticket Message', `${data.TicketMessage}`)
            .addField('Close Message', `**User** ${data.CloseMessage}`)
            .addField('Claim Ticket Message', `**User** ${data.ClaimTicketMessage}`)
            .addField('Transcript Message', `${data.TranscriptMessage} **Ticket-userid**`)
            .addField('Open Ticket Message', `**Ticket-userid** ${data.OpenTicket}`)

          interaction.reply({ embeds: [PremiumChange] })
        } else {
          if (data.PaidGuild === 'No') {
            const FreeChange = new MessageEmbed()
              .setTitle('Change your message')
              .setDescription('Please select the message you want to change \n **The bold text in the message you can not change!**')
              .addField('Ticket Message', `${data.TicketMessage}`)
              .addField('Close Message', `**User** ${data.CloseMessage}`)
              .addField('Claim Ticket Message', `**User** ${data.ClaimTicketMessage}`)
              .addField('Transcript Message', `${data.TranscriptMessage} **Ticket-userid**`)

            interaction.reply({ embeds: [FreeChange] })
          }
        }
      }
    })
  }

  if (changestring === 'ticketmessage') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const YouSure = new MessageEmbed()
          .setTitle('You sure?')
          .setDescription('You sure you want to change it to this?')
          .addField('Current Message', `${data.TicketMessage}`)
          .addField('New Message', `${optionalstring}`)

        const YouSureEmoji = await interaction.reply({ embeds: [YouSure], fetchReply: true })
        YouSureEmoji.react('✅')
        YouSureEmoji.react('❌')

        const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector1 = YouSureEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector2 = YouSureEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketMessage: optionalstring }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              interaction.channel.send('Updated your message')
            }
          })
        })

        Collector2.on('collect', () => {
          interaction.channel.send('Cancelled')
        })

      }
    })
  }

  if (changestring === 'closemessage') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const YouSure = new MessageEmbed()
          .setTitle('You sure?')
          .setDescription('You sure you want to change it to this?')
          .addField('Current Message', `**User** ${data.CloseMessage}`)
          .addField('New Message', `**User** ${optionalstring}`)

        const YouSureEmoji = await interaction.reply({ embeds: [YouSure], fetchReply: true })
        YouSureEmoji.react('✅')
        YouSureEmoji.react('❌')

        const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector1 = YouSureEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector2 = YouSureEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { CloseMessage: optionalstring }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              interaction.channel.send('Updated your message')
            }
          })
        })

        Collector2.on('collect', () => {
          interaction.channel.send('Cancelled')
        })

      }
    })
  }

  if (changestring === 'claimmessage') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const YouSure = new MessageEmbed()
          .setTitle('You sure?')
          .setDescription('You sure you want to change it to this?')
          .addField('Current Message', `**User** ${data.ClaimTicketMessage}`)
          .addField('New Message', `**User** ${optionalstring}`)

        const YouSureEmoji = await interaction.reply({ embeds: [YouSure], fetchReply: true })
        YouSureEmoji.react('✅')
        YouSureEmoji.react('❌')

        const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector1 = YouSureEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector2 = YouSureEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { ClaimTicketMessage: optionalstring }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              interaction.channel.send('Updated your message')
            }
          })
        })

        Collector2.on('collect', () => {
          interaction.channel.send('Cancelled')
        })

      }
    })
  }

  if (changestring === 'transcriptmessage') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const YouSure = new MessageEmbed()
          .setTitle('You sure?')
          .setDescription('You sure you want to change it to this?')
          .addField('Current Message', `${data.TranscriptMessage} **User**`)
          .addField('New Message', `${optionalstring} **User**`)

        const YouSureEmoji = await interaction.reply({ embeds: [YouSure], fetchReply: true })
        YouSureEmoji.react('✅')
        YouSureEmoji.react('❌')

        const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector1 = YouSureEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector2 = YouSureEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TranscriptMessage: optionalstring }, async (err1, data1) => {
            if (err1) throw err;
            if (data1) {
              interaction.channel.send('Updated your message')
            }
          })
        })

        Collector2.on('collect', () => {
          interaction.channel.send('Cancelled')
        })

      }
    })
  }

  if (changestring === 'openticket') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.PaidGuild === 'Yes') {

          const YouSure = new MessageEmbed()
            .setTitle('You sure?')
            .setDescription('You sure you want to change it to this?')
            .addField('Current Message', `**User** ${data.OpenTicket}`)
            .addField('New Message', `**User** ${optionalstring}`)

          const YouSureEmoji = await interaction.reply({ embeds: [YouSure], fetchReply: true })
          YouSureEmoji.react('✅')
          YouSureEmoji.react('❌')

          const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
          const Collector1 = YouSureEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
          const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
          const Collector2 = YouSureEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

          Collector1.on('collect', () => {
            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { OpenTicket: optionalstring }, async (err1, data1) => {
              if (err1) throw err;
              if (data1) {
                interaction.channel.send('Updated your message')
              }
            })
          })

          Collector2.on('collect', () => {
            interaction.channel.send('Cancelled')
          })

        } else {
          if (data.PaidGuild === 'No') {
            interaction.reply('This is not a premium guild.')
          }
        }

      }
    })
  }
}