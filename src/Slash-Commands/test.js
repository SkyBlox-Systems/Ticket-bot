const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Add a reason to ticket')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
        const test = new MessageEmbed()
        .setTitle('test')

       const message = interaction.channel.send({ embeds: [test], fetchReply: true})
       message.react('✅');
    }