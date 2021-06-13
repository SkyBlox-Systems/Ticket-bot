const BaseEvent = require('../../utils/structures/BaseEvent');
const blacklist = require('../../schemas/Blacklist-schema');
const { MessageEmbed } = require('discord.js');
const SettingsSchema = require('../../schemas/settings');
const mongoose = require('mongoose');
const db = require('../../schemas/commands')


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {
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

  //  let guildProfile = await SettingsSchema.findOne({ guildID: message.guild.id });
  //  if (!guildProfile) {
   //   guildProfile = await new SettingsSchema({
    //    _id: mongoose.Types.ObjectId(),
    //    guidID: message.guild.id
    //  });
   //   await guildProfile.save().catch(err => console.log(err));
   // }

   // client.prefix = guildProfile.prefix;