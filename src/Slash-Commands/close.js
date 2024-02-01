const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
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
const { mainModule } = require('process');
const { response } = require('express');
const { ButtonStyle, ChannelType } = require('discord.js');
const timestamp = require('unix-timestamp');
timestamp.round = true

module.exports.data = new SlashCommandBuilder()
  .setName('close')
  .setDescription('close Command')
  .addSubcommand(subcommand =>
    subcommand
      .setName('ticket')
      .setDescription('Close the ticket'))
  .addSubcommand(subcommand =>
    subcommand
      .setName('voice')
      .setDescription('Close voice tickets (Pro only)')
      .addStringOption(option =>
        option
          .setName('id')
          .setDescription('Enter the ticket ID')
          .setRequired(false)));



module.exports.run = (client, interaction) => {

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


  const premiumstring = interaction.options.getString('premium');
  const idstring = interaction.options.getString('id');

  if (interaction.options.getSubcommand() === 'ticket') {
    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.SupportServer === 'Yes') {
          ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err02, data02) => {
            ClaimTicket.findOneAndDelete({ ChannelID: interaction.channel.id }, async (err03, data03) => {
              if (err03) throw err;
              if (data03) {
                data03.save()
              }
            })
            const DMTicketCreatorClosed = new EmbedBuilder()
              .setTitle('Ticket')
              .setDescription('Your Support ticket has now been closed by a SkyBlox Systems LTD. If you bealive that this is a mistake, please contact support.')
            const ticketttcreator = client.users.cache.get(data02.id)
            ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

            interaction.channel.delete()
          })
        } else {
          if (data.SupportServer === 'No') {
            if (data.SecondServer === 'Enabled') {
              // ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err02, data02) => {
              //   if (err02) throw err;
              //   if (data02) {
              //     if (data02.Locked === 'Yes') {
              //       const cannotclose = new EmbedBuilder()
              //         .setTitle('Can not close')
              //         .setDescription('This ticket can not be closed because it is currently locked. Please unlock it by one of the staff members.')
              //       return interaction.reply({ embeds: [cannotclose] })
              //     } else {
              //       if (data02.Locked === 'No') {
              //         MainDatabase.findOne({ ServerID: data02.ServerID }, async (err01, data01) => {
              //           if (err01) throw err;
              //           if (data01) {
              //             MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err03, data03) => {
              //               if (err03) throw err;
              //               if (data03) {
              //                 if (data02.ClaimUserID === '') {
              //                   if (!interaction.member.roles.cache.some(r => r.id === `${data03.SupportRoleID}`)) {
              //                     const NoPerms2 = new EmbedBuilder()
              //                       .setTitle('Error')
              //                       .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

              //                     return interaction.reply({ embeds: [NoPerms2] })
              //                   }

              //                   const NoClaimer = new EmbedBuilder()
              //                     .setTitle('Error')
              //                     .setDescription('No staff member has not claimed the ticket. This ticket can not be closed')

              //                   interaction.reply({ embeds: [NoClaimer] })
              //                 } else {
              //                   if (data01.Transcript === "Yes") {
              //                     function makeURL(length) {
              //                       var result = '';
              //                       var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              //                       var charactersLength = characters.length;
              //                       for (var i = 0; i < length; i++) {
              //                         result += characters.charAt(Math.floor(Math.random() * charactersLength));
              //                       }
              //                       return result;
              //                     }
              //                     const generators = makeURL(20)


              //                     const ticketembed = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`<@${interaction.user.id}>, are you sure you want to close this ticket? **yes**. If not, it will cancel the command within 10 seconds.`)

              //                     const closed = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`You have closed the following ticket: ${interaction.channel.name}.`)


              //                     const Logs = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle('Ticket-logs')
              //                       .setDescription(`A ticket has been closed in this guild.`)
              //                       .addFields([
              //                         { name: 'Ticket ID', value: `${data2001.TicketIDs}`, inline: true },
              //                         { name: 'Opended by', value: `<@${data2001.id}>`, inline: true },
              //                         { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
              //                         { name: 'Transcript', value: `Link`, inline: true },
              //                         { name: 'Open Time', value: `<t:${data2001.Time}:f>`, inline: true },
              //                         { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
              //                         { name: 'Claim Time', value: `<t:${data2001.ClaimTime}:f>`, inline: true },
              //                         { name: 'Claimed By', value: `<@${data2001.ClaimUserID}>`, inline: true },
              //                         { name: 'Priority', value: `${data2001.Priority}`, inline: true }
              //                       ])

              //                     const notclosed = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`Close cancelled.`)

              //                     const closing = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`Your ticket will be closed in 5 seconds`)
              //                       .setFooter({ text: `Making a transcript....` })



              //                     const ticketembed2 = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`<@${interaction.user.id}>, are you sure you want to close this ticket? **yes**. If not, it will automatticaly close within 10 seconds.`)

              //                     const closed2 = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`You have closed the following ticket: ${interaction.channel.name}.`)

              //                     const Logs2 = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle('Ticket-logs')
              //                       .setDescription(`<@${interaction.user.id}> has close the following ticket: ${interaction.channel.name} successfully.`)

              //                     const notclosed2 = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`Close cancelled.`)

              //                     const closing2 = new EmbedBuilder()
              //                       .setColor('#f6f7f8')
              //                       .setTimestamp()
              //                       .setTitle(`Ticket`)
              //                       .setDescription(`Your ticket will be closed in 5 seconds`)


              //                     if (!interaction.member.roles.cache.some(r => r.id === `${data01.SupportRoleID}`)) {
              //                       const NoPerms3 = new EmbedBuilder()
              //                         .setTitle('Error')
              //                         .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

              //                       return interaction.reply({ embeds: [NoPerms3] })
              //                     }

              //                     if (data01.ModMail === 'Enabled') {

              //                       if (!interaction.channel.name.startsWith("ticket-")) return interaction.channel.send("This is not a valid ticket")
              //                       if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send("You need MANAGE_CHANNELS permission to use this command")
              //                       interaction.reply({ embeds: [ticketembed] })
              //                         .then((m) => {
              //                           interaction.channel.awaitMessages({
              //                             filter: response => response.content == "yes",
              //                             max: 1,
              //                             time: 10000,
              //                             errors: ['time']
              //                           }).then(() => {
              //                             interaction.channel.send({ embeds: [closing] })

              //                             setTimeout(() => {
              //                               ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
              //                                 if (err) throw err;
              //                                 if (data) {

              //                                   const DMTicketCreatorClosed = new EmbedBuilder()
              //                                     .setColor('#f5f5f5')
              //                                     .setTimestamp()
              //                                     .setTitle(`Ticket`)
              //                                     .setDescription(`<@${data.ClaimUserID}> ${data01.CloseMessage}. Please rate the support below`)
              //                                     .addFields([
              //                                       { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
              //                                       { name: 'Opened By', value: `<@${data.id}>`, inline: true },
              //                                       { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
              //                                       { name: 'Transcript', value: 'Soon', inline: true },
              //                                       { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
              //                                       { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
              //                                       { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
              //                                       { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
              //                                       { name: 'Priority', value: `${data.Priority}`, inline: true }
              //                                     ])

              //                                   const DMTicketClaimClosed = new EmbedBuilder()
              //                                     .setColor('#f5f5f5')
              //                                     .setTimestamp()
              //                                     .setTitle(`Ticket`)
              //                                     .setDescription(`You have closed the following ticket-${data.ChannelID} for the following user <@${data.id}>.`)


              //                                   const ticketttcreator = client.users.cache.get(data.id)
              //                                   ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

              //                                   const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
              //                                   ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
              //                                   setTimeout(() => {
              //                                     ClaimTicket.findOneAndDelete({ ChannelID: data.ChannelID }, async (err02, data02) => {
              //                                       if (err02) throw err02;
              //                                       if (data02) {
              //                                         console.log(`${data.id} ticket has been removed from the database`)
              //                                       }
              //                                     })
              //                                   }, 5000);


              //                                 }

              //                                 MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err30, data30) => {
              //                                   if (err30) throw err30;
              //                                   if (data30) {
              //                                     const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
              //                                     MainTicketTrackerChannel.setName(`Tickets: ${data30.TicketNumber - 1}`)
              //                                   }
              //                                 })
              //                                 interaction.channel.delete()

              //                                 const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
              //                                 const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)

              //                                 const UserName = client.users.cache.find(user => user.id === data.id)
              //                                 console.log(UserName)

              //                                 SupportLogs.send({ embeds: [Logs] })

              //                                 const CloseEmbed = new EmbedBuilder()
              //                                   .setTitle('Transcript')
              //                                   .setDescription(`Transcript for the user ${data.id}`)
              //                                 TranscriptLogs.send({ embeds: [CloseEmbed] })


              //                                 const channelsss = interaction.channel;
              //                                 const attachment = await discordTranscripts.createTranscript(channelsss, {
              //                                   limit: -1, // Max amount of messages to fetch.
              //                                   returnBuffer: false, // Return a buffer instead of a MessageAttachment 
              //                                   fileName: `${generators}.html` // Only valid with returnBuffer false. Name of attachment. 
              //                                 });

              //                                 TranscriptLogs.send({ files: [attachment] })


              //                               })

              //                             }, 5000);
              //                           }).catch(() => {
              //                             m.edit({ embeds: [notclosed] })
              //                           })
              //                         }).catch(() => {
              //                           m.edit({ embeds: [notclosed] })
              //                         })

              //                     } else {
              //                       if (data01.ModMail === 'Disabled') {

              //                         if (!interaction.channel.name.startsWith("ticket-")) return interaction.channel.send("This is not a valid ticket")
              //                         if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.channel.send("You need MANAGE_CHANNELS permission to use this command")
              //                         interaction.reply({ embeds: [ticketembed] })
              //                           .then((m) => {
              //                             interaction.channel.awaitMessages({
              //                               filter: response => response.content == "yes",
              //                               max: 1,
              //                               time: 10000,
              //                               errors: ['time']
              //                             }).then(() => {
              //                               interaction.channel.send({ embeds: [closing] })

              //                               setTimeout(() => {
              //                                 ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
              //                                   if (err) throw err;
              //                                   if (data) {

              //                                     const DMTicketCreatorClosed = new EmbedBuilder()
              //                                       .setColor('#f5f5f5')
              //                                       .setTimestamp()
              //                                       .setTitle(`Ticket`)
              //                                       .setDescription(`<@${data.ClaimUserID}> ${data01.CloseMessage}. Please rate the support below`)
              //                                       .addFields([
              //                                         { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
              //                                         { name: 'Opened By', value: `<@${data.id}>`, inline: true },
              //                                         { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
              //                                         { name: 'Transcript', value: 'Soon', inline: true },
              //                                         { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
              //                                         { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
              //                                         { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
              //                                         { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
              //                                         { name: 'Priority', value: `${data.Priority}`, inline: true }
              //                                       ])


              //                                     const DMTicketClaimClosed = new EmbedBuilder()
              //                                       .setColor('#f5f5f5')
              //                                       .setTimestamp()
              //                                       .setTitle(`Ticket`)
              //                                       .setDescription(`You have closed the following ticket-${data.ChannelID} for the following user <@${data.id}>.`)


              //                                     const ticketttcreator = client.users.cache.get(data.id)
              //                                     ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

              //                                     const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
              //                                     ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
              //                                     setTimeout(() => {
              //                                       ClaimTicket.findOneAndDelete({ ChannelID: data.ChannelID }, async (err02, data02) => {
              //                                         if (err02) throw err02;
              //                                         if (data02) {
              //                                           console.log(`${data.id} ticket has been removed from the database`)
              //                                         }
              //                                       })
              //                                     }, 5000);


              //                                   }

              //                                   MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err30, data30) => {
              //                                     if (err30) throw err30;
              //                                     if (data30) {
              //                                       const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
              //                                       MainTicketTrackerChannel.setName(`Tickets: ${data30.TicketNumber - 1}`)
              //                                     }
              //                                   })
              //                                   interaction.channel.delete()

              //                                   const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
              //                                   const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)

              //                                   const UserName = client.users.cache.find(user => user.id === data.id)
              //                                   console.log(UserName)

              //                                   SupportLogs.send({ embeds: [Logs] })

              //                                   const CloseEmbed = new EmbedBuilder()
              //                                     .setTitle('Transcript')
              //                                     .setDescription(`Transcript for the user ${data.id}`)
              //                                   TranscriptLogs.send({ embeds: [CloseEmbed] })


              //                                   const discordTranscripts = require('discord-html-transcripts');

              //                                   const channelsss = interaction.channel;
              //                                   const attachment = await discordTranscripts.createTranscript(channelsss, {
              //                                     limit: -1, // Max amount of messages to fetch.
              //                                     returnBuffer: false, // Return a buffer instead of a MessageAttachment 
              //                                     fileName: `${generators}.html` // Only valid with returnBuffer false. Name of attachment. 
              //                                   });

              //                                   TranscriptLogs.send({ files: [attachment] })
              //                                 })

              //                               }, 5000);
              //                             }).catch(() => {
              //                               m.edit({ embeds: [notclosed] })
              //                             })
              //                           }).catch(() => {
              //                             m.edit({ embeds: [notclosed] })
              //                           })

              //                       }
              //                     }





              //                   } else {
              //                     if (!message.member.roles.cache.some(r => r.id === `${data01.SupportRoleID}`)) {
              //                       const NoPerms = new EmbedBuilder()
              //                         .setTitle('Error')
              //                         .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

              //                       return interaction.reply({ embeds: [NoPerms] })
              //                     }


              //                     if (!interaction.channel.name.startsWith("ticket-")) return interaction.reply("This is not a valid ticket")
              //                     if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply("You need MANAGE_CHANNELS permission to use this command")
              //                     interaction.reply({ embeds: [ticketembed2] }).then((m) => {
              //                       interaction.channel.awaitMessages({
              //                         filter: response => response.content == "yes",
              //                         max: 1,
              //                         time: 10000,
              //                         errors: ['time']
              //                       }).then(() => {
              //                         interaction.channel.send(closing2)
              //                         Transcriptmain();
              //                         setTimeout(() => {
              //                           ClaimTicket.findOne({ ChannelID: interaction.channel.id }, async (err, data) => {
              //                             if (err) throw err;
              //                             if (data) {

              //                               const DMTicketCreatorClosed = new EmbedBuilder()
              //                                 .setColor('#f5f5f5')
              //                                 .setTimestamp()
              //                                 .setTitle(`Ticket`)
              //                                 .setDescription(`<@${data.ClaimUserID}> has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you. Please rate the support below`)
              //                                 .addFields([
              //                                   { name: 'Ticket ID', value: `${data.TicketIDs}`, inline: true },
              //                                   { name: 'Opened By', value: `<@${data.id}>`, inline: true },
              //                                   { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
              //                                   { name: 'Transcript', value: 'Soon', inline: true },
              //                                   { name: 'Open Time', value: `<t:${data.Time}:f>`, inline: true },
              //                                   { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
              //                                   { name: 'Claim Time', value: `<t:${data.ClaimTime}:f>.`, inline: true },
              //                                   { name: 'Claimed By', value: `<@${data.ClaimUserID}>`, inline: true },
              //                                   { name: 'Priority', value: `${data.Priority}`, inline: true }
              //                                 ])

              //                               const DMTicketClaimClosed = new EmbedBuilder()
              //                                 .setColor('#f5f5f5')
              //                                 .setTimestamp()
              //                                 .setTitle(`Ticket`)
              //                                 .setDescription(`You have closed the following ticket ${data.ChannelID} for the following user <@${data.id}>.`)


              //                               const ticketttcreator = client.users.cache.get(data.id)
              //                               ticketttcreator.send({ embeds: [DMTicketCreatorClosed] })

              //                               const ticketttClaimer = client.users.cache.get(`${data.ClaimUserID}`)
              //                               ticketttClaimer.send({ embeds: [DMTicketClaimClosed] })
              //                               setTimeout(() => {
              //                                 ClaimTicket.findOneAndDelete({ ChannelID: interaction.channel.id }, async (err02, data02) => {
              //                                   if (err02) throw err02;
              //                                   if (data02) {
              //                                     console.log(`${data.id} ticket has been removed from the database`)
              //                                   }
              //                                 })
              //                               }, 5000);


              //                             }

              //                             MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err300, data300) => {
              //                               if (err300) throw err300;
              //                               if (data300) {
              //                                 const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data01.TicketTrackerChannelID}`)
              //                                 MainTicketTrackerChannel.setName(`Tickets: ${data300.TicketNumber - 1}`)
              //                               }
              //                             })
              //                             interaction.channel.delete()

              //                             const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == "text")
              //                             const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")

              //                             const UserName = client.users.cache.find(user => user.id === data.id)
              //                             console.log(UserName)

              //                             SupportLogs.send({ embeds: [Logs2] })


              //                           })

              //                         }, 5000);
              //                       }).catch(() => {
              //                         interaction.channel.send({ embeds: [notclosed2] })
              //                       })
              //                     }).catch(() => {
              //                       interaction.channel.send({ embeds: [notclosed2] })
              //                     })
              //                   }
              //                 }
              //               }
              //             })
              //           }
              //         })
              //       }
              //     }
              //   }
              // })
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
                                console.log('get data')


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
                                    .setDescription(`A ticket has been closed in this guild.`)
                                    .addFields([
                                      { name: 'Ticket ID', value: `${data2001.TicketIDs}`, inline: true },
                                      { name: 'Opended by', value: `<@${data2001.id}>`, inline: true },
                                      { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
                                      { name: 'Transcript', value: `Link`, inline: true },
                                      { name: 'Open Time', value: `<t:${data2001.Time}:f>`, inline: true },
                                      { name: 'Close Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                      { name: 'Claim Time', value: `<t:${data2001.ClaimTime}:f>`, inline: true },
                                      { name: 'Claimed By', value: `<@${data2001.ClaimUserID}>`, inline: true },
                                      { name: 'Priority', value: `${data2001.Priority}`, inline: true }
                                    ])

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
        }

      }
    })

  }

  if (interaction.options.getSubcommand() === 'voice') {
    ClaimTicket.findOne({ TicketIDs: idstring }, async (err, data) => {
      if (err) throw err;
      if (data) {
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err1, data1) => {
          if (err1) throw err;
          if (data1) {
            if (data1.PaidGuild === 'Yes') {
              if (data1.VoiceTicket === 'Enabled') {
                if (data.ClaimUserID === '') {

                } else {

                  if (!interaction.member.roles.cache.some(r => r.id === `${data1.SupportRoleID}`)) {
                    const NoPerms2 = new EmbedBuilder()
                      .setTitle('Error')
                      .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                    return interaction.reply({ embeds: [NoPerms2] })
                  }

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
                    .setDescription(`A ticket has been  closed in this guild.`)
                    .addFields([
                      { name: 'Ticket ID', value: `${data2001.TicketIDs}`, inline: true },
                      { name: 'Opended by', value: `<@${data2001.id}>`, inline: true },
                      { name: 'Closed By', value: `<@${interaction.user.id}>`, inline: true },
                      { name: 'Transcript', value: `Link`, inline: true },
                      { name: 'Open Time', value: `<t:${data2001.Time}:f>`, inline: true },
                      { name: 'Close Time', value: `<<t:${timestamp.now()}:f>`, inline: true },
                      { name: 'Claim Time', value: `<t:${data2001.ClaimTime}:f>`, inline: true },
                      { name: 'Claimed By', value: `<@${data2001.ClaimUserID}>`, inline: true },
                      { name: 'Priority', value: `${data2001.Priority}`, inline: true }
                    ])

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
                    .setFooter(`Making a transcript....`)

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
                          ClaimTicket.findOne({ ChannelID: data.ChannelID }, async (err3, data3) => {
                            if (err3) throw err;
                            if (data3) {

                              const DMTicketCreatorClosed = new EmbedBuilder()
                                .setColor('#f5f5f5')
                                .setTimestamp()
                                .setTitle(`Ticket`)
                                .setDescription(`<@${data3.ClaimUserID}> ${data1.CloseMessage}. Please rate the support below`)
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
                                .setDescription(`You have closed the following ticket-${data3.ChannelID} for the following user <@${data3.id}>.`)


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
                                const MainTicketTrackerChannel = interaction.guild.channels.cache.get(`${data1.TicketTrackerChannelID}`)
                                MainTicketTrackerChannel.setName(`Tickets: ${data30.TicketNumber - 1}`)
                              }
                            })

                            const voicecallchan = interaction.guild.channels.cache.get(data3.ChannelID)
                            voicecallchan.delete()

                            const SupportLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == ChannelType.GuildText)
                            const TranscriptLogs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)

                            const UserName = client.users.cache.find(user => user.id === data.id)
                            console.log(UserName)

                            SupportLogs.send({ embeds: [Logs] })

                            const CloseEmbed = new EmbedBuilder()
                              .setTitle('Transcript')
                              .setDescription(`Transcript for the user ${data.id}`)


                            TranscriptLogs.send({ embeds: [CloseEmbed] })


                          })

                        }, 5000);
                      }).catch(() => {
                        interaction.channel.send({ embeds: [notclosed] })
                      })
                    }).catch(() => {
                      interaction.channel.send({ embeds: [notclosed] })
                    })

                }

              } else {
                if (data1.VoiceTicket === 'Disabled') {

                }
              }

            } else {
              if (data1.PaidGuild === 'No') {

              }
            }
            // interaction.reply('Voice ticket has not been calimed by anyone. This ticket can not be closed.')

          }
        })

      }
    })
  }



}