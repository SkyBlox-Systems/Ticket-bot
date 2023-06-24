const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const blacklist = require('../schemas/Blacklist-schema')
const { Message } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const timestamp = require('unix-timestamp');
timestamp.round = true

module.exports.data = new SlashCommandBuilder()
    .setName('blacklist')
    .setDescription('blacklist Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('reason for blacklist')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('id')
            .setDescription('User ID to blacklist')
            .setRequired(true));


module.exports.run = (client, interaction) => {
    const reasonsend = interaction.options.getString('reason')
    const idsend = interaction.options.getString('id')
    const userr = client.users.cache.get(idsend)

    if (interaction.user.id !== '406164395643633665') {
        const NotOwner = new EmbedBuilder()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Owner')
            .setDescription('You cannot use the following the command: `/blacklist`. The command is only available for the owner.')
        return interaction.reply({ embeds: [NotOwner] })
    }



    blacklist.findOne({ UserID: idsend }, async (err, data) => {
        if (err) throw err;
        if (data) {

            const Already = new EmbedBuilder()
                .setTitle('Blacklist')
                .setDescription(`**${userr.username}** has already been blacklisted! Reason is provided below`)
                .addFields([
                    { name: 'Reason', value: `${data.Reason}` },
                    { name: 'Time', value: `<t:${timestamp.now()}:f>` },
                    { name: 'Admin', value: `${interaction.user.username}` }
                ])
                .setColor('#f6f7f8')


            interaction.reply({ embeds: [Already] })
        } else {
            data = new blacklist({
                UserID: idsend,
                Reason: reasonsend,
                Time: timestamp.now(),
                Admin: interaction.user.username,
            })
            data.save()
                .catch(err => console.log(err))

            const Added = new EmbedBuilder()
                .setTitle('Blacklist')
                .setDescription(`${userr.username} has been added to blacklist.`)
                .addFields([
                    { name: 'Reason', value: `${reasonsend}` },
                    { name: 'Time', value: `<t:${timestamp.now()}:f>` },
                    { name: 'Admin', value: `${interaction.user.username}` }
                ])

            const dmsend = client.users.cache.get(idsend)
            const DmUserss = new EmbedBuilder()
                .setTitle('Blacklist')
                .setDescription(`You have been blacklisted from using Ticket Bot.`)
                .addFields([
                    { name: 'Reason', value: `${reasonsend}` },
                    { name: 'Time', value: `<t:${timestamp.now()}:f>` },
                    { name: 'Admin', value: `${interaction.user.username}` }
                ])
                .setFooter({ text: 'Please email support support@skybloxsystems.com' })

            interaction.reply({ embeds: [Added] })
           await dmsend.send({ embeds: [DmUserss] })
        }

    })

}