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

    if (message.author.id != message.guild.ownerId)
      return message.channel.send({ embeds: [ServerOwner] });

    const MainMessage = new MessageEmbed()
      .setTitle('Update')
      .setDescription('What would you like to update babe? \nUpdate database? 1️⃣ \nUpdate from v2.0+ to the latest version? 2️⃣ \nFix Transcript and Data? 3️⃣ \n Update from v2.2 to v2.3? 4️⃣')

    message.channel.send({ embeds: [MainMessage] })
      .then(m => {
        m.react('1️⃣')
        m.react('2️⃣')
        m.react('3️⃣')
        m.react('4️⃣')
        const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        const Collector1 = m.createReactionCollector({ filter: Filter1,  max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        const Collector2 = m.createReactionCollector({ filter: Filter2,  max: 1, time: 2 * 60 * 1000 });
        const Filter3 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
        const Collector3 = m.createReactionCollector({filter: Filter3,  max: 1, time: 2 * 60 * 1000 });
        const Filter6 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
        const Collector6 = m.createReactionCollector({ filter: Filter6,  max: 1, time: 2 * 60 * 1000 });

        Collector2.on('collect', () => {
          const Filter2Sure = new MessageEmbed()
            .setTitle('Update')
            .setDescription('Are you sure that you want to update to v2.3? **there might be an error while updating**')
          message.channel.send({ embeds: [Filter2Sure] })
            .then(m1 => {
              m1.react('✅')
              m1.react('❌')

              const Filter4 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
              const Collector4 = m1.createReactionCollector({ filter: Filter4,  max: 1, time: 2 * 60 * 1000 });
              const Filter5 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
              const Collector5 = m1.createReactionCollector({ filter: Filter5,  max: 1, time: 2 * 60 * 1000 });

              Collector4.on('collect', () => {
                message.channel.send('Updating starting!')
                MainDatabase.findOne({ ServerID: message.author.id }, async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    if (data.BotVersion !== "2.3") {
                      message.channel.send('Bot is already on v2.3')
                    }
                  } else {

                    const Supportcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "category")

                    message.guild.channels.create('Tickets: 0', { type: 'GUILD_VOICE', parent: Supportcat }).then(async (chan) => {
                      chan.updateOverwrite(message.guild.roles.everyone, {
                        VIEW_CHANNEL: true
                      })
                      chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                        VIEW_CHANNEL: true
                      })
                    })

                    setTimeout(() => {
                      const TicketChannelMainID = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "GUILD_TEXT")
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
                        TicketMessage: "Thank you for contacting Support! Please wait for a customer support to claim your ticket.",
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
        

        Collector6.on('collect', () => {
         const UpdateToNewVersion = new MessageEmbed()
          .setTitle('Updating')
          .setDescription('You are about to update your bot current version from 2.2 to 2.3. List below is the changes. React with a ✅ to apply the new changes or react with a ❌ to not apply changes.')
          .addField('Changes for v2.3', `https://docs.ticketbots.tk/change-log \n **NO DATA WILL BE LOST DURRING UPGRADE!**`)

          message.channel.send({ embeds: [UpdateToNewVersion] })
          .then(m2 => {
            m2.react('✅')
            m2.react('❌')

            const Filter7 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            const Collector7 = m2.createReactionCollector({ filter: Filter7,  max: 1, time: 2 * 60 * 1000 });
            const Filter8 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            const Collector8 = m2.createReactionCollector({ filter: Filter8,  max: 1, time: 2 * 60 * 1000 });

            Collector7.on('collect', async () => {
              message.channel.send('Updating starting!')
              MainDatabase.findOne({ ServerID: message.guild.id }, async (err2, data2) => {
                if (err2) throw err2;
                if (data2) {
                  if (data2.BotVersion === '2.3') {
                    message.channel.send('Bot already on v2.3')
                  } else {
                    setTimeout(() => {
                      data2 = new MainDatabase({
                        ServerID: message.guild.id,
                        OwnerID: message.guild.owner.id,
                        TicketChannelID: data2.TicketChannelID,
                        TicketNumber: data2.TicketNumber,
                        TicketTrackerChannelID: data2.TicketChannelID,
                        BotPrefix: data2.BotPrefix,
                        SupportRoleID: data2.SupportRoleID,
                        ManagerRoleID: data2.ManagerRoleID,
                        AdminRoleID: data2.AdminRoleID,
                        BetaKey: data2.BetaKey,
                        PaidGuild: data2.PaidGuild,
                        Transcript: data2.Transcript,
                        UseTicketReactions: data2.UseTicketReactions,
                        UseDashboard: data2.UseDashboard,
                        APIKey: data2.APIKey,
                        TicketMessage: 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                        CloseMessage: 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                        ClaimTicketMessage: 'has open a ticket and needs support.',
                        DisabledCommands: 'N/A',
                        TranscriptMessage: 'Transcript for',
                        EnableTicket: 'Enabled',
                        BotVersion: '2.3'
                      })
                      data2.save()
                      MainDatabase.findOneAndDelete({ ServerID: message.guild.id }, async (err3, data3 ) => {
                        if (err3) throw err3;
                        if (data3)
                        return null
                      })
                      message.channel.send('Updated completed! Bot can now be used again!')
                    }, 5000);
                  }
                }
              })
            })
          })

        })
      })
  }
}