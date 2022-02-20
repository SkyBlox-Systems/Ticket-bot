const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const bot = require('discord.js');
const discord = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const CloseSchema = require('../../schemas/TicketLogs-schema');
const mongo = require('../../mongo');
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData');


module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'Main', []);
  }

  async run(client, message, args) {
    MainDatabase.findOne({ ServerID: message.guildId }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {

        ClaimTicket.findOne({ ChannelID: message.channel.id }, async (err02, data02) => {
          if (err02) throw err02;
          if (data02) {
            const user = data02.id
            const ClaimUser = data02.ClaimUserID
            if (data02.Locked === 'No') {
              message.channel.updateOverwrite(user, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                ATTACH_FILES: false,
                MANAGE_CHANNELS: false,
              })
              message.channel.updateOverwrite(message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                ATTACH_FILES: true,
                MANAGE_CHANNELS: false,
              }) 
              message.channel.updateOverwrite(message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                ATTACH_FILES: true,
                MANAGE_CHANNELS: false,
              }) 
              message.channel.updateOverwrite(ClaimUser, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                ATTACH_FILES: true,
                MANAGE_CHANNELS: true,
              }) 

              const NoLocked = new MessageEmbed()
              .setTitle('Locked')
              .setDescription(`<@${message.author.id}> has locked your ticket! This ticket can not be closed unless it has been unlocked once again. Please contact an Ticket Support manager if this was a mistake.`)

              message.channel.send({ embeds: [NoLocked]})

              ClaimTicket.findOneAndUpdate({ ChannelID: message.channel.id }, { Locked: "Yes" },  async (err03, data03) => {
                if (err03) throw err03
                if (data03) {
                  data03.save()
                  console.log('Updated')
                }
              })
            } else {
              if (data02.Locked === 'Yes' ) {
                message.channel.updateOverwrite(user, {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  ATTACH_FILES: true,
                  MANAGE_CHANNELS: true,
                })
                message.channel.updateOverwrite(message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  ATTACH_FILES: true,
                  MANAGE_CHANNELS: true,
                }) 
                message.channel.updateOverwrite(message.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  ATTACH_FILES: true,
                  MANAGE_CHANNELS: true,
                }) 
                message.channel.updateOverwrite(ClaimUser, {
                  SEND_MESSAGES: true,
                  VIEW_CHANNEL: true,
                  ATTACH_FILES: true,
                  MANAGE_CHANNELS: true,
                }) 
                const YesLocked = new MessageEmbed()
                .setTitle('Unlocked')
                .setDescription(`<@${message.author.id}> has unlocked your ticket! You can may use this ticket as normal.`)

  
                message.channel.send({ embeds: [YesLocked]})

                ClaimTicket.findOneAndUpdate({ ChannelID: message.channel.id }, { Locked: "No" },  async (err04, data04) => {
                  if (err04) throw err04
                  if (data04) {
                    data04.save()
                    console.log('Updated')
                  }
                })

              } else {
                message.channel.send('Error within the database')
              }
            }
          } else {
            message.channel.send('Not a vaild ticket')
          }
        })
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.3** and the latest update is **v2.2** Please get the owner to run ${client.prefix}update`)

        message.channel.send({ embeds: [NoData]})
      }
    })
  }
}