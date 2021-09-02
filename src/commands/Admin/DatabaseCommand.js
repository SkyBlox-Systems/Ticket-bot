const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const mongo = require('../../mongo');
const mongoose  = require('mongoose');
const MainDatabase = require('../../schemas/TicketData');
const TicketClaim = require('../../schemas/ticketclaim')



module.exports = class DatabaseCommand extends BaseCommand {
  constructor() {
    super('database', 'Admin', []);
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
      if (data.BetaKey === '6YMCKXgBcAd9yLrcd35E') {
        TicketClaim.findOne({ ServerID: message.guild.id }, async (err1, data1) => {
          if (err1) throw err1;
          if (data1) {
        
          }
        })
        
      } else {
        const NoBetaBuild = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This server is not part of the beta updates.')

        message.channel.send(NoBetaBuild)
      }
    }
  })
  }
}