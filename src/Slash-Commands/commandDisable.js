const { SlashCommandBuilder } = require('@discordjs/builders');
const CommandsSchema = require('../schemas/commands')
const { EmbedBuilder } = require('discord.js')
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('command-disable')
    .setDescription('disable a command')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('Disable a command')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
        const cmd = interaction.options.getString('command')

        const AdminPerms = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('You need administrator permissions to use this command')
            .setColor('#f6f7f8')

        const specifyCommand = new EmbedBuilder()
            .setTitle('Please specify a command')
            .setColor('#f6f7f8')

        const NotExist = new EmbedBuilder()
            .setTitle('Error')
            .setDescription(`The command you put does not exist within the bot command list. Please check ${client.prefix}help for list of commands!`)
            .setColor('#f6f7f8')


        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ embeds: [AdminPerms]})
        if (!cmd) return interaction.reply({ embeds: [specifyCommand]})
        if (!!client.commands.get(cmd) === false) return interaction.reply({ embeds: [NotExist]});
        CommandsSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const AlreadyDisabled = new EmbedBuilder()
                    .setTitle('Disabled')
                    .setDescription(`The command **${client.prefix}${cmd}** has already been disabled`)
                    .setColor('#f6f7f8')

                if (data.Cmds.includes(cmd)) return interaction.reply({ embeds: [AlreadyDisabled]});
                data.Cmds.push(cmd)
            } else {
                data = new CommandsSchema({
                    Guild: interaction.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            const Disabled = new EmbedBuilder()
                .setTitle('Disabled')
                .setDescription(`Command ${cmd} has been disabled`)
                .setColor('#f6f7f8')

            interaction.reply({ embeds: [Disabled]});
        })

    }