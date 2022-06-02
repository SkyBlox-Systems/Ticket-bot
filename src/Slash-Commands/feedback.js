const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainFile = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('feedback Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Which options you can use to give feedback')
            .setRequired(true)
            .addChoice('user', 'user')
            .addChoice('support', 'support'))
    .addStringOption(option =>
        option.setName('id')
            .setDescription('UserID (Only used for feedback for)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('message')
            .setDescription('What is the reason of the feedback?'));

module.exports.run = async (client, interaction) => {

    const userid = interaction.options.getString('id')
    const MSG = interaction.options.getString('message')
    const categorys = interaction.options.getString('category')

    const TicketChannelIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'feedback' && ch.type == 'GUILD_TEXT');

    if (categorys === 'user') {
        if (TicketChannelIdChannel === undefined) {
            interaction.reply('There is no feedback channel.')

        } else {
            interaction.reply('We have sent your reply to the admins.')

            const newuserfeedback = new MessageEmbed()
                .setTitle('New feedback!')
                .setDescription(`${interaction.user.id} has sent a user feedback message. Below is the message`)
                .addField('User', `${userid}`)
                .addField('Message', `${MSG}`)

            TicketChannelIdChannel.send({ embeds: [newuserfeedback] })
        }


    }

    if (categorys === 'support') {
        if (TicketChannelIdChannel === undefined) {
            interaction.reply('There is no feedback channel.')
        } else {
            interaction.reply('We have sent your feedback to the admins.')

            const newsupportfeedback = new MessageEmbed()
            .setTitle('New feedback!')
            .setDescription(`${interaction.user.id} has sent a support feedback message. Below is the message`)
            .addField('Message', `${MSG}`)

            TicketChannelIdChannel.send({ embeds: [newsupportfeedback]})
        }
    }
}