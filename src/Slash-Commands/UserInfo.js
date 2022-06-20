const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('User Info Command')

module.exports.run = (client, interaction) => {
    interaction.guild.members.fetch(interaction.user.id).then(user => {
        console.log(user)

        let status;
        switch (user.presence) {
            case "online":
                status = "<:online:729181184193462285> online";
                break;
            case "dnd":
                status = "<:dnd:729181212530442311> dnd";
                break;
            case "idle":
                status = "<:idle:729181121933475931> idle";
                break;
            case "offline":
                status = "<:offline:729181162182017051> offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${interaction.user.username} stats`)
            .setColor(`#f3f3f3`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addField('Name: ', `${interaction.user.username}`, true)
            .addField('#️⃣ Discriminator: ', `#${interaction.user.discriminator}`, true)
            .addField('🆔 ID: ', `${interaction.user.id}`, true)
            .addField('Current Status: ', `Broken right now`, true)
            .addField('Avater Link', `[Click Here](${interaction.user.displayAvatarURL()})`)
            .addField('Creation Date: ', `${interaction.guild.createdAt.toLocaleDateString("en-us")}`, true)
            .addField('Joined Date: ', `${interaction.guild.joinedAt.toLocaleDateString("en-us")}`, true)
            .addField('User Roles: ', `${user.roles.cache.map(role => role.toString()).join(" ,")}`, true)
                // {
                //     name: "Activity: ",
                //     value: interaction.user.presence.activities[0] ? interaction.user.presence.activities[0].name : `User isn't playing a game!`,
                //     inline: true
                // },
        interaction.reply({ embeds: [embed] })
    })

}