const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite Command')

module.exports.run = (client, interaction) => {
    interaction.channel.send('You can invite the bot to you server from the following link https://discord.com/oauth2/authorize?client_id=799231222303293461&scope=bot%20applications.commands&permissions=2147486783')
}