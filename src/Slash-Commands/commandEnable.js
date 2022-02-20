const { SlashCommandBuilder } = require('@discordjs/builders');
const CommandsSchema = require('../schemas/commands')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('command-enable')
    .setDescription('enable a command')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('Enable a command')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
        const cmd = interaction.options.getString('command')

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
  
  
      if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [AdminPerms]})
      if (!cmd) return interaction.reply({ embeds: [specifyCommand]})
      if (!!client.commands.get(cmd) === false) return interaction.reply({ embeds: [NotExist]});
      CommandsSchema.findOne({ Guild: interaction.guildId }, async (err, data) => {
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
  
            interaction.reply({ embeds: [EnabledCMD]})
          } else return interaction.reply({ embeds: [IsnTurnOff]})
        }
      })

    }