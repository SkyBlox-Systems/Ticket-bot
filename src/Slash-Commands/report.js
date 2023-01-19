const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const mongoose = require('mongoose');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
var today = new Date();
var dd = String(today.getDate());
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent } = require('discord.js');


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
        const usermodal = new Modal()
            .setTitle('Report user')
            .setCustomId("reportuser")
            .addComponents(
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("reportUserID")
                            .setPlaceholder("Type it in here")
                            .setLabel("Put user ID in here you would like to report.")
                            .setStyle('SHORT')
                    ]
                }),
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("reportUserMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type out what the user has done.")
                            .setStyle('PARAGRAPH')
                    ]
                }),
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("reportUserImages")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please provide discord URL images.")
                            .setStyle('PARAGRAPH')
                    ]
                }),
            )
       await interaction.showModal(usermodal)
    }
    if (categorys === 'bug') {
        const usermodal = new Modal()
            .setTitle('Report bug')
            .setCustomId("reportbug")
            .addComponents(
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("reportBugCommand")
                            .setPlaceholder("Type it in here")
                            .setLabel("What command is it happening in?")
                            .setStyle('SHORT')
                    ]
                }),
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("reportCommandMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type out what is happening.")
                            .setStyle('PARAGRAPH')
                    ]
                }),
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
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