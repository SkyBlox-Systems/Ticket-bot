const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Premium Command')

module.exports.run = (client, interaction) => {

    const notOwner = new MessageEmbed()
        .setTitle('Owner only command!')
    if (interaction.user.id != interaction.guild.ownerId) {
        interaction.reply({ embeds: [notOwner]})
    }
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.PaidGuild === 'Yes') {
                interaction.reply('This guild already has premium.')
            }
        }

    })

}