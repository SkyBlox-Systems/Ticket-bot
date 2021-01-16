const BaseCommand = require('../../utils/structures/BaseCommand');
const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Main', []);
  }

  async run(client, message, args) {
    const Info = new Discord.MessageEmbed()
      .setTitle('📑 Info')
      .addField('!botinfo', 'Infomation about the bot')
      .addField('!help', 'List all the commands for the bot')
      .addField('!serverinfo', 'Tells you infomation about the server')
      .addField('!support', 'The discord server and the docs for the bot')
      .addField('!userinfo', 'Get your discord account infomation')
      .addField('!status', 'Status of the virtual machine and bot')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const support = new Discord.MessageEmbed()
      .setTitle('📞 Support')
      .addField('!ticket', 'Channel customer support')
      .addField('!VCticket', 'Voice customer support')
      .addField('!add', 'Add user to ticket')
      .addField('!remove', 'Remove a user from the ticket')
      .addField('!close', 'Close ticket')
      .setColor('#58b9ff')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setTimestamp()

    const Moderator = new Discord.MessageEmbed()
      .setTitle('⚙️ Moderator')
      .addField('!ban', 'Ban users')
      .addField('!kick', 'Kick user from server')
      .addField('!warn', 'warn user in the server')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const Admin = new Discord.MessageEmbed()
      .setTitle('⚙️ Admin')
      .addField('!clear', 'Clear channel')
      .addField('!announce', 'Announce something to a channel from the bot')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const Owner = new Discord.MessageEmbed()
      .setTitle('🛠 Owner')
      .addField('!restart', 'Restart the bot')
      .addField('!Eval', 'Bot infomation')
      .addField('!shutdown', 'Shutdown the bot')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const pages = [
      Info,
      support,
      Moderator,
      Admin,
      Owner
    ]

    const emojiList = ["⏪", "⏩"];

    const timeout = '120000';

    pagination(message, pages, emojiList, timeout)

  }
}