
const { Client, GatewayIntentBits, Partials, Interaction } = require('discord.js');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks], partials: [Partials.Channel] })
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ['CHANNEL'] });
const DataBaseMongo = require('./mongo');
require('./slash-register')();
let commands = require('./slash-register').commands;
// console.log(commands);
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { Permissions } = require('discord.js');
const { MessageCollector, Collector, ChannelType } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const mongoose = require('mongoose');
const Stats = require('discord-live-stats');
const DLU = require("@dbd-soft-ui/logs")


// const Poster = new Stats.Client(client, {
//   stats_uri: 'https://shard1.ticketbots.co.uk/',
//   authorizationkey: "ticketbot",
// })



const db = require('./schemas/commands')
const MainDatabase = require('./schemas/TicketData')
const blacklist = require('./schemas/Blacklist-schema');
const ClaimTicket = require('./schemas/ticketclaim');
const { truncate } = require('fs/promises');
const GiveawayDatabase = require('./schemas/giveaways-user-data');







(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  DataBaseMongo.init();
  // require('./dashboard/server')
})();




client.on('ready', () => {
  let commands = client.application.commands;
})

client.on("ready", () => {
  DLU.register(client, {
    dashboard_url: "https://dashboard.ticketbots.co.uk",
    key: "richard1234YT!"
  })
})

