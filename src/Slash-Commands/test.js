const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');


module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')

module.exports.run = async (client, interaction) => {
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })
        collector.on("collect", async (collected) => {
            const value = collected.values[0]
        })

}