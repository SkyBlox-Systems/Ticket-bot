const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const ClaimTicket = require('../schemas/ticketclaim');
const { findOneAndUpdate } = require('../schemas/ticketclaim');
const { MessageEmbed } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('claim ticket')
    .addStringOption(option =>
        option.setName('ticketid')
            .setDescription('Ticket ID for ticket')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const claimit = interaction.options.getString('ticketid')


    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
        if (err01) throw err01;
        if (data01) {
            if (!interaction.member.roles.cache.some(r => r.name === "ticket support")) {
                const NoPerms = new MessageEmbed()
                    .setTitle('Error')
                    .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                return interaction.reply({ embeds: [NoPerms] })
            }

            ClaimTicket.findOne({ TicketIDs: claimit }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    data = ClaimTicket.findOneAndUpdate({ TicketIDs: claimit }, { ClaimUserID: interaction.user.id }, async (err2, data2) => {
                        if (err2) throw err2;
                        if (data2) {
                            data2.save()


                            const TicketClaimed = new MessageEmbed()
                                .setTitle('Ticket Claimed!')
                                .setDescription(`<#${data2.ChannelID}> has been claimed by <@${interaction.user.id}> You should off be given the permission to send the message in the ticket!`)

                            const TicketClaimedDM = new MessageEmbed()
                                .setTitle('Ticket Claimed!')
                                .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${interaction.user.id}>!`)

                            //  if (message.author.id !== data2.ClaimUserID) {
                            //    const AlreadyClaimed = new MessageEmbed()
                            //      .setTitle('Ticket already claimed!')
                            //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)

                            //    return message.channel.send(AlreadyClaimed)
                            //  }

                            interaction.reply({ embeds: [TicketClaimed] })
                            interaction.guild.channels.cache.get(data2.ChannelID).send(`<@${data2.id}>`)
                            interaction.guild.channels.cache.get(data2.ChannelID).send({ embeds: [TicketClaimedDM] })

                            const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)

                            MainChan.permissionOverwrites.create(interaction.user.id, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                                ATTACH_FILES: true,
                                MANAGE_CHANNELS: true,
                            })






                }

            })
        } else {
            interaction.reply('The ID you put has not open a ticket or an invaild id')
                .catch(err => console.log(err))
        }

    })
} else {
    const NoData = new MessageEmbed()
        .setTitle('Not updated')
        .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

    interaction.reply({ embeds: [NoData] })
}
    })

}