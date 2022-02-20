const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Add a reason to ticket')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
        const test = interaction.options.getString('reason')
        interaction.reply({content: `${test}`})

    }