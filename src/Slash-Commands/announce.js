const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");


module.exports.data = new SlashCommandBuilder()
    .setName('announce')
    .setDescription('announce Command')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('Channel ID')
            .setRequired(true))
    .addStringOption(option2 =>
        option2.setName('message')
            .setDescription('Provided message')
            .setRequired(true));

module.exports.run = (client, interaction) => {

    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
        const NoPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
            return interaction.reply({ embeds: [NoPerms] })
      }

    const idsend = interaction.options.getString('id')
    const messagesend = interaction.options.getString('message')
    
    let rChannel = interaction.guild.channels.cache.get(idsend);
    if (!rChannel)
    return interaction.reply({content: 'You did not specify your channel to send the announcement too!'});
    console.log(rChannel);
    
    const _ = new MessageEmbed()
      .setTitle(`New announcement!`)
      .setDescription(`${messagesend}`)
      .setFooter(`Announced by ${interaction.user.username}`)
      .setColor("RANDOM");
    interaction.reply({ content: `The announcement has been sent to the channel <#${idsend}>`})
    rChannel.send({ embeds: [_]});

}