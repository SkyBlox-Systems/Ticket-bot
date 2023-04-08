const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')


module.exports.data = new SlashCommandBuilder()
    .setName('reaction')
    .setDescription('ticket reaction Command')
    .addStringOption(option =>
        option.setName('channel')
            .setDescription('Provide a channel ID')
            .setRequired(true))

module.exports.run = async (client, interaction) => {
    const ServerOwner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

    const ButtonList = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('create')
                .setLabel('Create')
                .setStyle(ButtonStyle.Success)
                .setEmoji('🎫'),
            new ButtonBuilder()
                .setCustomId('delete')
                .setLabel('Delete')
                .setStyle(ButtonStyle.Danger),
        );
    const Main = interaction.options.getString('channel')

    if (interaction.user.id != interaction.guild.ownerId)
        return collected.reply({ embeds: [ServerOwner] });

    const MainEmbed = new EmbedBuilder()
        .setTitle('Create ticket 🎫')
        .setDescription('Please react if you want to create a ticket')

    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.UseTicketReactions === 'Yes') {
                interaction.reply('Ticket reactions setup is done')
                const GetchannelID = interaction.guild.channels.cache.get(`${Main}`);
                GetchannelID.send({ embeds: [MainEmbed], components: [ButtonList] }).then((m) => {
                    m.pin()
                })

            } else {
                if (data.UseTicketReactions === 'No') {
                    interaction.reply('This command can not be used as ticket reactions is not enabled within this guild')
                }
            }
        }
    })
}