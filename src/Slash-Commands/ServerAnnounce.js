const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, Channel } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('serverannounce')
    .setDescription('Server Announce Command')
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Add a message to send')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const servermessage = interaction.options.getString('message')


    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
        if (err01) throw err01;
        if (data01) {

            const ServerOwner = new EmbedBuilder()
                .setTitle('Error')
                .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
                .setColor('#f9f9fa')


            if (interaction.user.id != interaction.guild.ownerId)
                return interaction.reply({ embeds: [ServerOwner] });



            const Dms = new EmbedBuilder()
                .setColor('#f5f5f5')
                .setTimestamp()
                .setTitle(`Server Announcement!`)
                .addFields([
                    {name: 'Server', value: `${interaction.guild.name}`, inline: true},
                    {name: 'Announcer', value: `${interaction.user.username}`, inline: true},
                    {name: 'Message', value: `${servermessage}`}
                ])
                .setFooter({ text: `${interaction.user.username} | ${interaction.user.id}`, iconURL: `${interaction.user.avatarURL()}`})


            const sent = new EmbedBuilder()
                .setColor('#f5f5f5')
                .setTimestamp()
                .setTitle('Sent!')
                .setDescription('Message has been sent')




            interaction.reply({ embeds: [sent] })
            interaction.guild.members.cache.forEach(member => {
                member.send({ embeds: [Dms] }).catch(e => console.error(`Couldn't DM member ${member.user.tag}`));


            }
            )
        }
    })
}