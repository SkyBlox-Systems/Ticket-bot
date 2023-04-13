const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const paginationEmbed = require('discordjs-v14-pagination');



module.exports.data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Help Command');

module.exports.run = (client, interaction) => {
  const Info = new Discord.EmbedBuilder()
    .setTitle('📑 Info')
    .addFields([
      {name: '/botinfo', value: 'Infomation about the bot'},
      {name: '/help', value: 'List all the commands for the bot'},
      {name: '/guildinfo', value: 'Tells you infomation about the guild'},
      {name: '/support', value: 'The discord guild and the docs for the bot'},
      {name: '/userinfo', value: 'Get your discord account infomation'},
      {name: '/status', value: 'Status of the virtual machine and bot'},
      {name: '/settings', value: 'Settings for your guild (View it)'},
      {name: '/feedback', value: 'Send feedback of a user or guild'},
      {name: '/premium', value: 'See if this guild is premium or not'},
    ])
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()
  
  const fun = new Discord.EmbedBuilder()
  .setTitle('🎉 Fun')
  .addFields([
    {name: '/christmas', value: 'List how many days until christmas'},
    {name: '/shortner', value: 'Short a link, using our domain'},
  ])
  .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
  .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
  .setColor('#58b9ff')
  .setTimestamp()

  const support = new Discord.EmbedBuilder()
    .setTitle('📞 Support')
    .addFields([
      {name: '/ticket', value: 'Channel customer support'},
      {name: '/add', value: 'Add user to ticket'},
      {name: '/remove', value: 'Remove a user from the ticket'},
      {name: '/close', value: 'Close ticket'},
      {name: '/ClaimTicket' ,value: 'Claim Ticket'},
    ])
    .setColor('#58b9ff')
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setTimestamp()

  const Prem = new Discord.EmbedBuilder()
  .setTitle('🎫 Premium')
  .addFields([
    {name: '/vcticket', value: 'Make a voice call ticket'},
    {name: '/custom', value: 'Custom bot for your guild'},
  ])
  .setColor('#58b9ff')
  .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
  .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
  .setTimestamp()

  const Moderator = new Discord.EmbedBuilder()
    .setTitle('⚙️ Moderator')
    .addFields([
      {name: '/ban', value: 'Ban users'},
      {name: '/kick', value: 'Kick user from guild'},
      {name: '/warn', value: 'warn user in the guild'},
    ])
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const Admin = new Discord.EmbedBuilder()
    .setTitle('⚙️ Admin')
    .addFields([
      {name: '/clear', value: 'Clear channel'},
      {name: '/announce', value: 'Announce something to a channel from the bot'},
      {name: '/CommandEnable', value: 'Enable a command'},
      {name: '/CommandDisable', value: 'Disable a command'},
      {name: '/dm', value: 'DM a user in the guild'},
    ])
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const ServerOwner = new Discord.EmbedBuilder()
    .setTitle('🛠 Guild Owner')
    .addFields([
      {name: '/setup', value: 'Setup everything'},
      {name: '/ServerAnnounce', value: 'Shutdown the bot'},
      {name: '/settings', value: 'Settings for your guild (Can edit)'},
      {name: '/transfer', value: 'Transfer your data to another guild'},
      {name: '/premium', value: 'Add premium to the guild'},
      {name: '/fix', value: 'Fix issues within the guild database'},
      {name: '/reaction', value: 'Set up ticket reactions'},
    ])
    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()

  const Owner = new Discord.EmbedBuilder()
    .setTitle('🛠 Owner')
    .addFields([
      {name: '/restart', value: 'Restart the bot'},
      {name: '/Eval', value: 'Bot infomation'},
      {name: '/shutdown', value: 'Shutdown the bot'},
      {name: '/servers', value: 'List all of the servers'},
      {name: '/blacklist', value: 'Blacklist user from bot'},
    ])

    .setThumbnail('https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg')
    .setFooter({ text: 'Ticket Bot Help', iconURL: 'https://cdn.discordapp.com/attachments/798916742276579368/799984667071610880/Ticket_Bot.jpg'})
    .setColor('#58b9ff')
    .setTimestamp()


  const pages = [
    Info,
    fun,
    support,
    Moderator,
    Admin,
    ServerOwner,
    Owner
  ]

  const pagesprem = [
    Info,
    fun,
    support,
    Prem,
    Moderator,
    Admin,
    ServerOwner,
    Owner
  ]

  const firstPageButton = new ButtonBuilder()
  .setCustomId('first')
  .setLabel('First')
  .setStyle(ButtonStyle.Primary);

const previousPageButton = new ButtonBuilder()
  .setCustomId('previous')
  .setLabel('Previous')
  .setStyle(ButtonStyle.Danger);

const nextPageButton = new ButtonBuilder()
  .setCustomId('next')
  .setLabel('Next')
  .setStyle(ButtonStyle.Success);

const lastPageButton = new ButtonBuilder()
  .setCustomId('last')
  .setLabel('Last')
  .setStyle(ButtonStyle.Primary);

  const buttons  = [firstPageButton, previousPageButton, nextPageButton, lastPageButton];



  const timeout = '120000';

  MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
    if (err) throw err;
    if (data) {
      if (data.PaidGuild === 'Yes') {
        paginationEmbed(
          interaction, // The interaction object
          pagesprem, // Your array of embeds
          buttons , // Your array of buttons
          60000, // (Optional) The timeout for the embed in ms, defaults to 60000 (1 minute)
      );
      }
      if (data.PaidGuild === 'No') {
        paginationEmbed(
          interaction, // The interaction object
          pages, // Your array of embeds
          buttons, // Your array of buttons
          60000, // (Optional) The timeout for the embed in ms, defaults to 60000 (1 minute)
      );
      }
    }
  })


}