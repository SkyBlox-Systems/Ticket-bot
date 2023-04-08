const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, ModalBuilder, TextInputBuilder } = require('discord.js');
const GiveawayFile = require('../schemas/giveaways-user-data')
const { BotOwnerID } = require('../../slappey.json')


module.exports.data = new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('giveaway Command');

module.exports.run = async (client, interaction) => {
    const Owner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to bot owner only. Please wait until the release.')
        .setColor('#f9f9fa')


    if (interaction.user.id != BotOwnerID)
        return interaction.reply({ embeds: [Owner] });

    GiveawayFile.findOne({ UserID: interaction.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.Usage === 1) {
                interaction.reply('You have already entered and used all of your usage.')
            }
        } else {
            const userModalBuilder = new ModalBuilderBuilder()
                .setTitle('Giveaway')
                .setCustomId("giveaway")
                .addComponents(
                    new ActionRowBuilder({
                        components: [
                            new TextInputBuilder()
                                .setCustomId("Email")
                                .setPlaceholder("Type it in here")
                                .setLabel("Please enter your email.")
                                .setStyle(ButtonStyle.Primary)
                        ]
                    }),
                    new ActionRowBuilder({
                        components: [
                            new TextInputBuilder()
                                .setCustomId("Why")
                                .setPlaceholder("Type it in here")
                                .setLabel("Why do you want to win this giveaway?")
                                .setStyle('PARAGRAPH')
                        ]
                    }),
                )
          //  await interaction.showModal(userModalBuilder)
        }
    })
}