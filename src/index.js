
const { Client, Intents, Interaction } = require('discord.js');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ['CHANNEL'] });
const DataBaseMongo = require('./mongo');
require('./slash-register')();
let commands = require('./slash-register').commands;
console.log(commands);
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageCollector, Collector } = require('discord.js');


const db = require('./schemas/commands')
const MainDatabase = require('./schemas/TicketData')
const blacklist = require('./schemas/Blacklist-schema');
const ClaimTicket = require('./schemas/ticketclaim');






(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  DataBaseMongo.init();
  require('./dashboard/server')
})();



client.on('ready', () => {
  let commands = client.application.commands;
})




client.on('guildCreate', guild => {
  const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES))


  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding Ticket bot to your server. To setup the ticket system, please run `!setup` in any of your channels. The bot is on shard #0. Any issues with setting up the bot, please head to our support page: https://ticketbots.tk/discord or https://docs.ticketbots.tk')
    .setImage('https://cdn.discordapp.com/attachments/787688783743025152/799263407190310932/Untitled.jpg')
    .setColor('#f6f7f8')


  defaultChannel.send({ embeds: [welcome] })

})



client.on('guildDelete', guild => {
  MainDatabase.findOneAndDelete({ ServerID: guild.id }, async (err01, data01) => {
    if (err01) throw err01;
    if (data01) {
      console.log(`Removed ${guild.id} from the database.`)
    }
  })
})

client.on('interactionCreate', interaction => {
  if (!interaction.isCommand) return;
  let name = interaction.commandName;
  let options = interaction.options;

  let commandMethod = commands.get(name);
  if (commandMethod) {

    blacklist.findOne({ UserID: interaction.user.id }, async (err, data) => {
      const check = await db.findOne({ Guild: interaction.guildId })
      const versionCheck = await MainDatabase.findOne({ ServerID: interaction.guildId })
      if (err) throw err;
      if (!data) {
        if (name === 'setup') {
          commandMethod(client, interaction)
        } else {
          if (name === 'upgrade') {
            commandMethod(client, interaction)
          } else {
            if (versionCheck === null) {
              const notdata = new MessageEmbed()
                .setTitle('No data')
                .setDescription('It seems like there is no server settings stored within the database. Please run `/setup`.')

              interaction.reply({ embeds: [notdata] })

            } else {
              if (versionCheck.BotVersion !== config.BotVersions) {
                const UpdateBot = new MessageEmbed()
                  .setTitle('Update bot')
                  .setDescription(`You are currently running v${versionCheck.BotVersion} of the bot. Please update it to v${config.BotVersions}. Run the command /upgrade to update the bot.`)
                await interaction.reply({ embeds: [UpdateBot] })
              } else {
                if (check) {
                  const DisabledCommand = new MessageEmbed()
                    .setTitle('Disabled')
                    .setDescription(`The following command **/${interaction.commandName}** has been disabled in the server by an administrator`)
                    .setColor('#f6f7f8')
                  if (check.Cmds.includes(interaction.commandName)) return interaction.reply({ embeds: [DisabledCommand] })
                  commandMethod(client, interaction)
                } else {
                  commandMethod(client, interaction)
                }
              }
            }
          }
        }
      } else {
        const BlacklistedFromBot = new MessageEmbed()
          .setTitle('Blacklisted!')
          .setDescription('You have been blacklisted from using Ticket Bot!')
          .addField('Reason', `${data.Reason}`)
          .addField('Time', `${data.Time} UTC`)
          .addField('Admin', `${data.Admin}`)
        interaction.reply({ embeds: [BlacklistedFromBot] })
      }
    })
  }

  if (!commandMethod) return;
})

client.on('interactionCreate', interaction => {
  const TicketChannelIdChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'feedback' && ch.type == 'GUILD_TEXT');

  if (!interaction.isModalSubmit()) return;
  const usertitle = interaction.fields.getTextInputValue("userFeedbackID")
  const userfeedback = interaction.fields.getTextInputValue("userMessage")

  const userEmbed = new MessageEmbed()
    .setTitle('New feedback!')
    .setDescription(`${interaction.user.id} has sent a user feedback message. Below is the message`)
    .addField('User', `${usertitle}`)
    .addField('Message', `${userfeedback}`)

  TicketChannelIdChannel.send({ embeds: [userEmbed] })
  interaction.reply('Feedback sent!')
});


