const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const { MessageEmbed } = require('discord.js');
const DatabaseMongo = require('./mongo');

const Discord = require("discord.js");
const DiscordSlash = require("discord.js-slash-command");

const client = new Discord.Client();
const slash = new DiscordSlash.Slash(client);


(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  DatabaseMongo.init()
})();


client.on("ready",  guild => {

  // commands
  let TicketCommand = new DiscordSlash.CommandBuilder();
  let testcommand = new DiscordSlash.CommandBuilder();
  let test2Command = new DiscordSlash.CommandBuilder();

  // Sub commands

  let TicketSubCommand = new DiscordSlash.CommandBuilder()


  // Main settings
  test2Command.setName("test2")
  test2Command.setDescription('test');

  testcommand.setName("test");
  testcommand.setDescription('test');

  TicketCommand.setName("ticket");
  TicketCommand.setDescription('ticket command');

  TicketSubCommand.setName("reason");
  TicketSubCommand.setDescription("reason for ticket");
  TicketSubCommand.setType(DiscordSlash.CommandType.STRING);
  TicketSubCommand.setRequired(true);

  //  Adding Sub-Command to Option

  TicketCommand.addOption(TicketSubCommand)


})






//client.on('guildDelete', async (guild) => {
// prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
// if (err) throw err;
// if (data) {
//  prefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log('deleted data.'))
// }
// })
// })


client.on('guildCreate', guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
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
    .setColor('#f6f7f8')


  defaultChannel.send(welcome)
})


