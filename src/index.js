
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();
const mongo = require('./mongo');
const { MessageEmbed } = require('discord.js');

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  require('./dashboard/server')
})();

mongo().then(mongoose => {
  try {
    console.log('Connected to database: TicketBot!');

  } finally {
    mongoose.connection.close()

  }
})

client.on('guildCreate', guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel)=>{
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;

      }
    }
  })

  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding Ticket bot to your server. To setup the ticket system, please run `!setup` in any of your channels. The bot is on shard #0. Any issues with setting up the bot, please head to our support page: https://ticketbots.tk/discord or https://docs.ticketbots.tk')
    .setImage('https://cdn.discordapp.com/attachments/787688783743025152/799263407190310932/Untitled.jpg')
    .setColor('#58b9ff')


  defaultChannel.send(welcome)
})
