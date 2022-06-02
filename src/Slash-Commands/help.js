const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Help Command');

module.exports.run = (client, interaction) => {
  const Info = new Discord.MessageEmbed()
    .setTitle('📑 Info')
    .addField(`/botinfo`, 'Infomation about the bot')
    .addField(`/help`, 'List all the commands for the bot')
    .addField(`/guildinfo`, 'Tells you infomation about the guild')
    .addField(`/support`, 'The discord guild and the docs for the bot')
    .addField(`/userinfo`, 'Get your discord account infomation')
    .addField(`/status`, 'Status of the virtual machine and bot')
    .addField(`/settings`, 'Settings for your guild (View it)')
    .addField(`/feedback`, `Send feedback of a user or guild`)
    .addField(`/premium`, `See if this guild is premium or not`)
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const support = new Discord.MessageEmbed()
    .setTitle('📞 Support')
    .addField(`/ticket`, 'Channel customer support')
    .addField(`/add`, 'Add user to ticket')
    .addField(`/remove`, 'Remove a user from the ticket')
    .addField(`/close`, 'Close ticket')
    .addField(`/ClaimTicket`, 'Claim Ticket')
    .setColor('#58b9ff')
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setTimestamp()

  const Prem = new Discord.MessageEmbed()
  .setTitle('🎫 Premium')
  .addField('/vcticket', 'Make a voice call ticket')
  .addField('/custom', 'Custom bot for your guild')
  .setColor('#58b9ff')
  .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
  .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
  .setTimestamp()

  const Moderator = new Discord.MessageEmbed()
    .setTitle('⚙️ Moderator')
    .addField(`/ban`, 'Ban users')
    .addField(`/kick`, 'Kick user from guild')
    .addField(`/warn`, 'warn user in the guild')
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const Admin = new Discord.MessageEmbed()
    .setTitle('⚙️ Admin')
    .addField(`/clear`, 'Clear channel')
    .addField(`/announce`, 'Announce something to a channel from the bot')
    .addField(`/CommandEnable`, 'Enable a command')
    .addField(`/CommandDisable`, 'Disable a command')
    .addField(`/dm`, `DM a user in the guild`)
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const ServerOwner = new Discord.MessageEmbed()
    .setTitle('🛠 guild Owner')
    .addField(`/setup`, 'Setup everything')
    .addField(`/ServerAnnounce`, 'Shutdown the bot')
    .addField(`/settings`, 'Settings for your guild (Can edit)')
    .addField(`/transfer`, `Transfer your data to another guild`)
    .addField(`/premium`, `Add premium to the guild`)
    .addField(`/fix`, `Fix issues within the guild database`)
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const Owner = new Discord.MessageEmbed()
    .setTitle('🛠 Owner')
    .addField(`/restart`, 'Restart the bot')
    .addField(`/Eval`, 'Bot infomation')
    .addField(`/shutdown`, 'Shutdown the bot')
    .addField(`/servers`, 'List all of the servers')
    .addField(`/blacklist`, 'Blacklist user from bot')
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const button1 = new Discord.MessageButton()
    .setCustomId("previousbtn")
    .setLabel("Previous")
    .setStyle("DANGER");

  const button2 = new Discord.MessageButton()
    .setCustomId("nextbtn")
    .setLabel("Next")
    .setStyle("SUCCESS");

  const pages = [
    Info,
    support,
    Moderator,
    Admin,
    ServerOwner,
    Owner
  ]

  const pagesprem = [
    Info,
    support,
    Prem,
    Moderator,
    Admin,
    ServerOwner,
    Owner
  ]

  const buttonList = [button1, button2];



  const timeout = '120000';

  MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.PaidGuild === 'Yes') {
        pagination(interaction, pagesprem, buttonList, timeout)
        interaction.reply({ content: 'help' })
      }
      if (data.PaidGuild === 'No') {
        pagination(interaction, pages, buttonList, timeout)
        interaction.reply({ content: 'help' })
      }
    }
  })


}