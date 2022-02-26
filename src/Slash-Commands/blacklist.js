const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

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

    if (message.author.id !== '406164395643633665') {
        const NotOwner = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `!blacklist`. The command is only available for the owner.')
        return interaction.reply({ embeds: [NotOwner] })
    }



    blacklist.findOne({ UserID: User.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {

            const Already = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`**${User.displayName}** has already been blacklisted! Reason is provided below`)
                .addField('Reason', `${data.Reason}`)
                .addField('Time', `${data.Time} UTC`)
                .addField('Admin', `${interaction.user.tag}`)
                .setColor('#f6f7f8')


            interaction.reply({ embeds: [Already] })
        } else {
            data = new blacklist({
                UserID: User.user.id,
                Reason: MSG,
                Time: currentDateAndTime,
                Admin: interaction.user.tag,
            })
            data.save()
                .catch(err => console.log(err))

            const Added = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`${User.user.tag} has been added to blacklist.`)
                .addField('Reason', `${MSG}`)
                .addField('Time', `${currentDateAndTime} UTC`)
                .addField('Admin', `${message.author.tag}`)
                .setColor('#f6f7f8')

            interaction.reply({ embeds: [Added] })
        }

    })

}