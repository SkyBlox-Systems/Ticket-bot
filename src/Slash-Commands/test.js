const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')

module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Add a reason to ticket')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    interaction.reply('No, sorry')
}