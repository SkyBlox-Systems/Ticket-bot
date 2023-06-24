const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');


module.exports.data = new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Get stats of the bot usage')

module.exports.run = async (client, interaction) => {
    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            const MainEmbed = new EmbedBuilder()
            .setTitle('Statistics')
            .setDescription('Here are your statistics for your Guild')
            .addFields([
                { name: 'Open Tickets', value: `${data.TicketNumber}`, inline: true },
                { name: 'Tickets Created', value: `${data.ClosedTickets}`, inline: true }
            ])
            .setFooter({ text: 'Ticket Created will be low due to this being introduce to the database and bot in v5.2'})

            interaction.reply({ embeds: [MainEmbed]})
        } else {
            interaction.reply('No Data Found')
        }
    })

}