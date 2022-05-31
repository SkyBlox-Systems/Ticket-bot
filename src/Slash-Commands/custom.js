const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainFile = require('../../slappey.json')
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
    .setName('custom')
    .setDescription('custom Command');

module.exports.run = (client, interaction) => {
    const ServerOwner = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.PaidGuild === 'Yes') {
                const MainEmbed = new MessageEmbed()
                .setTitle('Custom')
                .setDescription('This feature is current disabled due to some hosting API issue. If u want to invite the bot ready, the bot link is provided below')
                .addField('Bot Invite', '[Invite](https://discord.com/oauth2/authorize?client_id=979435325153767435&scope=bot%20applications.commands&permissions=2147486783)')

                interaction.reply({ embeds: [MainEmbed]})

            } else {
                if (data.PaidGuild === 'No') {
                    interaction.reply('This is not a premium server. This command can not be used.')
                }
            }
        }
    })
}