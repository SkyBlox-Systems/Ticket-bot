const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('support')
    .setDescription('Support Command')


module.exports.run = (client, interaction) => {
    const main = new EmbedBuilder()
        .setTitle('Support')
        .setDescription('If you need help, please join our discord server: https://www.ticketbots.co.uk/discord or check our docs: https://docs.ticketbots.co.uk')

    interaction.reply({ embeds: [main] });
}