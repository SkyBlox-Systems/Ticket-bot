const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { EmbedBuilder, PermissionsBitField  } = require('discord.js');

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

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply('You can\'t use that!')

    const member =  interaction.guild.members.cache.get(usertokick);


    if (!member) return interaction.reply('Can\'t seem to find this user. Sorry \'bout that :/');
    if (!member.kickable) return interaction.reply('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');

    if (member.id === interaction.user.id) return interaction.reply('Bruh, you can\'t kick yourself!');



    member.kick(reasontokick)
        .catch(err => {
            if (err) return interaction.reply('Something went wrong')
        })

    const kickembed = new Discord.EmbedBuilder()
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addFields([
            {name: 'User Kicked', value: `${member}`},
            {name: 'Kicked by', value: `${interaction.user}`},
            {name: 'Reason', value: `${reasontokick}`}
        ])
        .setTimestamp()

    interaction.reply({ embeds: [kickembed] });
}