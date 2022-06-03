const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')

module.exports.data = new SlashCommandBuilder()
    .setName('eval')
    .setDescription('eval Command')
    .addStringOption(option =>
        option.setName('command')
            .setDescription('Add a command')
            .setRequired(true));

module.exports.run = async (client, interaction) => {
    const ServerOwner = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });

    /* Join all arguments back to string */
    const IdString = interaction.options.getString('command');

    const content = IdString
    /* Promisify the eval */
    let output = await new Promise((resolve, reject) => resolve(eval(content)));

    /* If output is not a string */
    if (typeof output !== "string") {
        /* convert it to string */
        output = require("util").inspect(output, { depth: 0 });
    }

    /* Send the output */
    interaction.reply('Command sent')
}
