const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('fix')
    .setDescription('Fix Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoice('Ticket Tracker ', 'tracker'))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('amount')
            .setDescription('Set the right number to fix it in the database. (Tracker only)')
            .setRequired(false))
    .addStringOption(NotNeeded2 =>
        NotNeeded2.setName('id')
            .setDescription('Set the right id to fix it in the database.')
            .setRequired(false)
    );

module.exports.run = (client, interaction) => {
    const categorystring = interaction.options.getString('category');
    const optionalstring = interaction.options.getString('amount');

    if (categorystring === 'tracker') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: optionalstring }, async (err2, data2) => {
                    if (err2) throw err;
                    if (data2) {
                        const updated = new MessageEmbed()
                        .setTitle('Updated')
                        .setDescription(`We have changed ticket count from **${data.TicketNumber}** to **${optionalstring}**.`)

                        interaction.reply({ embeds: [updated]})
                    }
                })
            }
        })

    }

}