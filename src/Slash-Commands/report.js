const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const mongoose = require('mongoose');
const { EmbedBuilder, Guild, MessageCollector, Collector } = require('discord.js');
var today = new Date();
var dd = String(today.getDate());
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { ModalBuilder, TextInputBuilder, ButtonStyle } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
    .setName('report')
    .setDescription('report Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoices({
                name: 'user',
                value: 'user'
            })
            .addChoices({
                name: 'bug',
                value: 'bug'
            }));

module.exports.run = async (client, interaction) => {
    const categorys = interaction.options.getString('category')
    if (categorys === 'user') {
        const userModalBuilder = new ModalBuilder()
            .setTitle('Report user')
            .setCustomId("reportuser")
            .addComponents(
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportUserID")
                            .setPlaceholder("Type it in here")
                            .setLabel("Put user ID in here you would like to report.")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportUserMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type out what the user has done.")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportUserImages")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please provide discord URL images.")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
            )
       await interaction.showModal(userModalBuilder)
    }
    if (categorys === 'bug') {
        const userModalBuilder = new ModalBuilderBuilder()
            .setTitle('Report bug')
            .setCustomId("reportbug")
            .addComponents(
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportBugCommand")
                            .setPlaceholder("Type it in here")
                            .setLabel("What command is it happening in?")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportCommandMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type out what is happening.")
                            .setStyle('PARAGRAPH')
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("reportCommandImages")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please provide discord URL images.")
                            .setStyle('PARAGRAPH')
                    ]
                }),
            )
       await interaction.showModal(usermodal)
    }
}