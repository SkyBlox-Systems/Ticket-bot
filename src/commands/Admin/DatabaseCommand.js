const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const mongo = require('../../mongo');
const mongoose  = require('mongoose');
// const MainDataBase = require('../../schemas/Database-creation')



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


   const Error = new MessageEmbed()
   .setTitle('Error')
   .setDescription('We have already found a database created on this discord guild. If you think this is a issue, Please contact one of the TicketBot Moderators.')
   .setColor('#f6f7f8')

   const Welcome1 = new MessageEmbed()
   .setTitle('Database')
   .setDescription('N/A')

  }
}