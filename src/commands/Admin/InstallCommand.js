const BaseCommand = require('../../utils/structures/BaseCommand');
const MainDatabase = require('../../schemas/TicketData')
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

module.exports = class InstallCommand extends BaseCommand {
  constructor() {
    super('install', 'Admin', []);
  }

  async run(client, message, args) {


    const ServerOwner = new MessageEmbed()
      .setTitle('Error')
      .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')


    if (message.author.id != message.guild.owner.id)
      return message.channel.send(ServerOwner);

    MainDatabase.findOne({ ServerID: message.guild.id }, async (err, data) => {
      if (err) throw err;

      if (data) {
        const FoundData = new MessageEmbed()
          .setTitle('Found Data')
          .setDescription(`We have already found data for this server. If you would like us to wipe the database, please react with ✅ If you need to update your database, please run ${client.prefix} update and canncel this by using ❌`)
        message.channel.send(FoundData)
          .then(m0 => {
            m0.react('✅')
            m0.react('❌')
            const ErrorFilter2 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const ErrorCollector2 = m0.createReactionCollector(ErrorFilter2, { max: 1, time: 2 * 60 * 1000 });
            const ErrorFilter3 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            const ErrorCollector3 = m0.createReactionCollector(ErrorFilter3, { max: 1, time: 2 * 60 * 1000 });
            ErrorCollector2.on('collect', () => {
              const Started2 = new MessageEmbed()
                .setTitle('Started the wipe of the database')

              m0.edit(Started2)

              MainDatabase.findOneAndDelete({ ServerID: message.guild.id }, async (err2, data2) => {
                if (err2) throw err2;
                if (data2) {

                  const WipeDone = new MessageEmbed()
                    .setTitle('Wipe is done! Please run install once again.')

                  message.channel.send(WipeDone)

                }
              })
            })
          })
      } else {
        const Error = new MessageEmbed()
          .setTitle('No data')
          .setDescription('There is no data found for the server. Please react with ✅ to make a database.')

        message.channel.send(Error)
          .then(m => {
            m.react('✅')
            const ErrorFilter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const ErrorCollector1 = m.createReactionCollector(ErrorFilter1, { max: 1, time: 2 * 60 * 1000 });
            const TicketChannelMainID = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "text")
            const TicketSupportID = message.guild.roles.cache.find(roles => roles.name === 'ticket support')
            const TicketManagerID = message.guild.roles.cache.find(roles => roles.name === 'ticket manager')
            ErrorCollector1.on('collect', () => {
              const Starting = new MessageEmbed()
                .setTitle('Started!')
              message.channel.send(Starting)
                .then(m2 => {
                  data = new MainDatabase({
                    ServerID: message.guild.id,
                    OwnerID: "N/A",
                    TicketChannelID: TicketChannelMainID.id,
                    TicketNumber: "0",
                    TicketTrackerChannelID: "N/A",
                    BotPrefix: client.prefix,
                    SupportRoleID: TicketSupportID.id,
                    ManagerRoleID: TicketManagerID.id,
                    AdminRoleID: "N/A",
                    BetaKey: "N/A",
                    PaidGuild: "No",
                    Transcript: "Yes",
                    UseTicketReactions: "Yes",
                    UseDashboard: "Yes",
                    APIKey: "N/A",
                    TicketMessage: 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                    CloseMessage: 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                    ClaimTicketMessage: 'has open a ticket and needs support.',
                    DisabledCommands: 'N/A',
                    TranscriptMessage: 'Transcript for',
                    BotVersion: "2.3"
                  })
                  data.save()
                  console.log('Data Saved in the database correctly!')
                })
            })
          })
      }
    })

  }
}