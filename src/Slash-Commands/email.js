const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs')
const { sendMail } = require('send-email-api')
const { EmbedBuilder } = require('discord.js');
const config = require('../../slappey.json')



module.exports.data = new SlashCommandBuilder()
    .setName('email')
    .setDescription('Email a user')
    .addStringOption(NotNeeded =>
        NotNeeded.setName('email')
            .setDescription('The email you was going to send')
            .setRequired(true))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('title')
            .setDescription('The title of the email')
            .setRequired(true))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('message')
            .setDescription('The message of the email')
            .setRequired(true));


module.exports.run = (client, interaction) => {
    const ServerOwner = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
    .setColor('#f9f9fa')


    if (interaction.user.id != interaction.guild.ownerId)
    return interaction.reply({ embeds: [ServerOwner] });
        const emails = interaction.options.getString('email');
        const titles = interaction.options.getString('title');
        const messagess = interaction.options.getString('message');

        const emailConfig = {
            options: {
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: config.EmailUsername,
                    pass: config.EmailPassword,
                }
            },
            from: 'no-reply@skybloxsystems.com',
        }

        const emailData = {
            to: [emails],
            subject: titles,
            text: messagess,
        }

        sendMail(emailData, emailConfig)
        interaction.reply('Email sent')
    }

