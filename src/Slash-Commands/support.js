const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('support')
    .setDescription('Support Command')


module.exports.run = (client, interaction) => {
    const main = new MessageEmbed()
        .setTitle('Support')
        .setDescription('If you need help, please join our discord server: https://www.ticketbot.tk/discord or check our docs: https://docs.ticketbot.tk')
        .setColor('BLUE')

    interaction.reply({ embeds: [main] });
}