client.on('guildCreate', guild => {
  // const defaultChannel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES))
  const defaultChannel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText)
  const welcome = new EmbedBuilder()
    .setTitle('Setup')
    .setDescription('Hey! Thank you for adding us to our server! We are exicted to be here. Whenever u are ready, please run `/setup` to start!')
    .addFields([
      { name: `Website`, value: `[Click me](https://www.ticketbots.co.uk/)`, inline: true },
      { name: `Invite Bot`, value: `[Click me](https://discord.com/oauth2/authorize?client_id=799231222303293461&scope=bot%20applications.commands&permissions=2147486783)`, inline: true },
      { name: `Status`, value: `[Click me](https://status.skybloxsystems.com)`, inline: true },
    ])
    .setImage('https://cdn.discordapp.com/attachments/978357687630856192/1065654939063439360/Welcome.png')
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
      const check = await db.findOne({ Guild: interaction.guild.id })
      const versionCheck = await MainDatabase.findOne({ ServerID: interaction.guild.id })
      if (err) throw err;
      if (!data) {
        if (name === 'setup') {
          commandMethod(client, interaction)
        } else {
          if (name === 'upgrade') {
            commandMethod(client, interaction)
          } else {
            if (mongoose.connection.readyState === 1) {
              
              if (versionCheck === null) {
                const notdata = new EmbedBuilder()
                  .setTitle('No data')
                  .setDescription('It seems like there is no server settings stored within the database. Please run `/setup`.')

                interaction.reply({ embeds: [notdata] })

              } else {
                if (versionCheck.BotVersion !== config.BotVersions) {

                  MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err4, data4) => {
                    if (err4) throw err;
                    if (data4) {
                      data4 = new MainDatabase({
                        ServerID: data4.ServerID || interaction.guild.id,
                        OwnerID: data4.OwnerID || interaction.guild.ownerId,
                        TicketChannelID: data4.TicketTrackerChannelID || 'N/A',
                        TicketNumber: data4.TicketNumber || '0',
                        ClosedTickets: data4.ClosedTickets || '0',
                        TicketTrackerChannelID: data4.TicketChannelID || 'N/A',
                        FeedbackChannelID: data4.FeedbackChannelID || 'N/A',
                        BotPrefix: data4.BotPrefix || '!',
                        SupportRoleID: data4.SupportRoleID || 'N/A',
                        ManagerRoleID: data4.ManagerRoleID || 'N/A',
                        AdminRoleID: data4.AdminRoleID || 'N/A',
                        BetaKey: data4.BetaKey || 'N/A',
                        PaidGuild: data4.PaidGuild || 'No',
                        Tier: data4.Tier || 'Free',
                        PremiumCode: data4.PremiumCode || 'N/A',
                        Transcript: data4.Transcript || 'Yes',
                        UseTicketReactions: data4.UseTicketReactions || 'Yes',
                        UseDashboard: data4.UseDashboard || 'Yes',
                        APIKey: data4.APIKey || 'N/A',
                        TicketMessage: data4.TicketMessage || 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                        CloseMessage: data4.CloseMessage || 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                        ClaimTicketMessage: data4.ClaimTicketMessage || 'has open a ticket and needs support.',
                        OpenTicket: data4.OpenTicket || 'I have open a ticket for you!',
                        DisabledCommands: data4.DisabledCommands || 'NA',
                        TranscriptMessage: data4.TranscriptMessage || 'Transcript for',
                        EnableTicket: data4.EnableTicket || 'Enabled',
                        ModMail: data4.ModMail || 'Disabled',
                        VoiceTicket: data4.VoiceTicket || 'Disabled',
                        CustomBots: data4.CustomBots || '0',
                        TicketIDLength: data4.TicketIDLength || '5',
                        SecondServer: data4.SecondServer || 'Disabled',
                        SecondServerID: data4.SecondServerID || 'N/A',
                        SecondServerSupportRoleID: data4.SecondServerSupportRoleID || 'N/A',
                        SecondServerAdminRoleID: data4.SecondServerAdminRoleID || 'N/A',
                        SecondServerManagerRoleID: data4.SecondServerManagerRoleID || 'N/A',
                        SecondServerClaimChannel: data4.SecondServerClaimChannel || 'N/A',
                        SecondServerLogsChannel: data4.SecondServerLogsChannel || 'N/A',
                        SecondServerTranscriptChannel: data4.SecondServerTranscriptChannel || 'N/A',
                        ROBLOX: data4.ROBLOX || 'Disabled',
                        TypeOfServer: data4.TypeOfServer || 'First',
                        Important: data4.Important || 'Enabled',
                        WebsiteCode: data4.WebsiteCode || 'N/A',
                        Language: data4.Language || 'en',
                        Threads: data4.Threads || 'Disabled',
                        BotVersion: config.BotVersions
                      })
                      data4.save()

                      const updated = new EmbedBuilder()
                        .setTitle('The bot has now been updated')
                        .setDescription(`To find the changes, please head here [Change Log](https://docs.ticketbot.co.uk/change-log). Please Re-Run the command.`)
                      interaction.reply({ embeds: [updated] })

                      MainDatabase.findOneAndRemove({ ServerID: interaction.guild.id }, async (err2, data2) => {
                        if (err2) throw err;
                        if (data2) {
                        }

                      })
                    } else {
                      interaction.reply('We are having issues updating your guild. Please contact support via our support server. Do that by heading to our website')
                    }
                  })


                  // New Update system
                } else {
                  if (check) {
                    const DisabledCommand = new EmbedBuilder()
                      .setTitle('Disabled')
                      .setDescription(`The following command **/${interaction.commandName}** has been disabled in the server by an administrator`)
                      .setColor('#f6f7f8')
                    if (check.Cmds.includes(interaction.commandName)) return interaction.reply({ embeds: [DisabledCommand] })
                    if (versionCheck.Important === 'Enabled') {
                      commandMethod(client, interaction)
                      // commandMethod(client, interaction)
                      // const ImportantAnnouncement = new EmbedBuilder()
                      //   .setTitle('Imporant announcement from bot owner')
                      //   .setDescription('As you might of heard about what has happen on the 8th September. As a team, we have made a decision to disable all bots commands on the 18th of September all day. If you want to know why we are doing this, please click the link below. **COMMAND WILL BE SENT 2 SECONDS AFTER THIS MESSAGE! AND THIS MESSAGE WILL STAY UNTIL 18TH SEPTEMBER**')
                      //   .addField('Link', '[Link](https://link.skybloxsystems.com/news1)')

                      // await interaction.channel.send({ embeds: [ImportantAnnouncement], ephemeral: true })
                      // setTimeout(() => {
                      //   commandMethod(client, interaction)
                      // }, 2000);
                    } else {
                      commandMethod(client, interaction)
                    }
                  } else {
                    if (versionCheck.Important === 'Enabled') {
                      commandMethod(client, interaction)
                      //  commandMethod(client, interaction)
                      // const ImportantAnnouncement = new EmbedBuilder()
                      //   .setTitle('Imporant announcement from bot owner')
                      //   .setDescription('As you might of heard about what has happen on the 8th September. As a team, we have made a decision to disable all bots commands on the 18th of September all day. If you want to know why we are doing this, please click the link below. **COMMAND WILL BE SENT 2 SECONDS AFTER THIS MESSAGE! AND THIS MESSAGE WILL STAY UNTIL 18TH SEPTEMBER**')
                      //   .addField('Link', '[Link](https://link.skybloxsystems.com/news1)')

                      // await interaction.channel.send({ embeds: [ImportantAnnouncement], ephemeral: true })
                      // setTimeout(() => {
                      //   commandMethod(client, interaction)
                      // }, 2000);
                    } else {
                      commandMethod(client, interaction)
                    }
                  }
                }
              }
            } else {
            
                console.log('error')
                const DatabaseError = new EmbedBuilder()
                .setTitle('Database Error')
                .setDescription('The bot is having issues connecting to the database at the moment. Please check our [status page](https://status.skybloxsystems.com) or email support @ support@skybloxsystems.com')

                interaction.reply({ embeds: [DatabaseError]})
      
            }
          }
        }
      } else {
        const BlacklistedFromBot = new EmbedBuilder()
          .setTitle('Blacklisted!')
          .setDescription('You have been blacklisted from using Ticket Bot!')
          .addFields([
            { name: `Reason`, value: `${data.Reason}`, inline: false },
            { name: `Time`, value: `${data.Time} UTC`, inline: false },
            { name: `Admin`, value: `${data.Admin}`, inline: false }
          ])
        interaction.reply({ embeds: [BlacklistedFromBot] })
      }

    })
  }

  if (!commandMethod) return;
})

