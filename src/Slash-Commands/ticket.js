const { SlashCommandBuilder } = require('@discordjs/builders');
const Channel = require('discord.js');
const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData')
const timestamp = require('unix-timestamp');
timestamp.round = true




var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Ticket Command')
  .addStringOption(option =>
    option.setName('reason')
      .setDescription('Add a reason to ticket')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('priority')
      .setDescription('Set what priority it should be')
      .addChoices({
        name: 'critical',
        value: 'critical'
      })
      .addChoices({
        name: 'major',
        value: 'major'
      })
      .addChoices({
        name: 'medium',
        value: 'medium'
      })
      .addChoices({
        name: 'low',
        value: 'low'
      })
      .setRequired(true));

module.exports.run = (client, interaction) => {
  const MSG = interaction.options.getString('reason')
  const PriorityList = interaction.options.getString('priority')

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


  const Xmas95 = new Date('December 31, 2022 00:00:00');
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
            function makeURL(length) {
              var result = '';
              var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
              var charactersLength = characters.length;
              for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
              }
              return result;
            }

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
                    { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true }
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

                  newguild.channels.create({ name: names }).then(async (chan) => {
                    chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been opened as from: ${currentDateAndTime} UTC.`)
                    chan.permissionOverwrites.set([
                      {
                        id: newguild.roles.everyone,
                        deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                      }
                    ])
                    const open = new EmbedBuilder()
                      .setColor('#f6f7f8')
                      .setTimestamp()
                      .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                      .setTitle(`Ticket`)
                      .addFields([
                        { name: 'Information', value: `<@${interaction.user.id}> ${data01.OpenTicket}`, inline: true },
                        { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                        { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true }
                      ])

                    await interaction.reply({ embeds: [open] });

                    const DmPerson = new EmbedBuilder()
                      .setColor('#f6f7f8')
                      .setTimestamp()
                      .setTitle('Ticket open')
                      .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                      .addFields([
                        { name: 'TicketID', value: `${generator}`, inline: true },
                        { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true }
                      ])
                      .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                    await interaction.user.send({ embeds: [DmPerson] });

                    const TicketSupportID = newguild.roles.cache.find(roles => roles.id === data01.SecondServerSupportRoleID)
                    const TicketManagerID = newguild.roles.cache.find(roles => roles.id === data01.SecondServerManagerRoleID)
                    newguild.channels.cache.get(`${data01.SecondServerClaimChannel}`).send(`${TicketSupportID}, ${TicketManagerID} \n<@${interaction.user.id}> has open a support ticket! Please run /claim ticketid:${generator} to claim the ticket!`)

                    ClaimTicket.findOne({ ServerID: interaction.guild.id }, async (err3, data3) => {
                      if (err3) throw err;
                      if (data3) {
                        if (data3.ServerID === interaction.guild.id) {
                          data3 = new ClaimTicket({
                            id: interaction.user.id,
                            TicketIDs: generator,
                            ServerID: interaction.guild.id,
                            ChannelID: chan.id,
                            Reason: MSG,
                            Locked: "No",
                            Time: timestamp.now(),
                            AddedUser: Array,
                            Type: 'Channel',
                            ClaimUserID: "",
                            ClaimTime: "00000",
                            Priority: PriorityList
                          })
                          data3.save()
                          console.log('data saved')
                        } else {
                          console.log('Not saved')
                        }
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
                        { name: 'Issue', value: `${MSG}`, inline: true },
                        { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                        { name: 'Staff', value: `${TicketSupportID} ${TicketManagerID}`, inline: true },
                        { name: 'Ticket ID', value: `${generator}`, inline: true },
                        { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true }
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
                      interaction.guild.channels.create({ name: names, parent: Ticketcat }).then(async (chan) => {
                        chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                        chan.permissionOverwrites.set([
                          {
                            id: interaction.guild.roles.everyone,
                            deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                          }
                        ])

                        chan.permissionOverwrites.set([
                          {
                            id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ManageChannels, PermissionFlagsBits.AttachFiles]
                          }
                        ])

                        const open = new EmbedBuilder()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                          .setTitle(`Ticket`)
                          .addFields([
                            { name: 'Infomation', value: `<@${interaction.user.id}> ${data01.OpenTicket}`, inline: true },
                            { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                            { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                          ])

                        await interaction.reply({ embeds: [open], ephemeral: true });

                        const DmPerson = new EmbedBuilder()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setTitle('Ticket open')
                          .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                          .addFields([
                            { name: 'TicketID', value: `${generator}`, inline: true },
                            { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                            { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                          ])
                          .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })

                        await interaction.user.send({ embeds: [DmPerson] });

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
                            { name: 'Issue', value: `${MSG}`, inline: true },
                            { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                            { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                            { name: 'Ticket  ID', value: `${generator}`, inline: true },
                            { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
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
                                Reason: MSG,
                                Locked: "No",
                                Time: timestamp.now(),
                                AddedUser: Array,
                                Type: 'Channel',
                                ClaimUserID: "",
                                ClaimTime: "00000",
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
                              Type: 'Channel',
                              ClaimUserID: "",
                              ClaimTime: "00000",
                              Priority: PriorityList
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
                                interaction.guild.channels.create({ name: names, parent: Ticketcat }).then(async (chan) => {
                                  chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                                  chan.permissionOverwrites.set([
                                    {
                                      id: interaction.guild.roles.everyone,
                                      deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                                    }
                                  ])
                                  chan.permissionOverwrites.set([
                                    {
                                      id: user,
                                      allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                    }
                                  ])

                                  chan.permissionOverwrites.set([
                                    {
                                      id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                      allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                    }
                                  ])

                                  const open = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                    .setTitle(`Ticket`)
                                    .addFields([
                                      { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                      { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                      { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                    ])



                                  await interaction.reply({ embeds: [open], ephemeral: true });

                                  const DmPerson = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle('Ticket open')
                                    .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                    .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                    .addFields([
                                      { name: 'Ticket ID', value: `${generator}`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                      { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },

                                    ])

                                  await interaction.user.send({ embeds: [DmPerson] });

                                  const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                  const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                                  const thankyou = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                    .setTitle('Ticket')
                                    .addFields([
                                      { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                      { name: 'Issue', value: `${MSG}`, inline: true },
                                      { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                      { name: 'Roblox username', value: `${RBLXusername}`, inline: true },
                                      { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                      { name: 'Ticket ID', value: `${generator}`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
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
                                          Reason: MSG,
                                          Locked: "No",
                                          Time: timestamp.now(),
                                          AddedUser: Array,
                                          Type: 'Channel',
                                          ClaimUserID: "",
                                          ClaimTime: "00000",
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
                                        Reason: MSG,
                                        Locked: "No",
                                        Time: timestamp.now(),
                                        AddedUser: Array,
                                        Type: 'Channel',
                                        ClaimUserID: "",
                                        ClaimTime: "00000",
                                        Priority: PriorityList
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
                                interaction.guild.channels.create({ name: names, parent: Ticketcat }).then(async (chan) => {
                                  chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                                  chan.permissionOverwrites.set([
                                    {
                                      id: interaction.guild.roles.everyone,
                                      deny: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel]
                                    }
                                  ])

                                  chan.permissionOverwrites.set([
                                    {
                                      id: user,
                                      allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                    }
                                  ])


                                  chan.permissionOverwrites.set([
                                    {
                                      id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                      allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                    }
                                  ])


                                  const open = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                    .setTitle(`Ticket`)
                                    .addFields([
                                      { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                      { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                      { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                    ])




                                  await interaction.reply({ embeds: [open], ephemeral: true });

                                  const DmPerson = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setTitle('Ticket open')
                                    .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                    .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                    .addFields([
                                      { name: 'TicketID', value: `${generator}`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                      { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                    ])


                                  await interaction.user.send({ embeds: [DmPerson] });

                                  const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                                  const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                                  const thankyou = new EmbedBuilder()
                                    .setColor('#f6f7f8')
                                    .setTimestamp()
                                    .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                    .setTitle('Ticket')
                                    .addFields([
                                      { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                      { name: 'Issue', value: `${MSG}`, inline: true },
                                      { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                      { name: 'Roblox username', value: `${RBLXusername}`, inline: true },
                                      { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                      { name: 'Ticket ID', value: `${generator}`, inline: true },
                                      { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
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
                                          Reason: MSG,
                                          Locked: "No",
                                          Time: timestamp.now(),
                                          AddedUser: Array,
                                          Type: 'Channel',
                                          ClaimUserID: "",
                                          ClaimTime: "00000",
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
                                        Reason: MSG,
                                        Locked: "No",
                                        Time: timestamp.now(),
                                        AddedUser: Array,
                                        Type: 'Channel',
                                        ClaimUserID: "",
                                        ClaimTime: "00000",
                                        Priority: PriorityList
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
                            interaction.guild.channels.create({ name: names, parent: Ticketcat }).then(async (chan) => {
                              chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)
                              chan.permissionOverwrites.set([
                                {
                                  id: user,
                                  allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                }
                              ])

                              chan.permissionOverwrites.set([
                                {
                                  id: interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`),
                                  allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                }
                              ])

                              const open = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                .setTitle(`Ticket`)
                                .addFields([
                                  { name: 'Information', value: `<@${interaction.user.id}> I have open a ticket for you!`, inline: true },
                                  { name: 'Channel', value: `Your ticket is <#${chan.id}>`, inline: true },
                                  { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true }
                                ])



                              await interaction.reply({ embeds: [open], ephemeral: true });

                              const DmPerson = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setTitle('Ticket open')
                                .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can found your ticket here: <#${chan.id}>`)
                                .setFooter({ text: `${interaction.guild.name}| ${interaction.guild.id}` })
                                .addFields([
                                  { name: 'Ticket ID', value: `${generator}`, inline: true },
                                  { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
                                  { name: 'Open Time', value: `<t:${timestamp.now()}:f>`, inline: true },
                                ])

                              await interaction.user.send({ embeds: [DmPerson] });

                              const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                              const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                              const thankyou = new EmbedBuilder()
                                .setColor('#f6f7f8')
                                .setTimestamp()
                                .setFooter({ text: `Ticket ID: <#${chan.id}>` })
                                .setTitle('Ticket')
                                .addFields([
                                  { name: 'Information', value: `${data01.TicketMessage}`, inline: true },
                                  { name: 'Issue', value: `${MSG}`, inline: true },
                                  { name: 'User', value: `<@${interaction.user.id}>`, inline: true },
                                  { name: 'Staff', value: `${TicketManagerID2} ${TicketSupportID2}`, inline: true },
                                  { name: 'Ticket ID', value: `${generator}`, inline: true },
                                  { name: 'Priority', value: `${PriorityList}` || `N/A`, inline: true },
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
                                      Reason: MSG,
                                      Locked: "No",
                                      Time: timestamp.now(),
                                      AddedUser: Array,
                                      Type: 'Channel',
                                      ClaimUserID: "",
                                      ClaimTime: "00000",
                                      Priority: PriorityList
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
                                    Reason: MSG,
                                    Locked: "No",
                                    Time: timestamp.now(),
                                    AddedUser: Array,
                                    Type: 'Channel',
                                    ClaimUserID: "",
                                    ClaimTime: "00000",
                                    Priority: PriorityList
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