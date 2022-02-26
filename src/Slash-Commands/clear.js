const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('clear Command')
    .addStringOption(option =>
        option.setName('amount')
            .setDescription('Amount of messages you want to delete. (under 100)')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        const NoPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
            return interaction.reply({ embeds: [NoPerms] })
      }
    const amount = interaction.options.getString('amount')


    if (!amount) return interaction.reply('please provide an amount of messages for me to delete')

    if (amount > 100) return interaction.reply(`you cannot clear more than 100 messages at once`)

    if (amount < 1) return interaction.reply(`you need to delete at least one message`)

     interaction.channel.messages.fetch({ limit: amount }).then(messages => {
        interaction.channel.bulkDelete(messages
        )
    });


    interaction.reply('Success!')


}