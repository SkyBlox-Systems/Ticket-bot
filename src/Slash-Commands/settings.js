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
      .setRequired(true)
      .addChoice('Ticket Tracker Channel ID', 'tracker')
      .addChoice('Ticket Channel ID', 'ticketchan')
      .addChoice('Prefix', 'prefix')
      .addChoice('Support Role', 'support')
      .addChoice('Admin Role', 'admin')
      .addChoice('Manager Role', 'manager')
      .addChoice('Transcript', 'transcript')
      .addChoice('Tickets', 'tickets')
      .addChoice('View', 'view'))
  .addStringOption(NotNeeded =>
    NotNeeded.setName('optional')
      .setDescription('Only used if you are using prefix, role or channel')
      .setRequired(false));


// .addSubcommand(subcommand1 => {
//     subcommand1
//     .setName('View')
// })
module.exports.run = (client, interaction) => {

  const ServerOwner = new MessageEmbed()
    .setTitle('Error')
    .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

  const teststring = interaction.options.getString('category');
  const optionalstring = interaction.options.getString('optional');

  if (teststring === 'view') {
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const ListSettings = new MessageEmbed()
          .setTitle(`${interaction.guild.name} bot settings`)
          .setDescription('List of the bot settings for the server.')
          .addField(`ServerID`, `${data.ServerID}`, true)
          .addField(`TicketChannelID`, `${data.TicketChannelID}`, true)
          .addField(`TicketNumber`, `${data.TicketNumber}`, true)
          .addField(`TicketTrackerChannelID`, `${data.TicketTrackerChannelID}`, true)
          .addField(`Prefix`, `${data.BotPrefix}`, true)
          .addField(`Support Role`, `${data.SupportRoleID}`, true)
          .addField('Manager Role', `${data.ManagerRoleID}`, true)
          .addField(`Admin Role`, `${data.AdminRoleID}`, true)
          .addField(`Beta Key`, `${data.BetaKey}`, true)
          .addField(`Paid Guild`, `${data.PaidGuild}`, true)
          .addField(`Create Transcripts`, `${data.Transcript}`, true)
          .addField('API Key', `${data.APIKey}`, true)
          .addField(`Bot Version`, `${data.BotVersion}`, true)

          interaction.reply({ embeds: [ListSettings]})
      }
    })
  }

  if (teststring === 'tracker') {
    if (interaction.user.id != interaction.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner] });
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
      return message.channel.send({ embeds: [ServerOwner] });
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


  if (teststring === 'prefix') {
    if (interaction.user.id != interaction.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId}, { BotPrefix: optionalstring }, async (err1, data1) => {
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
      return message.channel.send({ embeds: [ServerOwner] });
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
      return message.channel.send({ embeds: [ServerOwner] });
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
      return message.channel.send({ embeds: [ServerOwner] });
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
      return message.channel.send({ embeds: [ServerOwner] });
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

  if (teststring === 'transcript') {
    if (interaction.user.id != interaction.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner] });

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





}