const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { StringSelectMenuBuilder, ChannelType, ComponentType, PermissionsBitField } = require('discord.js'); const bot = require('discord.js');
const discord = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const CloseSchema = require('../schemas/TicketLogs-schema');
const mongo = require('../mongo');
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('lock Command');


module.exports.run = (client, interaction) => {
  ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.Locked === 'Yes') { // If the channel is locked, run the unlock command.
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
      if (data.Locked === 'No') { // If the channel isnt locked, run the lock command
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
    }
  })

}