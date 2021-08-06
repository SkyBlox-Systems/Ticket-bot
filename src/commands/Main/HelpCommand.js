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
      .addField(`${client.prefix}botinfo`, 'Infomation about the bot')
      .addField(`${client.prefix}help`, 'List all the commands for the bot')
      .addField(`${client.prefix}serverinfo`, 'Tells you infomation about the server')
      .addField(`${client.prefix}support`, 'The discord server and the docs for the bot')
      .addField(`${client.prefix}userinfo`, 'Get your discord account infomation')
      .addField(`${client.prefix}status`, 'Status of the virtual machine and bot')
      .addField(`${client.prefix}settings`, 'Settings for your server (View it)')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const support = new Discord.MessageEmbed()
      .setTitle('📞 Support')
      .addField(`${client.prefix}ticket`, 'Channel customer support')
      .addField(`${client.prefix}VCticket`, 'Voice customer support')
      .addField(`${client.prefix}add`, 'Add user to ticket')
      .addField(`${client.prefix}remove`, 'Remove a user from the ticket')
      .addField(`${client.prefix}close`, 'Close ticket')
      .addField(`${client.prefix}ClaimTicket`, 'Claim Ticket')
      .setColor('#58b9ff')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setTimestamp()

    const Moderator = new Discord.MessageEmbed()
      .setTitle('⚙️ Moderator')
      .addField(`${client.prefix}ban`, 'Ban users')
      .addField(`${client.prefix}kick`, 'Kick user from server')
      .addField(`${client.prefix}warn`, 'warn user in the server')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const Admin = new Discord.MessageEmbed()
      .setTitle('⚙️ Admin')
      .addField(`${client.prefix}clear`, 'Clear channel')
      .addField(`${client.prefix}announce`, 'Announce something to a channel from the bot')
      .addField(`${client.prefix}CommandEnable`, 'Enable a command')
      .addField(`${client.prefix}CommandDisable`, 'Disable a command')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const ServerOwner = new Discord.MessageEmbed()
    .setTitle('🛠 Server Owner')
    .addField(`${client.prefix}setup`, 'Setup everything')
    .addField(`${client.prefix}ServerAnnounce`, 'Shutdown the bot')
    .addField(`${client.prefix}settings`, 'Settings for your server (Can edit)')
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setColor('#58b9ff')
    .setTimestamp()

    const Owner = new Discord.MessageEmbed()
      .setTitle('🛠 Owner')
      .addField(`${client.prefix}restart`, 'Restart the bot')
      .addField(`${client.prefix}Eval`, 'Bot infomation')
      .addField(`${client.prefix}shutdown`, 'Shutdown the bot')
      .addField(`${client.prefix}servers`, 'List all of the servers')
      .addField(`${client.prefix}blacklist`, 'Blacklist user from bot')
      .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setFooter('Ticket Bot Help', 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
      .setColor('#58b9ff')
      .setTimestamp()

    const pages = [
      Info,
      support,
      Moderator,
      Admin,
      ServerOwner,
      Owner
    ]

    const emojiList = ["⏪", "⏩"];

    const timeout = '120000';

    pagination(message, pages, emojiList, timeout)

  }
}