client.on("messageCreate", msg => {
  if (msg.partial) {
    // Never triggers
    console.log(`Received partial message- ${msg.id}`);
    return;
  }

  // console.log(msg.content);
  // console.log(msg.author.id);

  ClaimTicket.findOne({ TicketIDs: msg.content }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.id === msg.author.id) {
        if (data.Locked === 'Yes') {
          msg.reply('Your ticket is locked at the moment.')
        } else {
          if (data.Locked === 'No') {
            if (data.ClaimUserID === '') {
              msg.reply('Your ticket has not been claimed by anyone.')
            } else {
              msg.reply('Please type out on what you want to send')

              const Filter40 = (m31) => m31.author.id == msg.author.id
              const Collector40 = new MessageCollector(msg.channel, { filter: Filter40, max: 1 });

              Collector40.on('collect', m32 => {
                msg.channel.send('Message sent!')
              })

              Collector40.on('end', m33 => {
                const senddmmessage = new MessageEmbed()
                  .setTitle(`New reply from ${msg.author.tag}`)
                  .setDescription('Please use the command `/ticketreply` to reply to this message.')
                  .addField('Ticket reply:', `${m33.first().content}`, true)
                  .setTimestamp()
                  .setFooter({ text: `user id: ${msg.author.id}` });

                client.channels.cache.get(data.ChannelID).send({ embeds: [senddmmessage] })
              })

            }

          }
        }

      } else {
        if (data.AddedUser === msg.author.id) {
          //   msg.reply('Please type out on what you want to send')

          // const Filter40 = (m31) => m31.author.id == msg.author.id
          // const Collector40 = new MessageCollector(msg.channel, { filter: Filter40, max: 1 });

          // Collector40.on('collect', m32 => {
          //   msg.channel.send('Message sent!')
          // })

          // Collector40.on('end', m33 => {
          //   const senddmmessage = new MessageEmbed()
          //   .setTitle(`New reply from ${msg.author.id}`)
          //   .addField('Ticket reply:', `${m33.first().content}`, true)

          //   client.channels.cache.get(data.ChannelID).send({ embeds: [senddmmessage]})
          // })
        } else {
          msg.reply('You are not added to this ticket or not the owner of this ticket.')
        }
      }
    }
  })

});

// Ticket Buttons 
client.on('interactionCreate', interaction => {
  if (!interaction.isButton()) return
  if (interaction.customId === 'close') {
  }
});

