const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const mongo = require('../../mongo2');
const mongoose = require('mongoose');
const TicketDataMain = require('../../schemas/TicketData')
const { BotVersions } = require('../../../slappey.json')


module.exports = class SetupCommand extends BaseCommand {
  constructor() {
    super('setup', 'Main', []);
  }

  async run(client, message, args, guild) {

    const Welcome = new MessageEmbed()
      .setTitle('Main Setup')
      .setDescription('Welcome to the main setup for ticket bot! Before we get everything ready for you, please read everything underneath:\n\n The bot will make 2 new roles: `ticket manager` and `ticket support`. These two roles have different job and will be told soon\n- A category will be made called `support` in that channel, there will be 3 new channels: `Ticket`, `Staff-room` and `Transcript`.\n- Bot might lag at some point when making the transcript \n- Transcript are random generated\n- Will generate a database to store all of your information into it. \nPlease react with ✅ if you are ready!')
      .setFooter('Got 2 minutes to react')
      .setColor('#f9f9fa')

    const ready = new MessageEmbed()
      .setTitle('Started!')
      .setDescription('We have started!')
      .setColor('#f9f9fa')

    const ready2 = new MessageEmbed()
      .setTitle('Started!')
      .setDescription('We have started! As you are redoing the setup, it will take a bit of time for it to complete. Please stand by while we do this.')
      .setColor('#f9f9fa')

    const Done = new MessageEmbed()
      .setTitle('Finished')
      .setDescription('The setup have been completed. Please give the roles to the staff members who needs the following role: `ticket support` to help customers. Give Higher ranks `ticket managers`. You might need to move the channels around.')
      .setColor('#f9f9fa')

    const Error = new MessageEmbed()
      .setTitle('Error')
      .setDescription('It seems like the setup has already been done. If you think this is an issue, please check your roles, channels and see if you do not have it already.\n\nIf you are redoing the setup, please react with ✅ If not then ❌')
      .setColor('#f9f9fa')

    const ServerOwner = new MessageEmbed()
      .setTitle('Error')
      .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
      .setColor('#f9f9fa')

    const CreatingDatabase = new MessageEmbed()
      .setTitle('Database')
      .setDescription('We are creating the database. Please stand by while we finish it.')
      .setColor('#f9f9fa')

    const Maincategory = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Support' && ch.type === 'GUILD_CATEGORY')

    if (message.author.id != message.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner]});

    if (message.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
      return message.channel.send({ embeds: [Error]})
        .then(m => {
          m.react('✅')
          m.react('❌')
          const ErrorFilter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
          const ErrorCollector1 = m.createReactionCollector({ filter: ErrorFilter1,  max: 1, time: 2 * 60 * 1000 });
          ErrorCollector1.on('collect', () => {
            m.delete()
            message.guild.roles.cache.find((r) => r.name === 'ticket support').delete();
            message.guild.roles.cache.find((r2) => r2.name === 'ticket manager').delete();

            const Supportcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY");
               message.guild.channels.cache.find(ch => ch.name === 'ticket').delete();
               message.guild.channels.cache.find(ch => ch.name === 'ticket-staff').delete();
               message.guild.channels.cache.find(ch => ch.name === 'transcript').delete();
               message.guild.channels.cache.find(ch => ch.name === 'ticket-logs').delete();
               TicketDataMain.findOne({ ServerID: message.guildId }, async (err04, data04 ) => {
                 if (err04) throw err04;
                 if (data04) {
                  message.guild.channels.cache.find(ch => ch.name === `Tickets: ${data04.TicketNumber}` && ch.type == "GUILD_VOICE").delete();
                 }
               })
            message.guild.roles.create({
              data: {
                name: 'ticket manager',
                color: 'BLUE',
              },
            })

            message.guild.roles.create({
              data: {
                name: 'ticket support',
                color: 'GREEN',
              },
            })

            message.guild.roles.create({
              data: {
                name: 'ticket manager',
                color: 'BLUE',
              },
            })

            message.guild.roles.create({
              data: {
                name: 'ticket support',
                color: 'GREEN',
              },
            })

            message.guild.channels.create('Support', { type: 'GUILD_CATEGORY', position: 1 }).then(async (chan) => {
            })
            message.guild.channels.create('Ticket', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
              })
            })
            message.guild.channels.create('Ticket-staff', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: true,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Transcript', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Ticket-logs', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })

            message.guild.channels.create('Tickets: 0', {type: 'voice', parent: Supportcat}).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                VIEW_CHANNEL: true
              })
            })


            setTimeout(() => {
              m.channel.send({ embeds: [Done]})
              const TranscriptChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'transcript' && ch.type == 'GUILD_TEXT');
              const TranscriptChannelMessage = new MessageEmbed()
                .setTitle('Transcript!')
                .setDescription('In this channel, this is where all of the close tickets and transcripts get logged. Only Ticket managers can talk in this channel.')
                .setColor('#f6f7f8')

              const TicketChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
              const TicketChannelMessage = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('In this channel, You can only open a ticket. If you try and run the command in any other channel, it will not work. To make a ticket, please use the command `!ticket` or `/ticket`.')
                .setColor('#f6f7f8')

              const StaffroomChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-staff' && ch.type == 'GUILD_TEXT');
              const StaffroomChannelMessage = new MessageEmbed()
                .setTitle('Staff room')
                .setDescription('In this channel, This is where the support team hang out. You can chat to the managers and the team about the tickets. Nothing in this channel should be leaked at any time. Commands can be listed here: N/A.')
                .setColor('#f6f7f8')

              const TicketLogsChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-logs' && ch.type == 'GUILD_TEXT');
              const TicketLogsChannelMessage = new MessageEmbed()
                .setTitle('Ticket logs')
                .setDescription('In this channel, this is where all of the tickets in this server will be logged. Such as: Close, add, remove, creation etc.')
                .setColor('#f6f7f8')

              TranscriptChannel.send({ embeds: [TranscriptChannelMessage]}).then((msg) => msg.pin())
              TicketChannel.send({ embeds: [TicketChannelMessage]}).then((msg) => msg.pin())
              StaffroomChannel.send({ embeds: [StaffroomChannelMessage]}).then((msg) => msg.pin())
              TicketLogsChannel.send({ embeds: [TicketLogsChannelMessage]}).then((msg) => msg.pin())
            }, 5000);
          })
        })
    }

    message.channel.send({ embeds: [Welcome]})
      .then(m => {
        m.react('✅')
        const filter24 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const collector24 = m.createReactionCollector({ filter: filter24,  max: 1, time: 2 * 60 * 1000 }); // 
        collector24.on('collect', () => {
          m.edit({ embeds: [ready]})

          if (message.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
            m.delete()
            message.channel.send({ embeds: [Error]})
          } else {
            message.guild.roles.create({
                name: 'ticket manager',
                color: 'BLUE',
            })

            message.guild.roles.create({
                name: 'ticket support',
                color: 'GREEN',
            })


            const Supportcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")

            message.guild.channels.create('Support', { type: 'GUILD_CATEGORY', position: 1 }).then(async (chan) => {
            })
            message.guild.channels.create('Ticket', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
              })
            })

            message.guild.channels.create('Tickets: 0', {type: 'GUILD_VOICE', parent: Supportcat}).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                VIEW_CHANNEL: true
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                VIEW_CHANNEL: true
              })
            })
            message.guild.channels.create('Ticket-staff', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: true,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Transcript', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Ticket-logs', { parent: Supportcat }).then(async (chan) => {
              chan.permissionOverwrites.create(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.permissionOverwrites.create(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })

            setTimeout(() => {

              const guildId = message.guildId

              m.edit({ embeds: [CreatingDatabase]})
            }, 4000);

            setTimeout(() => {
              m.edit({ embeds: [Done]})
              const TranscriptChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'transcript' && ch.type == 'GUILD_TEXT');
              const TranscriptChannelMessage = new MessageEmbed()
                .setTitle('Transcript!')
                .setDescription('In this channel, this is where all of the close tickets and transcripts get logged. Only Ticket managers can talk in this channel.')
                .setColor('#f6f7f8')

              const TicketChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
              const TicketChannelMessage = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('In this channel, You can only open a ticket. If you try and run the command in any other channel, it will not work. To make a ticket, please use the command `!ticket`.')
                .setColor('#f6f7f8')

              const StaffroomChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-staff' && ch.type == 'GUILD_TEXT');
              const StaffroomChannelMessage = new MessageEmbed()
                .setTitle('Staff room')
                .setDescription('In this channel, This is where the support team hang out. You can chat to the managers and the team about the tickets. Nothing in this channel should be leaked at any time. Commands can be listed here: N/A.')
                .setColor('#f6f7f8')

              const TicketLogsChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-logs' && ch.type == 'GUILD_TEXT');
              const TicketLogsChannelMessage = new MessageEmbed()
                .setTitle('Staff room')
                .setDescription('In this channel, this is where all of the tickets in this server will be logged. Such as: Close, add, remove, creation etc.')
                .setColor('#f6f7f8')

              TranscriptChannel.send({ embeds: [TranscriptChannelMessage]}).then((msg) => msg.pin())
              TicketChannel.send({ embeds: [TicketChannelMessage]}).then((msg) => msg.pin())
              StaffroomChannel.send({ embeds: [StaffroomChannelMessage]}).then((msg) => msg.pin())
              TicketLogsChannel.send({ embeds: [TicketLogsChannelMessage]}).then((msg) => msg.pin())

              TicketDataMain.findOne({ ServerID: message.guildId }, async (err2, data2) => {
                if (err2) throw err2;

                if (data2) {
                  console.log('N/a')
                  

            
                } else {

                  console.log('test')
                  const TicketChannelIdChannel = await message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
                  const TicketTrackerIdChannel = await message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Tickets: 0' && ch.type == 'GUILD_VOICE');
                  data2 = new TicketDataMain({
                    ServerID: message.guildId,
                    OwnerID: message.guild.ownerId,
                    TicketChannelID: 'N/A',
                    TicketNumber: "0",
                    TicketTrackerChannelID: "N/A",
                    BotPrefix: client.prefix,
                    SupportRoleID: "N/A",
                    ManagerRoleID: "N/A",
                    AdminRoleID: "N/A",
                    BetaKey: "N/A",
                    PaidGuild: "No",
                    Transcript: "Yes",
                    UseTicketReactions: "Yes",
                    UseDashboard: "Yes",
                    APIKey: "N/A",
                    TicketMessage: "Thank you for contacting Support! Please wait for a customer support to claim your ticket.",
                    CloseMessage: "has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.",
                    ClaimTicketMessage: "has open a ticket and needs support.",
                    DisabledCommands: "N/A",
                    TranscriptMessage: "Transcript for",
                    EnableTicket: 'Enabled',
                    BotVersion: BotVersions
                  })
                  data2.save()

                }
              })


            }, 5000);
          }

        })

      })
  }
}