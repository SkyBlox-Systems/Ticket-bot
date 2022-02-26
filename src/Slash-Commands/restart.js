const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('restart')
    .setDescription('restart Command')

    module.exports.run = (client, interaction) => {
        if (interaction.user.id !== '406164395643633665') {
            const NotOwner = new MessageEmbed()
              .setColor('RANDOM')
              .setTimestamp()
              .setTitle('Help')
              .setDescription('You cannot use the following the command: `!restart`. The command is only available for the owner.')
            return interaction.reply({ embeds: [NotOwner]})
          }
          const send = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Restart')
            .setDescription('We are restarting the bot. Please wait while we get everything working.')
            .setTimestamp()
           interaction.reply({ embeds: [send]})
           setTimeout(() => {
            process.exit();
               
           }, 2000);

    }