client.on('interactionCreate', interaction => {
  const TicketChannelIdChannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'feedback' && ch.type == 'GUILD_TEXT');

  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "user") {
    const usertitle = interaction.fields.getTextInputValue("userFeedbackID")
    const userfeedback = interaction.fields.getTextInputValue("userMessage")

    const userEmbed = new EmbedBuilder()
      .setTitle('New feedback!')
      .setDescription(`${interaction.user.id} has sent a user feedback message. Below is the message`)
      .addField('User', `${usertitle}`)
      .addField('Message', `${userfeedback}`)

    TicketChannelIdChannel.send({ embeds: [userEmbed] })
    interaction.reply('Feedback sent!')
  }
  if (interaction.customId === "giveaway") {
    const GiveawayEmail = interaction.fields.getTextInputValue("Email")
    const GiveawayWhy = interaction.fields.getTextInputValue("Why")

    const GiveawayDM = new EmbedBuilder()
      .setTitle('Giveaway')
      .setDescription('You have entered into the christmas giveaway! You can not enter again unless told to by admins of the bot.')

    const usergiveaway = client.users.cache.get(interaction.user.id)
    usergiveaway.send({ embeds: [GiveawayDM] })

    GiveawayDatabase.findOne({ UserID: interaction.user.id }, (err, data) => {
      if (err) throw err;
      if (data) {
        // do nothing
      } else {
        data = new GiveawayDatabase({
          UserID: interaction.user.id,
          Email: GiveawayEmail,
          Why: GiveawayWhy,
          Usage: 1
        })
        data.save()
      }
    })
  }
  if (interaction.customId === "reportuser") {
    const ReportUserIDs = interaction.fields.getTextInputValue("reportUserID")
    const reportUserMessages = interaction.fields.getTextInputValue("reportUserMessage")
    const reportUserImagess = interaction.fields.getTextInputValue("reportUserImages")

    const ReportUserDM = new EmbedBuilder()
      .setTitle('Report')
      .setDescription('Thank you for sending a report about a user. One of admins will look in this ASAP. You will get a update soon.')

    const reportuserss = client.users.cache.get(interaction.user.id)
    reportuserss.send({ embeds: [ReportUserDM] })

    const LogChannel = client.channels.cache.get('1065657960719716482')
    const reportuserchannel = new EmbedBuilder()
      .setTitle('Report user received')
      .addFields([
        { name: `User ID who sent it in: `, value: `${interaction.user.id}`, inline: true },
        { name: `User ID who was reported: `, value: `${ReportUserIDs}`, inline: true },
        { name: `Message`, value: `${reportUserMessages}`, inline: true },
        { name: `Images provided`, value: `${reportUserImagess}`, inline: true }
      ])
    LogChannel.send({ embeds: [reportuserchannel] })
  }

  if (interaction.customId === "reportbug") {
    const ReportUserIDs = interaction.fields.getTextInputValue("reportBugCommand")
    const reportUserMessages = interaction.fields.getTextInputValue("reportCommandMessage")
    const reportUserImagess = interaction.fields.getTextInputValue("reportCommandImages")

    const ReportUserDM = new EmbedBuilder()
      .setTitle('Report')
      .setDescription('Thank you for sending a report about a command. One of admins will look in this ASAP. You will get a update soon.')

    const reportuserss = client.users.cache.get(interaction.user.id)
    reportuserss.send({ embeds: [ReportUserDM] })

    const LogChannel = client.channels.cache.get('1065657945720893491')
    const reportuserchannel = new EmbedBuilder()
      .setTitle('Report command received')
      .addFields([
        { name: `User ID who sent it in: `, value: `${interaction.user.id}`, inline: true },
        { name: `User ID who was reported: `, value: `${ReportUserIDs}`, inline: true },
        { name: `Message`, value: `${reportUserMessages}`, inline: true },
        { name: `Images provided`, value: `${reportUserImagess}`, inline: true }
      ])
    LogChannel.send({ embeds: [reportuserchannel] })
  }
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
                const senddmmessage = new EmbedBuilder()
                  .setTitle(`New reply from ${msg.author.tag}`)
                  .setDescription('Please use the command `/ticketreply` to reply to this message.')
                  .addFields([
                    { name: `Ticket Reply: `, value: `${m33.first().content}`, inline: true }
                  ])
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
          //   const senddmmessage = new EmbedBuilder()
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
process.on("unhandledRejection", (reason, p) => {
  DLU.send(client, {
    title: "Unhandled Rejection",
    description: reason
  })
})



// process.on("unhandledRejection", (reason, p) => {


//   const LogChannel = client.channels.cache.get('1065618246507692123')
//   const ErrorEmbeds = new EmbedBuilder()
//     .setTitle('⚠️ ERROR')
//     .setDescription(`**Unhandled Rejection/Catch: \n\n** Reason: **${reason}** \n Command: **${commands.name}**`)

//   LogChannel.send({ embeds: [ErrorEmbeds] })
// })

