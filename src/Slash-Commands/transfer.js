const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('transfer')
    .setDescription('Transfer Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Click which one you want to transfer')
            .setRequired(true)
            .addChoice('licence', 'licence')
            .addChoice('everything', 'everything'))
    .addStringOption(option =>
        option.setName('id')
            .setDescription('Server ID you would like to transfer to')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    const ServerOwner = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });

    const MSG = interaction.options.getString('id')
    const categorys = interaction.options.getString('category')
    const newguild = client.guilds.cache.get(MSG);

    if (categorys === 'licence') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.PaidGuild === 'Yes') {
                    if (newguild === undefined) {
                        interaction.reply('The ID you put in is not a vaild guild ID or the bot is not in the server.')
                    } else {
                        if (newguild !== undefined) {
                            if (MSG === interaction.guildId) {
                                interaction.reply('You can not transfer the licence to that guild. The guild is this current guild ID.')
                            } else {
                                MainDatabase.findOne({ ServerID: MSG }, async (err1, data1) => {
                                    if (err1) throw err;
                                    if (data1) {
                                        if (data1.PaidGuild === 'Yes') {
                                            interaction.reply('This guild already have premium.')
                                        } else {
                                            const licenceembed = new MessageEmbed()
                                                .setTitle('⚠ Warning ⚠')
                                                .setDescription(`You are about to transfer your premium to this server **${newguild.name} / ${MSG}**. Are you sure you want to do this?`)
                                            const licenceemoji = await interaction.reply({ embeds: [licenceembed], fetchReply: true })
                                            licenceemoji.react('✅')
                                            licenceemoji.react('❌')

                                            const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                            const Collector1 = licenceemoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                                            const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                                            const Collector2 = licenceemoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                                            Collector1.on('collect', () => {
                                                MainDatabase.findOneAndUpdate({ ServerID: MSG }, { PaidGuild: 'Yes', Tier: 'Premium', PremiumCode: data.PremiumCode }, async (err2, data2) => {
                                                    if (err2) throw err;
                                                    if (data2) {
                                                        data2.save()
                                                        MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { PaidGuild: 'No', Tier: 'Free', PremiumCode: 'N/A' }, async (err3, data3) => {
                                                            if (err3) throw err;
                                                            if (data3) {
                                                                data3.save()
                                                                interaction.channel.send('The data has been trasnfered over. This server no longer has premium')
                                                            }
                                                        })
                                                    }
                                                })
                                            })

                                            Collector2.on('collect', () => {
                                                interaction.reply('Cancelled')
                                            })
                                        }
                                    }
                                })
                            }

                        }
                    }
                } else {
                    if (data.PaidGuild === 'No') {
                        interaction.reply('This command can only be used on paid guild.')
                    }
                }
            }
        })
    }

    if (categorys === 'everything') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (newguild === undefined) {
                    interaction.reply('You can not transfer this guild data to that guild. The guild is this current guild ID.')
                } else {
                    if (newguild !== undefined) {
                        if (newguild.ownerId === interaction.guild.ownerId) {
                            const WarningTransfer = new MessageEmbed()
                            .setTitle('⚠ Warning ⚠')
                            .setDescription(`You are about to transfer your guild data to this guild **${newguild.name} / ${MSG}**. Are you sure you want to do this? **YOU WILL LOSE EVERYTHING!**`)

                        const transferemoji = await interaction.reply({ embeds: [WarningTransfer], fetchReply: true })
                        transferemoji.react('✅')
                        transferemoji.react('❌')

                        const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                        const Collector1 = transferemoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                        const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                        const Collector2 = transferemoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                        Collector1.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: MSG}, {OwnerID: data.OwnerID, TicketChannelID: data.TicketChannelID, TicketTrackerChannelID: data.TicketTrackerChannelID, BotPrefix: data.BotPrefix, BetaKey: data.BetaKey, PaidGuild: data.PaidGuild, Tier: data.Tier, PremiumCode: data.PremiumCode, UseDashboard: data.UseDashboard, APIKey: data.APIKey, TicketMessage: data.TicketMessage, CloseMessage: data.CloseMessage, ClaimTicketMessage: data.ClaimTicketMessage, DisabledCommands: data.DisabledCommands, TranscriptMessage: data.TranscriptMessage, EnableTicket: data.EnableTicket, ModMail: data.ModMail, VoiceTicket: data.VoiceTicket, CustomBots: data.CustomBots, BotVersion: data.BotVersion}, async (err1, data1) => {
                                if (err1) throw err;
                                if (data1) {
                                    data1.save()
                                    MainDatabase.findOneAndRemove({ ServerID: interaction.guildId}, async (err2, data2) => {
                                        if (err2) throw err;
                                        if (data2) {
                                            interaction.channel.send('The data has been trasnfered over.')
                                        }
                                    })
                                }
                            })
                        })

                        Collector2.on('collect', () => {
                            interaction.reply('Cancelled')
                        })

                        } else {
                            if (newguild !== interaction.guild.ownerId) {
                                interaction.reply('You must own the guild to transfer the data.')
                            }
                        }

                    }
                }
            }
        })
    }
}