// Ticket Reactions
client.on('interactionCreate', interaction => {
  if (!interaction.isButton()) return
  if (interaction.customId === 'create') {
    // const ButtonList = new MessageActionRow()
    // .addComponents(
    //   new MessageButton()
    //     .setCustomId('close')
    //     .setLabel('Close')
    //     .setStyle('SUCCESS'),
    //   new MessageButton()
    //     .setCustomId("lock")
    //     .setLabel("Lock")
    //     .setStyle("DANGER"),
    //   new MessageButton()
    //     .setCustomId("unlock")
    //     .setLabel("Unlock")
    //     .setStyle("PRIMARY"),
    // );

    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        if (data01.TicketTrackerChannelID === 'N/A') {
          const ErrorDataBase = new MessageEmbed()
            .setTitle('Error')
            .setDescription(`The Ticket Tracker is not set up in settings. Please edit it by using the command ${client.prefix}settings`)
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
            const name = "ticket-" + generator2;
            ClaimTicket.findOne({ id: user, ServerID: interaction.guildId }, async (err45, data45) => {
              if (err45) throw err;
              if (data45) {
                const embed = new MessageEmbed()
                  .setTitle(`Ticket`)
                  .addField('Information', `You have already opened a ticket. Please close your current ticket.`, true)
                  .addField('Channel', `<#${data45.ChannelID}>`, true)
                  .addField('Reason', `${data45.Reason}.`, true)
                  .addField('Ticket ID', `${data45.TicketIDs}`, true)
                  .addField('Priority', `N/A`, true)
                await interaction.reply({ embeds: [embed] })
              } else {
                const Ticketcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")

                if (data01.SecondServer === 'Enabled') {
                  interaction.reply('Second guild is currently disabled due to issues')
                } else {
                  if (data01.SecondServer === 'Disabled') {
                    if (data01.ModMail === 'Enabled') {
                      if (data01.SecondServer === 'Enabled') {
                        // return nothing
                      }
                      interaction.guild.channels.create(name, { parent: Ticketcat }).then(async (chan) => {
                        chan.setTopic(`Your ticket ID is: ${interaction.user.id}. Your ticket has been open as from: ${currentDateAndTime} UTC.`)

                        chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
                          SEND_MESSAGES: false,
                          VIEW_CHANNEL: false
                        })
                        chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`), {
                          SEND_MESSAGES: true,
                          VIEW_CHANNEL: true,
                          MANAGE_CHANNELS: true,
                          ATTACH_FILES: true,
                        })

                        const open = new MessageEmbed()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setFooter(`Ticket ID: <#${chan.id}>`)
                          .setTitle(`Ticket`)
                          .addField('Information', `<@${interaction.user.id}> ${data01.OpenTicket}`, true)
                          .addField('Channel', `Your ticket is <#${chan.id}>`, true)
                          .addField('Priority', `N/A`, true)
                          await interaction.reply({ embeds: [open] });

                        const DmPerson = new MessageEmbed()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setTitle('Ticket open')
                          .setDescription(`You have open a ticket in the server ${interaction.guild.name}. You can send a message to your ticket by replying to our DMs with your ticketID: ${generator}`)
                          .addField('TicketID', `${generator}`, true)
                          .setFooter(`${interaction.guild.name}| ${interaction.guild.id}`)
                          .addField('Priority', `N/A`, true)
                          await interaction.user.send({ embeds: [DmPerson] });

                        const TicketSupportID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                        const TicketManagerID2 = interaction.guild.roles.cache.find(roles => roles.id === `${data01.ManagerRoleID}`)

                        const thankyou = new MessageEmbed()
                          .setColor('#f6f7f8')
                          .setTimestamp()
                          .setFooter(`Ticket ID: <#${chan.id}>`)
                          .setTitle('Ticket')
                          .setDescription('To reply to this user ticket, please use the following command `/ticketreply message:` ')
                          .addField('Information', `${data01.TicketMessage}`, true)
                          .addField('Issue', `Ticket Reactions.`, true)
                          .addField('User', `<@${interaction.user.id}>`, true)
                          .addField('Staff', `${TicketManagerID2} ${TicketSupportID2}`, true)
                          .addField('Ticket Id', `${generator}`, true)
                          .addField('Priority', `N/A`, true)
                          await chan.send({ embeds: [thankyou], components: [ButtonList] }).then((m) => {
                          m.pin()
                        })
                        ClaimTicket.findOne({ id: interaction.user.id, ServerID: interaction.guildId }, async (err, data) => {
                          if (err) throw err;
                          if (data) {
                            if (data.ServerID !== interaction.guildId) {
                              data = new ClaimTicket({
                                id: interaction.user.id,
                                TicketIDs: generator,
                                ServerID: interaction.guildId,
                                ChannelID: chan.id,
                                Reason: 'Ticket Reactions.',
                                Locked: "No",
                                Time: currentDateAndTime,
                                AddedUser: Array,
                                Type: 'Channel',
                                ClaimUserID: "",
                                Priority: 'N/A'
                              })
                              data.save()
                                .catch(err => console.log(err))
                              const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                              const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                              TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage} Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket!`)
                            } else {
                              const DatabaseTicketMessage = new MessageEmbed()
                                .setTitle('Ticket error')
                                .setDescription('There has been a error with the database. This error is happening because your ticket got removed manually. The current info we got is provided below. If you want to remove the info, please react with a ✅')
                                .addField('Ticket ID', `${data01.TicketIDs}`, true)
                                .addField('reason', `${data01.Reason}.`, true);

                              interaction.channel.send({ embeds: [DatabaseTicketMessage] }).then(m2 => {
                                m2.react('✅')

                                const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                const collector25 = m2.createReactionCollector({ filter: filter25, max: 1, time: 30000 }); // 5 min

                                collector25.on('collect', () => {
                                  m2.delete()
                                  ClaimTicket.findOneAndDelete({ id: data.id }, { ServerID: data01.ServerID }, async (err3, data3) => {
                                    if (err3) throw err;
                                    console.log(data3)
                                    const deletedd = new MessageEmbed()
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
                              ServerID: interaction.guildId,
                              ChannelID: chan.id,
                              Reason: 'Ticket Reactions',
                              Locked: "No",
                              Time: currentDateAndTime,
                              AddedUser: Array,
                              Type: 'Channel',
                              ClaimUserID: "",
                              Priority: 'N/A'
                            })
                            data.save()
                              .catch(err => console.log(err))
                            const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == "GUILD_TEXT")
                            const TicketSupportID = interaction.guild.roles.cache.find(roles => roles.id === `${data01.SupportRoleID}`)
                            TicketClainCommandSend.send(`${TicketSupportID} \n<@${interaction.user.id}> ${data01.ClaimTicketMessage}. Please run ${client.prefix}ClaimTicket ${generator} to claim the ticket! \n With slash commands, please run /claim ticketid:${generator}`)
                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: +1 }, async (err20, data20) => {
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
                }
              }
            })
          } else {
            if (data01.EnableTicket === 'Disabled') {
              const disabledTicket = new MessageEmbed()
                .setTitle('Disabled!')
                .setDescription('Server owner has disabled the creation of tickets in this server.')

              interaction.reply({ embeds: [disabledTicket] })
            }
          }
        }
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)
        interaction.reply({ embeds: [NoData] })
      }
    })
  }
});
