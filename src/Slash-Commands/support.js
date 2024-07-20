const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');
const axios = require('axios')

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const configs = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('support')
    .setDescription('Support Command')
    .addStringOption(option =>
        option.setName('email')
            .setDescription('what is your email?')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Why you need to contact support?')
            .setRequired(true))


module.exports.run = (client, interaction) => {


}