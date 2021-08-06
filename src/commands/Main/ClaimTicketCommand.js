const BaseCommand = require('../../utils/structures/BaseCommand');
const ClaimTicket = require('../../schemas/ticketclaim');
const { findOneAndUpdate } = require('../../schemas/ticketclaim');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const MainDatabase = require('../../schemas/TicketData')


module.exports = class ClaimTicketCommand extends BaseCommand {
  constructor() {
    super('ClaimTicket', 'Main', []);
  }

  async run(client, message, args) {

    MainDatabase.findOne({ ServerID: message.guild.id }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        if (!message.member.roles.cache.some(r => r.name === "ticket support")) {
          const NoPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
    
          return message.channel.send(NoPerms)
        }
        const reasons = args.slice(0).join(" ")
    
        if (!reasons) return message.channel.send('No Ticket ID is provided!')
    
        ClaimTicket.findOne({ TicketIDs: reasons }, async (err, data) => {
          if (err) throw err;
          if (data) {
            data = ClaimTicket.findOneAndUpdate({ TicketIDs: reasons }, { ClaimUserID: message.author.id }, async (err2, data2) => {
              if (err2) throw err2;
              if (data2) {
                data2.save()
                const MainEmbed = new MessageEmbed()
                  .setTitle('Ticket info')
                  .setDescription('Here is the ticket infomation you would like to claim. React with ✅ if you want to claim it or react with ❌ to not claim it.')
                  .addField('User', `<@${data2.id}>`, true)
                  .addField('Ticket ID', `${data2.TicketIDs}`, true)
                  .addField('Server ID', `${data2.ServerID}`, true)
                  .addField('Channel ID', `${data2.ChannelID}`, true)
                  .addField('Reason', `${data2.Reason}`, true)
                message.channel.send(MainEmbed)
                  .then(m => {
                    m.react('✅');
                    m.react('❌');
    
                    const filter25 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                    const filter26 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                    const collector25 = m.createReactionCollector(filter25, { max: 1, time: 30000 }); // 5 min
                    const collector26 = m.createReactionCollector(filter26, { max: 1, time: 30000 }); // 5 min
    
                    collector25.on('collect', () => {
                      m.delete()
                      const TicketClaimed = new MessageEmbed()
                      .setTitle('Ticket Claimed!')
                      .setDescription(`<#${data2.ChannelID}> has been claimed by <@${message.author.id}> You should off be given the permission to send the message in the ticket!`)
        
                    const TicketClaimedDM = new MessageEmbed()
                      .setTitle('Ticket Claimed!')
                      .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${message.author.id}>!`)
        
                    //  if (message.author.id !== data2.ClaimUserID) {
                    //    const AlreadyClaimed = new MessageEmbed()
                    //      .setTitle('Ticket already claimed!')
                    //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)
        
                    //    return message.channel.send(AlreadyClaimed)
                    //  }
        
                    message.channel.send(TicketClaimed)
                    message.guild.channels.cache.get(data2.ChannelID).send(`<@${data2.id}>`)
                    message.guild.channels.cache.get(data2.ChannelID).send(TicketClaimedDM)
        
                    const MainChan = message.guild.channels.cache.get(data2.ChannelID)
        
                    MainChan.updateOverwrite(message.author.id, {
                      SEND_MESSAGES: true,
                      VIEW_CHANNEL: true,
                      ATTACH_FILES: true,
                      MANAGE_CHANNELS: true,
                    })
                      
                    })
    
                    collector26.on('collect', () => {
                      ClaimTicket.findOneAndUpdate({ TicketIDs: reasons}, {ClaimUserID: "" }, async (err3, data3) => {
                        if (err3) throw err3;
                        if (data3) {
                          data3.save()
                          message.channel.send('Claim deleted')
                          m.delete()
                        }
                      })
                    })
                  })
    
              }
    
            })
          } else {
            message.channel.send('The ID you put has not open a ticket or an invaild id')
              .catch(err => console.log(err))
          }
    
        })
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        message.channel.send(NoData)
      }
    })
  }
}