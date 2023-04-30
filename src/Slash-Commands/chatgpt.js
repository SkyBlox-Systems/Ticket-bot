const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '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',
})


module.exports.data = new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('AI')
    .addStringOption(option =>
        option.setName('question')
            .setDescription('Ask chatgpt a question')
            .setRequired(true));

module.exports.run = async (client, interaction) => {

    await interaction.deferReply();

    const questionss = interaction.options.getString('question');



    try {

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 2048,
            temperature: 0.5,
            prompt: questionss
        })

        const embed = new EmbedBuilder()
        .setDescription(`\`\`\`${completion.data.choices[0].text}\`\`\``)

         interaction.editReply({ embeds: [embed] })
    } catch(e) {
        return;
    }
    
}