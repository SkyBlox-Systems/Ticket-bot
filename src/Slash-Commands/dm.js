const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainFile = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('dm')
    .setDescription('dm Command')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('Type in the user of the ID')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('message')
        .setDescription('Type out the message you want to send')
        .setRequired(true));

module.exports.run = (client, interaction) => {
    const IdString = interaction.options.getString('id');
    const MessageString = interaction.options.getString('message')

    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        const NoPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
        return interaction.reply({ embeds: [NoPerms] })
    }

    const dmsend = client.users.cache.get(IdString)
    const messageToSend = new MessageEmbed()
    .setTitle('New DM!')
    .setDescription(`You have received an message from this server **${interaction.guild.name}**.`)
    .addField('User who sent it', `${interaction.user.tag}`)
    .addField('Message', `${MessageString}`)

    dmsend.send({ embeds: [messageToSend]})
    interaction.reply(`Message sent to user **${IdString}**`)
}