const BaseCommand = require('../../utils/structures/BaseCommand');
const MainDatabase = require('../../schemas/TicketData');
const { MessageEmbed, Message } = require('discord.js')

module.exports = class UpdateCommand extends BaseCommand {
  constructor() {
    super('update', 'Admin', []);
  }

  async run(client, message, args) {

    const ServerOwner = new MessageEmbed()
      .setTitle('Error')
      .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

    if (message.author.id != message.guild.owner.id)
      return message.channel.send(ServerOwner);

    const MainMessage = new MessageEmbed()
      .setTitle('Update')
      .setDescription('What would you like to update babe? \nUpdate database? 1️⃣ \nUpdate from v2.0 to v2.1? 2️⃣ \nFix Transcript and Data? 3️⃣')

    message.channel.send(MainMessage)
      .then(m => {
        m.react('1️⃣')
        m.react('2️⃣')
        m.react('3️⃣')
        const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        const Collector1 = m.createReactionCollector(Filter1, { max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        const Collector2 = m.createReactionCollector(Filter2, { max: 1, time: 2 * 60 * 1000 });
        const Filter3 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
        const Collector3 = m.createReactionCollector(Filter3, { max: 1, time: 2 * 60 * 1000 });

        Collector2.on('collect', () => {
          const Filter2Sure = new MessageEmbed()
            .setTitle('Update')
            .setDescription('Are you sure that you want to update to v2.1? **there might be an error while updating**')
          message.channel.send(Filter2Sure)
            .then(m1 => {
              m1.react('✅')
              m1.react('❌')

              const Filter4 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
              const Collector4 = m1.createReactionCollector(Filter4, { max: 1, time: 2 * 60 * 1000 });
              const Filter5 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
              const Collector5 = m1.createReactionCollector(Filter5, { max: 1, time: 2 * 60 * 1000 });

              Collector4.on('collect', () => {
                message.channel.send('Updating starting!')
                MainDatabase.findOne({ ServerID: message.author.id }, async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    if (data.BotVersion !== "2.1") {
                      message.channel.send('Bot is already on v2.1')
                    }
                  } else {

                    const Supportcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "category")

                    message.guild.channels.create('Tickets: 0', { type: 'voice', parent: Supportcat }).then(async (chan) => {
                      chan.updateOverwrite(message.guild.roles.everyone, {
                        VIEW_CHANNEL: true
                      })
                      chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                        VIEW_CHANNEL: true
                      })
                    })

                    setTimeout(() => {
                      const TicketChannelMainID = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "text")
                      const TicketSupportID = message.guild.roles.cache.find(roles => roles.name === 'ticket support')
                      const TicketManagerID =  message.guild.roles.cache.find(roles => roles.name === 'ticket manager')
                      data = new MainDatabase({
                        ServerID: message.guild.id,
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
                        BotVersion: "2.2"
                      })
                      data.save()
                      message.channel.send('Updated completed!')
                    }, 5000);

                  }
                })
              })
            })
        })
      })
  }
}