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


module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')

module.exports.run = async (client, interaction) => {
    const TicketClainCommandSend = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-staff" && ch.type == Discord.ChannelType.GuildText)

    console.log(TicketClainCommandSend)

}