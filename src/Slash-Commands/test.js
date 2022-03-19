const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')

module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Add a reason to ticket')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
       ticketclaim.findOne({ id: interaction.user.id }, async (err, data) => {
           if (err) throw err;
           if (data) {
               interaction.reply('Data found')
           } else {
               interaction.reply('No data found')
           }
       })
    //     const test = new MessageEmbed()
    //     .setTitle('test')

    //    const message = interaction.channel.send({ embeds: [test], fetchReply: true})
    //    message.react('✅');
    }