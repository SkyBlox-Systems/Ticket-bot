const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')

module.exports.data = new SlashCommandBuilder()
    .setName('guildinfo')
    .setDescription('Guild Info Command');

module.exports.run = async (client, interaction) => {
    const guild = interaction.guild

    const owner = await interaction.guild.fetchOwner()
    let guildDescription = guild.description
    if (!guildDescription) {
        guildDescription = 'None'
    }


    const embed = new MessageEmbed()
        .setTitle('Guild Info')
        .setDescription('Returns information about the guild.')
        .addFields({
            name: 'Name',
            value: guild.name,
            inline: true
        },
            {
                name: 'ID',
                value: guild.id,
                inline: true
            },
            {
                name: 'Description',
                value: guildDescription,
                inline: true
            },
            {
                name: 'Created at',
                value: guild.createdAt.toDateString(),
                inline: true
            },
            {
                name: 'Owner',
                value: owner.user.tag,
                inline: true
            },
            {
                name: 'Member Count',
                value: guild.memberCount.toString(),
                inline: true
            },
            {
                name: 'Member Cap',
                value: guild.maximumMembers.toString(),
                inline: true
            },
            {
                name: 'Boosts',
                value: guild.premiumSubscriptionCount.toString(),
                inline: true
            },
            {
                name: 'Boost Level',
                value: guild.premiumTier,
                inline: true
            })

    interaction.reply({ embeds: [embed] })
}