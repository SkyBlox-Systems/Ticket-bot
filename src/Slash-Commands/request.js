const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const axios = require('axios');
const { sendMail } = require('send-email-api')


module.exports.data = new SlashCommandBuilder()
    .setName('request')
    .setDescription('request Command')
    .addStringOption(option => 
        option.setName('category')
        .setDescription('Select which option you would like')
        .addChoices({
            name: 'Guild',
            value: 'guild' 
        })
        .setRequired(true))
    .addStringOption(option => 
        option.setName('email')
        .setDescription('Please type out the email you would like us send the data to')
        .setRequired(true))

module.exports.run = async (client, interaction) => {
    const emails = interaction.options.getString('email');
    const values = interaction.options.getString('category');

    const ServerOwner = new MessageEmbed()
    .setTitle('Error')
    .setDescription('This command is restricted to guild owner only. Please do not try and use this command because you will not get anywhere.')
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });

    if (values === 'guild') {

        const emailConfig = {
            options: {
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'no-reply@skybloxsystems.com',
                    pass: 'richard1234YT',
                }
            },
            from: 'no-reply@skybloxsystems.com',
        }

        const emailData = {
            to: 'admin@skybloxsystems.com',
            subject: 'Request data',
            text: `This guild ${interaction.guildId} // ${interaction.guild.name} has requested guild data. please send the email back to the following email ${emails}. \n your sincerely, \n Ticket Bot Automatic email system`,
        }

        sendMail(emailData, emailConfig)

       const emailsent = new MessageEmbed()
       .setTitle('Request sent')
       .setDescription('We have sent the request to the Admins of SkyBlox Systems. You should get a email within 5 working days.')
        interaction.reply({ embeds: [emailsent], ephemeral: true})
    }

}