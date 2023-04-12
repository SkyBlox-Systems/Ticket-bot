const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const ClaimTicket = require('../schemas/ticketclaim');
const { findOneAndUpdate } = require('../schemas/ticketclaim');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
var currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });
const MainDatabase = require('../schemas/TicketData');

module.exports.data = new SlashCommandBuilder()
    .setName('claim')
    .setDescription('claim ticket')
    .addStringOption(option =>
        option.setName('ticketid')
            .setDescription('Ticket ID for ticket')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('date')
            .setDescription('DD/MM/YY (premium only)')
            .setRequired(false))
    .addStringOption(option =>
        option.setName('time')
            .setDescription('Time for the ticket + include timezone (premium only)')
            .setRequired(false));

module.exports.run = (client, interaction) => {
    const claimit = interaction.options.getString('ticketid')
    const PremDate = interaction.options.getString('data')
    const PremTime = interaction.options.getString('time')


    MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
        if (err01) throw err01;
        if (data01) {
            if (!interaction.member.roles.cache.some(r => r.name === "ticket support")) {
                const NoPerms = new EmbedBuilder()
                    .setTitle('Error')
                    .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')

                return interaction.reply({ embeds: [NoPerms] })
            }

            if (data01.SecondServer === 'Enabled') {
                if (interaction.guildId === data01.SecondServer)
                    return interaction.reply('You can not use this command in this guild as you have the second guild enable via settings')

                ClaimTicket.findOne({ TicketIDs: claimit }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        const user1 = data.id

                        data = ClaimTicket.findOneAndUpdate({ TicketIDs: claimit }, { ClaimUserID: interaction.user.id }, async (err2, data2) => {
                            if (err2) throw err2;
                            if (data2) {
                                data2.save()


                                const TicketClaimed = new EmbedBuilder()
                                    .setTitle('Ticket Claimed!')
                                    .setDescription(`<#${data2.ChannelID}> has been claimed by <@${interaction.user.id}> You should off be given the permission to send the message in the ticket!`)

                                const TicketClaimedDM = new EmbedBuilder()
                                    .setTitle('Ticket Claimed!')
                                    .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${interaction.user.id}>! For you to reply, you need to reply to our DMs with your ticket id ${data2.TicketIDs}`)

                                //  if (message.author.id !== data2.ClaimUserID) {
                                //    const AlreadyClaimed = new EmbedBuilder()
                                //      .setTitle('Ticket already claimed!')
                                //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)

                                //    return message.channel.send(AlreadyClaimed)
                                //  }

                                const user2 = data2.id


                                interaction.reply({ embeds: [TicketClaimed] })
                                const sendtouser = client.users.cache.get(`${user1}`)
                                sendtouser.send({ embeds: [TicketClaimedDM] })

                                const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)

                                MainChan.permissionOverwrites.set([
                                    {
                                        id: interaction.user.id,
                                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                    }
                                ])






                            }

                        })
                    } else {
                        interaction.reply('The ID you put has not open a ticket or an invaild id')
                            .catch(err => console.log(err))
                    }

                })

            } else {
                if (data01.SecondServer === 'Disabled') {
                    if (data01.TypeOfServer === 'Second')
                        return interaction.reply('It seems like that this is a a second guild for support. Please make sure you have enabled this setting and set it up correctly.')
                    if (data01.ModMail === 'Enabled') {

                        ClaimTicket.findOne({ TicketIDs: claimit }, async (err, data) => {
                            if (err) throw err;
                            if (data) {
                                const user1 = data.id

                                data = ClaimTicket.findOneAndUpdate({ TicketIDs: claimit }, { ClaimUserID: interaction.user.id }, async (err2, data2) => {
                                    if (err2) throw err2;
                                    if (data2) {
                                        data2.save()


                                        const TicketClaimed = new EmbedBuilder()
                                            .setTitle('Ticket Claimed!')
                                            .setDescription(`<#${data2.ChannelID}> has been claimed by <@${interaction.user.id}> You should off be given the permission to send the message in the ticket!`)

                                        const TicketClaimedDM = new EmbedBuilder()
                                            .setTitle('Ticket Claimed!')
                                            .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${interaction.user.id}>! For you to reply, you need to reply to our DMs with your ticket id ${data2.TicketIDs}`)

                                        //  if (message.author.id !== data2.ClaimUserID) {
                                        //    const AlreadyClaimed = new EmbedBuilder()
                                        //      .setTitle('Ticket already claimed!')
                                        //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)

                                        //    return message.channel.send(AlreadyClaimed)
                                        //  }

                                        const user2 = data2.id


                                        interaction.reply({ embeds: [TicketClaimed] })
                                        const sendtouser = client.users.cache.get(`${user1}`)
                                        sendtouser.send({ embeds: [TicketClaimedDM] })

                                        const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)


                                        MainChan.permissionOverwrites.set([
                                            {
                                                id: interaction.user.id,
                                                allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                            }
                                        ])






                                    }

                                })
                            } else {
                                interaction.reply('The ID you put has not open a ticket or an invaild id')
                                    .catch(err => console.log(err))
                            }

                        })


                    } else {
                        if (data01.ModMail === 'Disabled') {



                            ClaimTicket.findOne({ TicketIDs: claimit }, async (err03, data03) => {
                                if (err03) throw err;
                                if (data03) {
                                    const user1 = data03.id
                                    data03 = ClaimTicket.findOneAndUpdate({ TicketIDs: claimit }, { ClaimUserID: interaction.user.id }, async (err2, data2) => {
                                        if (err2) throw err2;
                                        if (data2) {
                                            data2.save()



                                            const TicketClaimed = new EmbedBuilder()
                                                .setTitle('Ticket Claimed!')
                                                .setDescription(`<#${data2.ChannelID}> has been claimed by <@${interaction.user.id}> You should off be given the permission to send the message in the ticket!`)



                                            //  if (message.author.id !== data2.ClaimUserID) {
                                            //    const AlreadyClaimed = new EmbedBuilder()
                                            //      .setTitle('Ticket already claimed!')
                                            //      .setDescription(`This ticket has already been claimed by <@${data2.ClaimUserID}>`)

                                            //    return message.channel.send(AlreadyClaimed)
                                            //  }

                                            const VCTicketClaim = interaction.guild.channels.cache.get(data2.ChannelID)

                                            if (VCTicketClaim.type === 'GUILD_TEXT') {

                                                const TicketClaimedDM = new EmbedBuilder()
                                                    .setTitle('Ticket Claimed!')
                                                    .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${interaction.user.id}>!`)

                                                const dmUserID = data2.id;
                                                interaction.reply({ embeds: [TicketClaimed] })
                                                interaction.guild.channels.cache.get(data2.ChannelID).send(`<@${data2.id}>`)
                                                const sendtouser = client.users.cache.get(`${user1}`)
                                                client.users.cache.get(data2.id).send({ embeds: [TicketClaimedDM] })

                                                const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)


                                                MainChan.permissionOverwrites.set([
                                                    {
                                                        id: interaction.user.id,
                                                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                                    }
                                                ])
                                            }

                                            if (VCTicketClaim.type === 'GUILD_VOICE') {
                                                const dmUserID = data2.id;


                                                const TicketVCClaimedDM = new EmbedBuilder()
                                                    .setTitle('Ticket Claimed!')
                                                    .setDescription(`Your ticket <#${data2.ChannelID}> has been claimed by <@${interaction.user.id}>! You are required to join the voice call on this date **${PremDate}** and time **${PremTime}**`)

                                                interaction.reply({ embeds: [TicketClaimed] })
                                                const sendtouser = client.users.cache.get(`${user1}`)
                                                const MainChan = interaction.guild.channels.cache.get(data2.ChannelID)
                                                client.users.cache.get(data2.id).send({ embeds: [TicketVCClaimedDM] })



                                                MainChan.permissionOverwrites.set([
                                                    {
                                                        id: interaction.user.id,
                                                        allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageChannels]
                                                    }
                                                ])

                                            }
                                        }

                                    })
                                } else {
                                    interaction.reply('The ID you put has not open a ticket or an invaild id')
                                        .catch(err => console.log(err))
                                }

                            })

                        }
                    }
                }

            }

        }
    })

}