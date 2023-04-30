const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js')
const Discord = require('discord.js');
const database = require('../schemas/TicketData')
const { BotVersions } = require('../../slappey.json')
const { ActionRowBuilder, StringSelectMenuBuilder, ChannelType } = require('discord.js');
const axios = require('axios');


module.exports.data = new SlashCommandBuilder()
    .setName('upgrade')
    .setDescription('upgrade bot')



module.exports.run = async (client, interaction) => {


    // const msg =  interaction.channel.send(`upgrade..`);

    const ServerOwner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

    if (interaction.user.id != interaction.guild.ownerId)
        return message.channel.send({ embeds: [ServerOwner] });



    database.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
                if (data.BotVersion !== BotVersions) {
                    database.findOne({ ServerID: interaction.guild.id }, async (err3, data3) => {
                        if (err3) throw err;
                        if (data3) {
                            data3 = new database({
                                ServerID: data3.ServerID || interaction.guild.id,
                                OwnerID: data3.OwnerID || interaction.guild.ownerId,
                                TicketChannelID: data3.TicketTrackerChannelID || 'N/A',
                                TicketNumber: data3.TicketNumber || '0',
                                TicketTrackerChannelID: data3.TicketChannelID || 'N/A',
                                FeedbackChannelID: data3.FeedbackChannelID || 'N/A',
                                BotPrefix: data3.BotPrefix || '!',
                                SupportRoleID: data3.SupportRoleID || 'N/A',
                                ManagerRoleID: data3.ManagerRoleID || 'N/A',
                                AdminRoleID: data3.AdminRoleID || 'N/A',
                                BetaKey: data3.BetaKey || 'N/A',
                                PaidGuild: data3.PaidGuild || 'No',
                                Tier: data3.Tier || 'Free',
                                PremiumCode: data3.PremiumCode || 'N/A',
                                Transcript: data3.Transcript || 'Yes',
                                UseTicketReactions: data3.UseTicketReactions || 'Yes',
                                UseDashboard: data3.UseDashboard || 'Yes',
                                APIKey: data3.APIKey || 'N/A',
                                TicketMessage: data3.TicketMessage || 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                                CloseMessage: data3.CloseMessage || 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                                ClaimTicketMessage: data3.ClaimTicketMessage || 'has open a ticket and needs support.',
                                OpenTicket: data3.OpenTicket || 'I have open a ticket for you!',
                                DisabledCommands: data3.DisabledCommands || 'NA',
                                TranscriptMessage: data3.TranscriptMessage || 'Transcript for',
                                EnableTicket: data3.EnableTicket || 'Enabled',
                                ModMail: data3.ModMail || 'Disabled',
                                VoiceTicket: data3.VoiceTicket || 'Disabled',
                                CustomBots: data3.CustomBots || '0',
                                TicketIDLength: data3.TicketIDLength || '5',
                                SecondServer: data3.SecondServer || 'Disabled',
                                SecondServerID: data3.SecondServerID || 'N/A',
                                SecondServerSupportRoleID: data3.SecondServerSupportRoleID || 'N/A',
                                SecondServerAdminRoleID: data3.SecondServerAdminRoleID || 'N/A',
                                SecondServerManagerRoleID: data3.SecondServerManagerRoleID || 'N/A',
                                SecondServerClaimChannel: data3.SecondServerClaimChannel || 'N/A',
                                SecondServerLogsChannel: data3.SecondServerLogsChannel || 'N/A',
                                SecondServerTranscriptChannel: data3.SecondServerTranscriptChannel || 'N/A',
                                ROBLOX: data3.ROBLOX || 'Disabled',
                                TypeOfServer: data3.TypeOfServer || 'First',
                                Important: data3.Important || 'Enabled',
                                WebsiteCode: data3.WebsiteCode || 'N/A',
                                Language: data3.Language || 'en',
                                BotVersion: BotVersions
                            })
                            data3.save()
                            const updated = new EmbedBuilder()
                                .setTitle('The bot has now been updated')
                                .setDescription(`To find the changes, please head here [Change Log](https://docs.ticketbot.co.uk/change-log)`)
                            interaction.reply({ embeds: [updated] })

                            database.findOneAndRemove({ ServerID: interaction.guild.id }, async (err2, data2) => {
                                if (err2) throw err;
                                if (data2) {
                                }
                            })
                        } else {
                            interaction.reply('We are having issues updating your guild. Please contact support via our support server. Do that by heading to our website')
                        }
                    })
                } else {
                    if (data.BotVersion === BotVersions) {
                        const alreadyupdated = new EmbedBuilder()
                            .setTitle(`Bot in this guild is already on the latest version (**v${BotVersions}**).`)

                        interaction.reply({ embeds: [alreadyupdated] })
                    }
                }

        } else {
            if (data.SecondServer === 'Enabled') {
                if (data.BotVersion !== BotVersions) {

                    database.findOne({ ServerID: interaction.guild.id }, async (err3, data3) => {
                        if (err3) throw err;
                        if (data3) {
                            data3 = new database({
                                ServerID: data3.ServerID || interaction.guild.id,
                                OwnerID: data3.OwnerID || interaction.guild.ownerId,
                                SecondServer: data3.SecondServer || 'Disabled',
                                SecondServerID: data3.SecondServerID || 'N/A',
                                SecondServerSupportRoleID: data3.SecondServerSupportRoleID || 'N/A',
                                SecondServerAdminRoleID: data3.SecondServerAdminRoleID || 'N/A',
                                SecondServerManagerRoleID: data3.SecondServerManagerRoleID || 'N/A',
                                SecondServerClaimChannel: data3.SecondServerClaimChannel || 'N/A',
                                SecondServerLogsChannel: data3.SecondServerLogsChannel || 'N/A',
                                SecondServerTranscriptChannel: data3.SecondServerTranscriptChannel || 'N/A',
                                ROBLOX: data3.ROBLOX || 'Disabled',
                                TypeOfServer: data3.TypeOfServer || 'Second',
                                BotVersion: BotVersions
                            })
                            data3.save()
                            const updated = new EmbedBuilder()
                                .setTitle('The bot has now been updated')
                                .setDescription(`To find the changes, please head here [Change Log](https://docs.ticketbots.co.uk/change-log)`)
                            interaction.reply({ embeds: [updated] })
    
                            const newchannel = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "feedback" && ch.type == ChannelType.GuildText)
                            const Supportcat = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "GUILD_CATEGORY")
    
                            if (newchannel === undefined) {
                                interaction.guild.channels.create('feedback', { parent: Supportcat }).then(async (chan) => {
                                    chan.permissionOverwrites.create(interaction.guild.roles.everyone, {
                                        SEND_MESSAGES: false,
                                        VIEW_CHANNEL: false,
                                    })
                                    chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                                        SEND_MESSAGES: true,
                                        VIEW_CHANNEL: true,
                                        MANAGE_CHANNELS: false,
                                        ATTACH_FILES: true,
                                    })
                                    chan.permissionOverwrites.create(interaction.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                                        SEND_MESSAGES: true,
                                        VIEW_CHANNEL: true,
                                        MANAGE_CHANNELS: true,
                                        ATTACH_FILES: true,
                                    })
                                })

                            } else {
                                interaction.channel.send('We are having issues updating your guild. Please contact support via our support server. Do that by heading to our website')

                            }
                            database.findOneAndRemove({ ServerID: interaction.guild.id }, async (err2, data2) => {
                                if (err2) throw err;
                                if (data2) {
    
                                }
                            })
                        }
                    })
                } else {
                    if (data.BotVersion === BotVersions) {
                        const alreadyupdated = new EmbedBuilder()
                            .setTitle(`Bot in this guild is already on the latest version (**v${BotVersions}**).`)
    
                        interaction.reply({ embeds: [alreadyupdated] })
                    }
                }
            }
        }
    })

}