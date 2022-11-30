const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');
const GiveawayFile = require('../schemas/giveaways-user-data')
const { BotOwnerID } = require('../../slappey.json')


module.exports.data = new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('giveaway Command');

module.exports.run = async (client, interaction) => {
    const Owner = new MessageEmbed()
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
            const usermodal = new Modal()
                .setTitle('Giveaway')
                .setCustomId("giveaway")
                .addComponents(
                    new MessageActionRow({
                        components: [
                            new TextInputComponent()
                                .setCustomId("Email")
                                .setPlaceholder("Type it in here")
                                .setLabel("Please enter your email.")
                                .setStyle('SHORT')
                        ]
                    }),
                    new MessageActionRow({
                        components: [
                            new TextInputComponent()
                                .setCustomId("Why")
                                .setPlaceholder("Type it in here")
                                .setLabel("Why do you want to win this giveaway?")
                                .setStyle('PARAGRAPH')
                        ]
                    }),
                )
          //  await interaction.showModal(usermodal)
        }
    })
}