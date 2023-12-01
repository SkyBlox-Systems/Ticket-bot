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
const { TranslateID } = require('../../slappey.json')
const config = require('../../slappey.json')
const giveawaything = require('../schemas/christmas-giveaway')
const { ModalBuilder, TextInputBuilder, ButtonStyle } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
    .setName('christmas-giveaway')
    .setDescription('Giveaway')

module.exports.run = async (client, interaction) => {
        const userModalBuilder = new ModalBuilder()
            .setTitle('Christmas Giveaway')
            .setCustomId("christmasgiveaway")
            .addComponents(
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("emailaddress")
                            .setPlaceholder("Type it in here")
                            .setLabel("Put your email address in here you so we can contact you if you won.")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
            )
       await interaction.showModal(userModalBuilder)
}