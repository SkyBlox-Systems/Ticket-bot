const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('servers')
    .setDescription('servers Command')


module.exports.run = (client, interaction) => {

    if (interaction.user.id !== '406164395643633665') {
        const NotOwner = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `!servers`. The command is only available for the owner.')
        return interaction.reply(NotOwner)
    }
    client.guilds.cache.forEach(guild => {

        interaction.reply(`${guild.name} | ${guild.id}`)
    })

}