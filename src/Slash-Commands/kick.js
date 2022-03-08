const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick Command')
    .addStringOption(option =>
        option.setName('userid')
            .setDescription('User ID')
            .setRequired(true))
    .addStringOption(option2 =>
        option2.setName('reason')
            .setDescription('The reason for the kick')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const usertokick = interaction.options.getString('userid');
    const reasontokick = interaction.options.getString('reason');

    if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply('You can\'t use that!')
    if (!interaction.guild.me.permissions.has("KICK_MEMBERS")) return interaction.reply('I don\'t have the right permissions.')

    const member =  interaction.guild.members.cache.get(usertokick);


    if (!member) return interaction.reply('Can\'t seem to find this user. Sorry \'bout that :/');
    if (!member.kickable) return interaction.reply('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');

    if (member.id === interaction.user.id) return interaction.reply('Bruh, you can\'t kick yourself!');



    member.kick(reasontokick)
        .catch(err => {
            if (err) return interaction.reply('Something went wrong')
        })

    const kickembed = new Discord.MessageEmbed()
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', `${member}`)
        .addField('Kicked by', `${interaction.user}`)
        .addField('Reason', `${reasontokick}`)
        .setTimestamp()

    interaction.reply({ embeds: [kickembed] });
}