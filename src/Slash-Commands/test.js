const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');
timestamp.round = true
const { Translate } = require('@google-cloud/translate').v2;
const { TranslateID } = require('../../slappey.json')


module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')

module.exports.run = async (client, interaction) => {
    console.log(client.users.cache.get("406164395643633665").username)
}