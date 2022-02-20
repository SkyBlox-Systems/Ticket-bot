const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('remove Command')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('User ID you want to remove.')
            .setRequired(true));

module.exports.run = (client, interaction) => {

    const getid = interaction.options.getString('id')

    if (err01) throw err01;
    if (data01) {
        const perms = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You don't have the following permissions: Manage_message.`)

        const invaild = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You didn't mention a user, or you gave an invaild id.`)

        const NoMessage = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You did not specify your message`)

        const Added = new MessageEmbed()
            .setColor('GREEN')
            .setTimestamp()
            .setTitle('Removed')
            .setDescription(`<@${interaction.author.id}> have removed you to the following ticket <#${interaction.channel.id}>`)

        const AdminPerms = new MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle('ERROR')
            .setDescription('The person you tried to remove is the creator of the ticket or have customer service perms.')

        if (!interaction.channel.name.startsWith("ticket-" || "staff-")) return interaction.reply("This is not a valid ticket")
        if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
            return interaction.reply({ embeds: [perms] });
        let user =
            interaction.mentions.members.first() ||
            interaction.guild.members.cache.get(args[0]);
        if (!user)
            return interaction.channel.send(invaild);
        user.user
        if (user.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [AdminPerms] })
            .send(Added)
        message.channel.permissionOverwrites.edit(user, {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
            ATTATCH_FILES: false,
        })
        const Logs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")
            .then(() => Logs.send(`Remove ${user.user.tag} to the following ticket <@${interaction.channel.id}>`))
            .then(() => interaction.reply(`Removed ${user.user.tag} from this ticket!`));
    } else {
        const NoData = new MessageEmbed()
            .setTitle('Not updated')
            .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        interaction.reply({ embeds: [NoData] })
    }

}