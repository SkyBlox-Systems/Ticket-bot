const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');
timestamp.round = true
const { sendMail } = require('send-email-api')

const { TranslateID } = require('../../slappey.json')
const config = require('../../slappey.json')
const giveawaything = require('../schemas/christmas-giveaway')
const { ModalBuilder, TextInputBuilder, ButtonStyle } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
    .setName('christmas-giveaway')
    .setDescription('Giveaway')
    .addStringOption(option =>
        option.setName('email')
          .setDescription('Attach your email.')
          .setRequired(true))

module.exports.run = async (client, interaction) => {

    const MSG = interaction.options.getString('email')


    giveawaything.findOne({ id: interaction.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            interaction.reply('Data already exist on the user.')
        } else {
            data = new giveawaything({
                id: interaction.user.id,
                ServerID: interaction.guild.id,
                Email: MSG
            })
            data.save()
            interaction.reply('You have entered into the giveaway.')

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
                from: config.EmailUsername,
            }
    
            const emailData = {
                to: MSG,
                subject: 'Ticket Bot Giveaway',
                text: `Hello ${interaction.username}, \n Thank you for entering into the Ticket Bot Christmas giveaway. You are receiving this email just to confirm that you have entered. \n SkyBlox Systems LTD`,
                
            }

            const emailData2 = {
                to: 'richard1234@skybloxsystems.com',
                subject: 'Ticket Bot Giveaway - User',
                text: `We just want to let you know that the following user ${interaction.user.tag} has entered into the giveaway.`,
                
            }
    
            sendMail(emailData, emailConfig)
            sendMail(emailData2, emailConfig)
        }
     })
}