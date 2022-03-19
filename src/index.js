
const { Client, Intents, Interaction } = require('discord.js');
const { registerCommands, registerEvents, registerSlashCommands } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS ] });
const DataBaseMongo = require('./mongo');
require('./slash-register')();
let commands = require('./slash-register').commands;
console.log(commands);
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

const db = require('./schemas/commands')
const MainDatabase = require('./schemas/TicketData')
const blacklist = require('./schemas/Blacklist-schema');






(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.prefix;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(config.token);
  DataBaseMongo.init();
  require('./dashboard/server')
})();



client.on('ready', () => {
  let commands = client.application.commands;
})
    



client.on('guildCreate', guild => {
  const defaultChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES))


  const welcome = new MessageEmbed()
    .setTitle('Setup')
    .setDescription('Thank you for adding Ticket bot to your server. To setup the ticket system, please run `!setup` in any of your channels. The bot is on shard #0. Any issues with setting up the bot, please head to our support page: https://ticketbots.tk/discord or https://docs.ticketbots.tk')
    .setImage('https://cdn.discordapp.com/attachments/787688783743025152/799263407190310932/Untitled.jpg')
    .setColor('#f6f7f8')


  defaultChannel.send({ embeds: [welcome] })
  
})



client.on('guildDelete', guild => {
  MainDatabase.findOneAndDelete({ ServerID: guild.id }, async (err01, data01) => {
    if (err01) throw err01;
    if (data01) {
      console.log(`Removed ${guild.id} from the database.`)
    }
  })
})

client.on('interactionCreate', interaction => {
  if(!interaction.isCommand) return;
  let name = interaction.commandName;
  let options = interaction.options;

  let commandMethod = commands.get(name);
  if (commandMethod) {

    blacklist.findOne({ UserID: interaction.user.id }, async (err, data) => {
      const check =  await db.findOne({ Guild: interaction.guildId })
      const versionCheck =  await MainDatabase.findOne({ ServerID: interaction.guildId})
      if (err) throw err;
      if (!data) {
        if (commandMethod.name === 'setup') {
          commandMethod(client, interaction)
        } else {
          if (commandMethod.name === 'upgrade') {
            commandMethod(client, interaction)
          } else {
            if (versionCheck.BotVersion !== config.BotVersions) {
              const UpdateBot = new MessageEmbed()
                .setTitle('Update bot')
                .setDescription(`You are currently running v${versionCheck.BotVersion} of the bot. Please update it to v${config.BotVersions}. Run the command /upgrade to update the bot.`)
                await interaction.reply({ embeds: [UpdateBot]})
            } else {
              if (check) {
                const DisabledCommand = new MessageEmbed()
                    .setTitle('Disabled')
                    .setDescription(`The following command **/${commandMethod.name}** has been disabled in the server by an administrator`)
                    .setColor('#f6f7f8')
                  if (check.Cmds.includes(interaction.name)) return interaction.reply({ embeds: [DisabledCommand]})
                  commandMethod(client, interaction)
              } else {
                commandMethod(client, interaction)
              }
            }
          }
        }
      } else {
        const BlacklistedFromBot = new MessageEmbed()
          .setTitle('Blacklisted!')
          .setDescription('You have been blacklisted from using Ticket Bot!')
          .addField('Reason', `${data.Reason}`)
          .addField('Time', `${data.Time} UTC`)
          .addField('Admin', `${data.Admin}`)
          interaction.reply({ embeds: [BlacklistedFromBot]})
      }
    })
  }

  if(!commandMethod) return;
})
