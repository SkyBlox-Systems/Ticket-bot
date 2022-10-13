const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const mongoose = require('mongoose');




module.exports.data = new SlashCommandBuilder()
    .setName('status')
    .setDescription('status Command')

module.exports.run = async (client, interaction) => {
    interaction.reply('Command disabled')

}