const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');
const configg = require('../../slappey.json')
module.exports.data = new SlashCommandBuilder()
    .setName('servers')
    .setDescription('servers Command')


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

        const test = await guild.invites.fetch()


        interaction.channel.send(`${guild.name} | ${guild.id} | ${guild.memberCount} members | ${guild.id, test.map((invite) => [invite.code])}`)
    })

}