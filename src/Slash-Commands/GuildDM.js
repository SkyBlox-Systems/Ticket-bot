const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const configg = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('guild-dm')
    .setDescription('guild dm Command')
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Require the message you want to send')
            .setRequired(true));


module.exports.run = (client, interaction) => {

    if (interaction.user.id !== configg.BotOwnerID) {
        const NotOwner = new EmbedBuilder()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `!servers`. The command is only available for the owner.')
        return interaction.reply(NotOwner)
    }
    interaction.reply('Server')
    client.guilds.cache.forEach(async (guild) => {

        const invites = []

        const messageforuser =  interaction.options.getString('message');

        const test = await guild.invites.fetch()

        const dmowner = client.users.cache.get(guild.ownerId)

        const DM = new EmbedBuilder()
        .setTitle('New DM')
        .setDescription('You have received a DM from the bot owner. If this message duplicates, it means you have more than 1 guild with our bot in. The message what the owner provided is below')
        .addFields([
            {name: 'Message', value: `${messageforuser}`}
        ])

        dmowner.send({ embeds: [DM]})
    })

}