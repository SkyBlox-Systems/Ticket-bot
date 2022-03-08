const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban Command')
    .addStringOption(option =>
        option.setName('userid')
            .setDescription('User ID')
            .setRequired(true))
    .addStringOption(option2 =>
        option2.setName('days')
            .setDescription('How many days banned (Must be a number)')
            .setRequired(true))
    .addStringOption(option3 =>
        option3.setName('reason')
            .setDescription('The reason for the ban')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const usertoban = interaction.options.getString('userid');
    const daystoban = interaction.options.getString('days');
    const reasontoban = interaction.options.getString('reason');

    if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply('You can\'t use that!')
    if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply('I don\'t have the right permissions.')

    const member =  interaction.guild.members.cache.get(usertoban);


    if (!member) return interaction.reply('Can\'t seem to find this user. Sorry \'bout that :/');
    if (!member.bannable) return interaction.reply('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine');

    if (member.id === interaction.user.id) return interaction.reply('Bruh, you can\'t ban yourself!');


    member.ban({ days: daystoban, reason: reasontoban })
        .catch(err => {
            if (err) return interaction.reply('Something went wrong')
        })

    const banembed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', `${member}`)
        .addField('Banned by', `${interaction.user}`)
        .addField('Reason', `${reasontoban}`)
        .addField('Ban lengh', `${daystoban}`)
        .setTimestamp()

    interaction.reply({ embeds: [banembed] });
}