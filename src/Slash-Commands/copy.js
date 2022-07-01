const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')


module.exports.data = new SlashCommandBuilder()
    .setName('copy')
    .setDescription('copy Command')

module.exports.run = async (client, interaction) => {
    const ServerOwner = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Copy this guild data',
                        description: 'Copy this guild data to another server',
                        value: 'first_option',
                    },
                    {
                        label: 'Copy another guild data',
                        description: 'Can copy another guild you own',
                        value: 'second_option',
                    },
                ]),
        );

    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });
    await interaction.reply({ content: 'Copy Data', components: [row], ephemeral: true });

    const collector = interaction.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU"
    })
    collector.on("collect", async (collected) => {
        const value = collected.values[0]

        if (value === 'first_option') {
            collected.reply('First option selected')
        }
        if (value === 'second_option') {
            collected.reply('Second option sellected')
        }
    })

}