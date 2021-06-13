const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const mongo = require('../../mongo');
const mongoose  = require('mongoose');
const MainDataBase = require('../../schemas/Database-creation')



module.exports = class DatabaseCommand extends BaseCommand {
  constructor() {
    super('database', 'Admin', []);
  }

 async run(client, message, args) {
   const Error = new MessageEmbed()
   .setTitle('Error')
   .setDescription('We have already found a database created on this discord guild. If you think this is a issue, Please contact one of the TicketBot Moderators.')
   .setColor('#f6f7f8')

   const Welcome1 = new MessageEmbed()
   .setTitle('Database')
   .setDescription('N/A')

  }
}