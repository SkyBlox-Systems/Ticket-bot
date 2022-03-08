const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('User Info Command')

    module.exports.run = (client, interaction) => {
        let user =  interaction.member

    let status;
    switch (user.presence.status) {
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
        .setTitle(`${user.user.username} stats`)
        .setColor(`#f3f3f3`)
        .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
        .addFields(
            {
                name: "Name: ",
                value: user.user.username,
                inline: true
            },
            {
                name: "#️⃣ Discriminator: ",
                value: `#${user.user.discriminator}`,
                inline: true
            },
            {
                name: "🆔 ID: ",
                value: user.user.id,
            },
            {
                name: "Current Status: ",
                value: status,
                inline: true
            },
            {
                name: "Activity: ",
                value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                inline: true
            },
            {
                name: 'Avatar link: ',
                value: `[Click Here](${user.user.displayAvatarURL()})`
            },
            {
                name: 'Creation Date: ',
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'Joined Date: ',
                value: user.joinedAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'User Roles: ',
                value: user.roles.cache.map(role => role.toString()).join(" ,"),
                inline: true
            }
        )

     interaction.reply({ embeds: [embed]})
    }