const BaseCommand = require('../../utils/structures/BaseCommand');
const CommandsSchema = require('../../schemas/commands')
const { MessageEmbed } = require('discord.js')

module.exports = class CommandEnableCommand extends BaseCommand {
  constructor() {
    super('CommandEnable', 'Admin', []);
  }

  async run(client, message, args) {
    const AdminPerms = new MessageEmbed()
      .setTitle('Error')
      .setDescription('You need administrator permissions to use this command')
      .setColor('#f6f7f8')

    const specifyCommand = new MessageEmbed()
      .setTitle('Please specify a command')
      .setColor('#f6f7f8')

    const NotExist = new MessageEmbed()
      .setTitle('Error')
      .setDescription(`The command you put does not exist within the bot command list. Please check ${client.prefix}help for list of commands!`)
      .setColor('#f6f7f8')


    if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [AdminPerms]})
    const cmd = args[0];
    if (!cmd) return message.channel.send({ embeds: [specifyCommand]})
    if (!!client.commands.get(cmd) === false) return message.channel.send({ embeds: [NotExist]});
    CommandsSchema.findOne({ Guild: message.guildId }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.Cmds.includes(cmd)) {
          let commandNumber;

          for (let i = 0; i < data.Cmds.length; i++) {
            if (data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
          }

          await data.save()

          const EnabledCMD = new MessageEmbed()
          .setTitle(`Enabled ${cmd}!`)
          .setColor('#f6f7f8')

          const IsnTurnOff = new MessageEmbed()
          .setTitle('Error')
          .setDescription(`The command **${client.prefix}${cmd}** isnt turned off`)
          .setColor('#f6f7f8')

          message.channel.send({ embeds: [EnabledCMD]})
        } else return message.channel.send({ embeds: [IsnTurnOff]})
      }
    })
  }
}