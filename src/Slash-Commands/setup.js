const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, Channel } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const mongo = require('../mongo2');
const mongoose = require('mongoose');
const TicketDataMain = require('../schemas/TicketData')
const { BotVersions } = require('../../slappey.json')
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
  .setName('setup')
  .setDescription('setup Command')

module.exports.run = (client, interaction) => {
  const Welcome = new EmbedBuilder()
    .setTitle('Main Setup')
    .setDescription('Welcome to the main setup for ticket bot! Before we get everything ready for you, please read everything underneath:\n\n The bot will make 2 new roles: `ticket manager` and `ticket support`. These two roles have different job and will be told soon\n- A category will be made called `support` in that channel, there will be 3 new channels: `Ticket`, `Staff-room` and `Transcript`.\n- Bot might lag at some point when making the transcript \n- Transcript are random generated\n- Will generate a database to store all of your information into it. \nPlease react with ✅ if you are ready!')
    .setFooter({ text: 'Got 2 minutes to react'})
    .setColor('#f9f9fa')

  const ready = new EmbedBuilder()
    .setTitle('Started!')
    .setDescription('We have started!')
    .setColor('#f9f9fa')

  const ready2 = new EmbedBuilder()
    .setTitle('Started!')
    .setDescription('We have started! As you are redoing the setup, it will take a bit of time for it to complete. Please stand by while we do this.')
    .setColor('#f9f9fa')

  const Done = new EmbedBuilder()
    .setTitle('Finished')
    .setDescription('The setup have been completed. Please give the roles to the staff members who needs the following role: `ticket support` to help customers. Give Higher ranks `ticket managers`. You might need to move the channels around.')
    .setColor('#f9f9fa')

  const Error = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('It seems like the setup has already been done in this server. Please run the normal setup command.')
    .setColor('#f9f9fa')

  const ServerOwner = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
    .setColor('#f9f9fa')

  const CreatingDatabase = new EmbedBuilder()
    .setTitle('Database')
    .setDescription('We are creating the database. Please stand by while we finish it.')
    .setColor('#f9f9fa')

    const betatesting = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('This command is disabled during the discord.js 14 public testing.')

  //const Maincategory = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Support' && ch.type === 'GUILD_CATEGORY')

  if (interaction.user.id != '804663016124973076')
  return interaction.reply({ embeds: [betatesting]});
  // if (interaction.user.id != interaction.guild.ownerId)
  //   return interaction.reply({ embeds: [ServerOwner] });

  const WelcomeEmbed = new EmbedBuilder()
    .setTitle('Welcome')
    .setDescription('Welcome to the setup section. Please select one of the settings from the bar below.')

  const editdropdown = new ActionRowBuilder()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('edit')
        .setPlaceholder('Nothing selected')
        .addOptions([
          {
            label: 'First Guild',
            description: 'Setup this guild',
            value: 'first',
          },
        ]),
    );
  interaction.reply({ embeds: [WelcomeEmbed], components: [editdropdown], ephemeral: true });


  const MainCollector = interaction.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU"
  })
  MainCollector.on("collect", async (collected) => {
    const value = collected.values[0]

    if (value === 'first') {
      editdropdown.components[0].setDisabled(true)
      interaction.editReply({ embeds: [WelcomeEmbed], components: [editdropdown], ephemeral: true })
      if (interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
        return collected.reply({ embeds: [Error] })

      }


      collected.reply({ embeds: [ready] })

      if (interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
        m.delete()
        collected.reply({ embeds: [Error] })
      } else {
        interaction.guild.roles.create({
          name: 'ticket manager',
          color: 'BLUE',
        })

        interaction.guild.roles.create({
          name: 'ticket support',
          color: '#00FF00',
        })


        const Supportcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")

        interaction.guild.channels.create('Support', { type: 'GUILD_CATEGORY', position: 1 }).then(async (chan) => {
        })
        interaction.guild.channels.create('Ticket', { parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
          })
        })

        interaction.guild.channels.create('Tickets: 0', { type: 'GUILD_VOICE', parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            VIEW_CHANNEL: true
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            VIEW_CHANNEL: true
          })
        })
        interaction.guild.channels.create('Ticket-staff', { parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: false,
            ATTACH_FILES: true,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            ATTACH_FILES: true,
          })
        })
        interaction.guild.channels.create('Transcript', { parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: false,
            ATTACH_FILES: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            ATTACH_FILES: true,
          })
        })
        interaction.guild.channels.create('Ticket-logs', { parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: false,
            ATTACH_FILES: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            ATTACH_FILES: true,
          })
        })

        interaction.guild.channels.create('feedback', { parent: Supportcat }).then(async (chan) => {
          chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: false,
            ATTACH_FILES: true,
          })
          chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            MANAGE_CHANNELS: true,
            ATTACH_FILES: true,
          })
        })
        setTimeout(() => {

          const guildId = interaction.guild.id

          interaction.channel.send({ embeds: [CreatingDatabase] })
        }, 4000);

        setTimeout(() => {
          interaction.channel.send({ embeds: [Done] })
          const TranscriptChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'transcript' && ch.type == 'GUILD_TEXT');
          const TranscriptChannelMessage = new EmbedBuilder()
            .setTitle('Transcript!')
            .setDescription('In this channel, this is where all of the close tickets and transcripts get logged. Only Ticket managers can talk in this channel.')
            .setColor('#f6f7f8')

          const TicketChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
          const TicketChannelMessage = new EmbedBuilder()
            .setTitle('Ticket')
            .setDescription('In this channel, You can only open a ticket. If you try and run the command in any other channel, it will not work. To make a ticket, please use the command `/ticket`.')
            .setColor('#f6f7f8')

          const StaffroomChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-staff' && ch.type == 'GUILD_TEXT');
          const StaffroomChannelMessage = new EmbedBuilder()
            .setTitle('Staff room')
            .setDescription('In this channel, This is where the support team hang out. You can chat to the managers and the team about the tickets. Nothing in this channel should be leaked at any time. Commands can be listed here: N/A.')
            .setColor('#f6f7f8')

          const TicketLogsChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-logs' && ch.type == 'GUILD_TEXT');
          const TicketLogsChannelMessage = new EmbedBuilder()
            .setTitle('Staff room')
            .setDescription('In this channel, this is where all of the tickets in this server will be logged. Such as: Close, add, remove, creation etc.')
            .setColor('#f6f7f8')

          TranscriptChannel.send({ embeds: [TranscriptChannelMessage] }).then((msg) => msg.pin())
          TicketChannel.send({ embeds: [TicketChannelMessage] }).then((msg) => msg.pin())
          StaffroomChannel.send({ embeds: [StaffroomChannelMessage] }).then((msg) => msg.pin())
          TicketLogsChannel.send({ embeds: [TicketLogsChannelMessage] }).then((msg) => msg.pin())

          TicketDataMain.findOne({ ServerID: interaction.guild.id }, async (err2, data2) => {
            if (err2) throw err2;

            if (data2) {
              console.log('N/a')



            } else {

              const TicketChannelIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
              const TicketTrackerIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Tickets: 0' && ch.type == 'GUILD_VOICE');
              data2 = new TicketDataMain({
                ServerID: interaction.guild.id,
                OwnerID: interaction.guild.ownerId,
                TicketChannelID: 'N/A',
                TicketNumber: '0',
                TicketTrackerChannelID: 'N/A',
                FeedbackChannelID: 'N/A',
                BotPrefix: '!',
                SupportRoleID: 'N/A',
                ManagerRoleID: 'N/A',
                AdminRoleID: 'N/A',
                BetaKey: 'N/A',
                PaidGuild: 'No',
                Tier: 'Free',
                PremiumCode: 'N/A',
                Transcript: 'Yes',
                UseTicketReactions: 'Yes',
                UseDashboard: 'Yes',
                APIKey: 'N/A',
                TicketMessage: 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                CloseMessage: 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                ClaimTicketMessage: 'has open a ticket and needs support.',
                OpenTicket: 'I have open a ticket for you!',
                DisabledCommands: 'N/A',
                TranscriptMessage: 'Transcript for',
                EnableTicket: 'Enabled',
                ModMail: 'Disabled',
                VoiceTicket: 'Disabled',
                CustomBots: '0',
                TicketIDLength: '5',
                SecondServer: 'Disabled',
                SecondServerID: 'N/A',
                SecondServerSupportRoleID: 'N/A',
                SecondServerAdminRoleID: 'N/A',
                SecondServerManagerRoleID: 'N/A',
                SecondServerClaimChannel: 'N/A',
                SecondServerLogsChannel: 'N/A',
                SecondServerTranscriptChannel: 'N/A',
                ROBLOX: 'Disabled',
                TypeOfServer: 'First',
                Important: 'Enabled',
                WebsiteCode: "N/A",
                BotVersion: BotVersions
              })
              data2.save()

            }
          })


        }, 5000);
      }

    } else {
      if (value === 'second') {
        editdropdown.components[0].setDisabled(true)
        interaction.editReply({ embeds: [WelcomeEmbed], components: [editdropdown], ephemeral: true })
        if (interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
          return collected.reply({ embeds: [Error] })

        }


        collected.reply({ embeds: [ready] })

        if (interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
          m.delete()
          collected.reply({ embeds: [Error] })
        } else {
          interaction.guild.roles.create({
            name: 'ticket manager',
            color: 'BLUE',
          })

          interaction.guild.roles.create({
            name: 'ticket support',
            color: '#00FF00',
          })


          const Supportcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")

          interaction.guild.channels.create('Support', { type: 'GUILD_CATEGORY', position: 1 }).then(async (chan) => {
          })
          interaction.guild.channels.create('Ticket', { parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
            })
          })

          interaction.guild.channels.create('Tickets: 0', { type: 'GUILD_VOICE', parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              VIEW_CHANNEL: true
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
              VIEW_CHANNEL: true
            })
          })
          interaction.guild.channels.create('Ticket-staff', { parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              ATTACH_FILES: true,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              ATTACH_FILES: true,
            })
          })
          interaction.guild.channels.create('Transcript', { parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              ATTACH_FILES: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              ATTACH_FILES: true,
            })
          })
          interaction.guild.channels.create('Ticket-logs', { parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              ATTACH_FILES: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              ATTACH_FILES: true,
            })
          })

          interaction.guild.channels.create('feedback', { parent: Supportcat }).then(async (chan) => {
            chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: false,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: false,
              ATTACH_FILES: true,
            })
            chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_CHANNELS: true,
              ATTACH_FILES: true,
            })
          })
          setTimeout(() => {

            const guildId = interaction.guild.id

            interaction.channel.send({ embeds: [CreatingDatabase] })
          }, 4000);

          setTimeout(() => {
            interaction.channel.send({ embeds: [Done] })
            const TranscriptChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'transcript' && ch.type == 'GUILD_TEXT');
            const TranscriptChannelMessage = new EmbedBuilder()
              .setTitle('Transcript!')
              .setDescription('In this channel, this is where all of the close tickets and transcripts get logged. Only Ticket managers can talk in this channel.')
              .setColor('#f6f7f8')

            const TicketChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
            const TicketChannelMessage = new EmbedBuilder()
              .setTitle('Ticket')
              .setDescription('In this channel, You can only open a ticket. If you try and run the command in any other channel, it will not work. To make a ticket, please use the command `!ticket`, or `/ticket`.')
              .setColor('#f6f7f8')

            const StaffroomChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-staff' && ch.type == 'GUILD_TEXT');
            const StaffroomChannelMessage = new EmbedBuilder()
              .setTitle('Staff room')
              .setDescription('In this channel, This is where the support team hang out. You can chat to the managers and the team about the tickets. Nothing in this channel should be leaked at any time. Commands can be listed here: N/A.')
              .setColor('#f6f7f8')

            const TicketLogsChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-logs' && ch.type == 'GUILD_TEXT');
            const TicketLogsChannelMessage = new EmbedBuilder()
              .setTitle('Staff room')
              .setDescription('In this channel, this is where all of the tickets in this server will be logged. Such as: Close, add, remove, creation etc.')
              .setColor('#f6f7f8')

            TranscriptChannel.send({ embeds: [TranscriptChannelMessage] }).then((msg) => msg.pin())
            TicketChannel.send({ embeds: [TicketChannelMessage] }).then((msg) => msg.pin())
            StaffroomChannel.send({ embeds: [StaffroomChannelMessage] }).then((msg) => msg.pin())
            TicketLogsChannel.send({ embeds: [TicketLogsChannelMessage] }).then((msg) => msg.pin())

            TicketDataMain.findOne({ ServerID: interaction.guild.id }, async (err2, data2) => {
              if (err2) throw err2;

              if (data2) {
                console.log('N/a')



              } else {

                const TicketChannelIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'GUILD_TEXT');
                const TicketTrackerIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Tickets: 0' && ch.type == 'GUILD_VOICE');
                data2 = new TicketDataMain({
                  ServerID: interaction.guild.id,
                  OwnerID: interaction.guild.ownerId,
                  SecondServer: 'Enabled',
                  SecondServerID: 'N/A',
                  SecondServerSupportRoleID: 'N/A',
                  SecondServerAdminRoleID: 'N/A',
                  SecondServerManagerRoleID: 'N/A',
                  SecondServerClaimChannel: 'N/A',
                  SecondServerLogsChannel: 'N/A',
                  SecondServerTranscriptChannel: 'N/A',
                  ROBLOX: 'Disabled',
                  TypeOfServer: 'Second',
                  BotVersion: BotVersions
                })
                data2.save()

              }
            })


          }, 5000);
        }
      }
    }
  })
}