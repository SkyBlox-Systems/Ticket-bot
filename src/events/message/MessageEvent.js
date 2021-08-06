const BaseEvent = require('../../utils/structures/BaseEvent');
const blacklist = require('../../schemas/Blacklist-schema');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const db = require('../../schemas/commands')
const MainDatabase = require('../../schemas/TicketData')


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {

    //  client.prefix = async function (message) {
    //    let custom;

    //    const data = await MainDatabase.findOne({ ServerID: message.guild.id })
    //      .catch(err => console.log(err))

    //    if (data) {
    //      custom = data.BotPrefix;
    //    } else {
    //      custom = prefix;
    //    }
    //    return custom;
    //  }

    //  const p = await client.prefix(message)
    //  if (message.mentions.users.first()) {
    //    if (message.mentions.users.first().id === '759895856568074290') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    //  }
    //  if (!message.content.startsWith(p)) return;
    //  if (!message.guild) return;
    //  if (!message.member) message.member = await message.guild.fetchMember(message);
    //  const args = message.content.slice(p.length).trim().split(/ +/g);
    //  const cmd = args.shift().toLowerCase();
    //  if (cmd.length == 0) return;
    //  let command = client.commands.get(cmd)
    //  if (command) {
    //   const check = await db.findOne({ Guild: message.guild.id })
    //  if (check) {
    //   const DisabledCommand = new MessageEmbed()
    //     .setTitle('Disabled')
    //    .setDescription(`The following command **${client.prefix}${command.name}** has been disabled in the server by an administrator`)
    //    .setColor('#f6f7f8')
    //  if (check.Cmds.includes(command.name)) return message.channel.send(DisabledCommand)
    //  if (!command) command = client.commands.get(client.aliases.get(cmd));
    // if (command) command.run(client, message, args)
    // } else {
    //  if (!command) command = client.commands.get(client.aliases.get(cmd));
    // if (command) command.run(client, message, args)
    // }
    //   }


    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);



      const command = client.commands.get(cmdName);
      if (command) {
        const check = await db.findOne({ Guild: message.guild.id })
        if (check) {
          const DisabledCommand = new MessageEmbed()
            .setTitle('Disabled')
            .setDescription(`The following command **${client.prefix}${command.name}** has been disabled in the server by an administrator`)
            .setColor('#f6f7f8')
          if (check.Cmds.includes(command.name)) return message.channel.send(DisabledCommand)
          command.run(client, message, cmdArgs)
        } else {
          command.run(client, message, cmdArgs)
        }
      }
    }
  }
}
