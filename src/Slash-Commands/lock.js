const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const bot = require('discord.js');
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
      if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
        const NoPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
            return interaction.reply({ embeds: [NoPerms] })
      }

        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
            if (err01) throw err01;
            if (data01) {

              if (data01.ModMail === 'Enabled') {
                ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err02, data02) => {
                  if (err02) throw err02;
                  if (data02) {
                    const user = data02.id
                    const ClaimUser = data02.ClaimUserID
                    if (data02.Locked === 'No') {
                      
                      interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        MANAGE_CHANNELS: false,
                      }) 
                      interaction.channel.permissionOverwrites.edit(ClaimUser, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        ATTACH_FILES: true,
                        MANAGE_CHANNELS: true,
                      }) 
        
                      const NoLocked = new MessageEmbed()
                      .setTitle('Locked')
                      .setDescription(`<@${interaction.user.id}> has locked your ticket! This ticket can not be closed unless it has been unlocked once again. Please contact an Ticket Support manager if this was a mistake.`)
        
                      interaction.user.send({ embeds: [NoLocked]})
        
                      ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: "Yes" },  async (err03, data03) => {
                        if (err03) throw err03
                        if (data03) {
                          data03.save()
                          console.log('Updated')
                        }
                      })
                    } else {
                      if (data02.Locked === 'Yes' ) {
                        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: true,
                        }) 
                        interaction.channel.permissionOverwrites.edit(ClaimUser, {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: true,
                        }) 
                        const YesLocked = new MessageEmbed()
                        .setTitle('Unlocked')
                        .setDescription(`<@${interaction.user.id}> has unlocked your ticket! You can may use this ticket as normal.`)
        
          
                        interaction.user.send({ embeds: [YesLocked]})
        
                        ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: "No" },  async (err04, data04) => {
                          if (err04) throw err04
                          if (data04) {
                            data04.save()
                            console.log('Updated')
                          }
                        })
        
                      } else {
                        interaction.reply('Error within the database')
                      }
                    }
                  } else {
                    interaction.reply('Not a vaild ticket')
                  }
                })
              } else {
                if (data01.ModMail === 'Disabled') {

                  ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err02, data02) => {
                    if (err02) throw err02;
                    if (data02) {
                      const user = data02.id
                      const ClaimUser = data02.ClaimUserID
                      if (data02.Locked === 'No') {
                        interaction.channel.permissionOverwrites.edit(user, {
                          SEND_MESSAGES: false,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: false,
                          MANAGE_CHANNELS: false,
                        })
                        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: false,
                        }) 
                        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: false,
                        }) 
                        interaction.channel.permissionOverwrites.edit(ClaimUser, {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          ATTACH_FILES: true,
                          MANAGE_CHANNELS: true,
                        }) 
          
                        const NoLocked = new MessageEmbed()
                        .setTitle('Locked')
                        .setDescription(`<@${interaction.user.id}> has locked your ticket! This ticket can not be closed unless it has been unlocked once again. Please contact an Ticket Support manager if this was a mistake.`)
          
                        interaction.reply({ embeds: [NoLocked]})
          
                        ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: "Yes" },  async (err03, data03) => {
                          if (err03) throw err03
                          if (data03) {
                            data03.save()
                            console.log('Updated')
                          }
                        })
                      } else {
                        if (data02.Locked === 'Yes' ) {
                          interaction.channel.permissionOverwrites.edit(user, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            MANAGE_CHANNELS: true,
                          })
                          interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            MANAGE_CHANNELS: true,
                          }) 
                          interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            MANAGE_CHANNELS: true,
                          }) 
                          interaction.channel.permissionOverwrites.edit(ClaimUser, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            ATTACH_FILES: true,
                            MANAGE_CHANNELS: true,
                          }) 
                          const YesLocked = new MessageEmbed()
                          .setTitle('Unlocked')
                          .setDescription(`<@${interaction.user.id}> has unlocked your ticket! You can may use this ticket as normal.`)
          
            
                          interaction.reply({ embeds: [YesLocked]})
          
                          ClaimTicket.findOneAndUpdate({ ChannelID: interaction.channel.id }, { Locked: "No" },  async (err04, data04) => {
                            if (err04) throw err04
                            if (data04) {
                              data04.save()
                              console.log('Updated')
                            }
                          })
          
                        } else {
                          interaction.reply('Error within the database')
                        }
                      }
                    } else {
                      interaction.reply('Not a vaild ticket')
                    }
                  })

                }
              }
      
            } else {
              const NoData = new MessageEmbed()
                .setTitle('Not updated')
                .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.3** and the latest update is **v2.2** Please get the owner to run ${client.prefix}update`)
      
              interaction.reply({ embeds: [NoData]})
            }
          })

    }