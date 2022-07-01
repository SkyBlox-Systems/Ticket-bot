const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainFile = require('../../slappey.json')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js');


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
                name: 'support (Disabled in v4.0 testing)',
                value: 'support'
            }))

module.exports.run = async (client, interaction) => {

    const categorys = interaction.options.getString('category')

    const TicketChannelIdChannel = await interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'feedback' && ch.type == 'GUILD_TEXT');

    if (categorys === 'user') {
        const usermodal = new Modal()
            .setTitle('User Feedback')
            .setCustomId("user")
            .addComponents(
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("userFeedbackID")
                            .setPlaceholder("Type it in here")
                            .setLabel("User ID you would like to feedback on")
                            .setStyle('SHORT')
                    ]
                }),
                new MessageActionRow({
                    components: [
                        new TextInputComponent()
                            .setCustomId("userMessage")
                            .setPlaceholder("Type it in here")
                            .setLabel("Please type the feedback on that user")
                            .setStyle('PARAGRAPH')
                    ]
                }),
            )
        await interaction.showModal(usermodal)

    }

    if (categorys === 'support') {
        interaction.reply('Disabled in v4.0 testing')
        // const usermodal = new Modal()
        //     .setTitle('Support Feedback')
        //     .setCustomId("support")
        //     .addComponents(
        //         new MessageActionRow({
        //             components: [
        //                 new TextInputComponent()
        //                     .setCustomId("supportMessage")
        //                     .setPlaceholder("Type it in here")
        //                     .setLabel("Please type the feedback on that support")
        //                     .setStyle('PARAGRAPH')
        //             ]
        //         }),
        //     )
        // await interaction.showModal(usermodal)
    }
}