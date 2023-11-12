const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainFile = require('../../slappey.json')
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, ButtonStyle } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('feedback Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Which options you can use to give feedback')
            .setRequired(true)
            .addChoices({
                name: 'user',
                value: 'user'
            })
            .addChoices({
                name: 'support',
                value: 'support'
            }))

module.exports.run = async (client, interaction) => {

    const categorys = interaction.options.getString('category')

    const TicketChannelIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'feedback' && ch.type == 'GUILD_TEXT');

    if (categorys === 'user') {
        const userModalBuilder = new ModalBuilder()
            .setTitle('User Feedback')
            .setCustomId("user")
            .addComponents(
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("userFeedbackID")
                            .setPlaceholder("Type it in here")
                            .setLabel("User ID you would like to feedback on")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("userMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type the feedback on that user")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
            )
        await interaction.showModal(userModalBuilder)

    }

    if (categorys === 'support') {

        const userModalBuilder = new ModalBuilder()
            .setTitle('Customer Support')
            .setCustomId("support")
            .addComponents(
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("supportMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type the feedback on that support")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
                new ActionRowBuilder({
                    components: [
                        new TextInputBuilder()
                            .setCustomId("email")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type your email out. This will allow us to email you.")
                            .setStyle(ButtonStyle.Primary)
                    ]
                }),
            )
        await interaction.showModal(userModalBuilder)


    }
}