const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fs = require('fs')
const { sendMail } = require('send-email-api')
const { EmbedBuilder } = require('discord.js');



module.exports.data = new SlashCommandBuilder()
    .setName('report-test')
    .setDescription('Report a issue with the new Discord.js 14 upgrade')
    .addStringOption(NotNeeded =>
        NotNeeded.setName('issue')
            .setDescription('What is the issue?')
            .setRequired(true));


module.exports.run = (client, interaction) => {

        const messagess = interaction.options.getString('issue');

        const emailConfig = {
            options: {
                host: 'smtp.ionos.co.uk',
                port: 587,
                secure: false,
                auth: {
                    user: 'no-reply@skybloxsystems.com',
                    pass: '!3Y&R3Yf##&ddAH4edRbGMAm&@Yj$X5A9$ABLfn6',
                }
            },
            from: 'no-reply@skybloxsystems.com',
        }

        const emailData = {
            to: "admin@skybloxsystems.com",
            subject: "Report Discord.js 14 bug",
            text: messagess,
        }

        sendMail(emailData, emailConfig)
        interaction.reply('Email sent')
    }

