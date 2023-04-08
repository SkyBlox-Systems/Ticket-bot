const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

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

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username} stats`)
            .setColor(`#f3f3f3`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields([
                {name: 'Name:', value: `${interaction.user.username}`, inline: true},
                {name: '#️⃣ Discriminator:', value: `#${interaction.user.discriminator}`, inline: true},
                {name: '🆔 ID:', value: `${interaction.user.id}`, inline: true},
                {name: 'Current Status:', value: `Broken right now`, inline: true},
                {name: 'Avater Link:', value: `[Click Here](${interaction.user.displayAvatarURL()})`},
                {name: 'Creation Date:', value: `${interaction.guild.createdAt.toLocaleDateString("en-us")}`, inline: true},
                {name: 'Joined Date:', value: `${interaction.guild.joinedAt.toLocaleDateString("en-us")}`, inline: true},
                {name: 'User Roles:', value: `${user.roles.cache.map(role => role.toString()).join(" ,")}`, inline: true}
            ])
                // {
                //     name: "Activity: ",
                //     value: interaction.user.presence.activities[0] ? interaction.user.presence.activities[0].name : `User isn't playing a game!`,
                //     inline: true
                // },
        interaction.reply({ embeds: [embed] })
    })

}