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
      .setDescription('What would you like to update babe? \nUpdate database? 1️⃣')

    message.channel.send({ embeds: [MainMessage] })
      .then(m => {
        m.react('1️⃣')
        const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        const Collector1 = m.createReactionCollector({ filter: Filter1,  max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        const Collector2 = m.createReactionCollector({ filter: Filter2,  max: 1, time: 2 * 60 * 1000 });
        const Filter3 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
        const Collector3 = m.createReactionCollector({filter: Filter3,  max: 1, time: 2 * 60 * 1000 });
        const Filter6 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
        const Collector6 = m.createReactionCollector({ filter: Filter6,  max: 1, time: 2 * 60 * 1000 });


        

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