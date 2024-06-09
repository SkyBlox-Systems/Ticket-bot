const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { StringSelectMenuBuilder, ChannelType,  ComponentType, PermissionsBitField } = require('discord.js');const bot = require('discord.js');
const discord = require('discord.js');
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const CloseSchema = require('../schemas/TicketLogs-schema');
const mongo = require('../mongo');
const ClaimTicket = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
  .setName('lock')
  .setDescription('lock Command');


module.exports.run = (client, interaction) => {
interaction.reply('Disabled')
}