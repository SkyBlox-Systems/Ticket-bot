const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const { BotVersions } = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('fix')
    .setDescription('Fix Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The main category')
            .setRequired(true)
            .addChoice('Ticket Tracker ', 'tracker')
            .addChoice('Open Tickets', 'tickets')
            .addChoice('Mod Mail issue (v3.2 update issue)', 'ModMail'))
    .addStringOption(NotNeeded =>
        NotNeeded.setName('amount')
            .setDescription('Set the right number to fix it in the database. (Tracker only)')
            .setRequired(false))
    .addStringOption(NotNeeded2 =>
        NotNeeded2.setName('id')
            .setDescription('Set the right id to fix it in the database.')
            .setRequired(false));

module.exports.run = (client, interaction) => {
    const ServerOwner = new MessageEmbed()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });

    const categorystring = interaction.options.getString('category');
    const optionalstring = interaction.options.getString('amount');
    const idstring = interaction.options.getString('id');

    if (categorystring === 'tracker') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: optionalstring }, async (err2, data2) => {
                    if (err2) throw err;
                    if (data2) {
                        const updated = new MessageEmbed()
                            .setTitle('Updated')
                            .setDescription(`We have changed ticket count from **${data.TicketNumber}** to **${optionalstring}**.`)

                        interaction.reply({ embeds: [updated] })
                        data2.save()
                    }
                })
            }
        })

    }

    if (categorystring === 'tickets') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guildId }, { TicketNumber: idstring }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                        const updated = new MessageEmbed()
                            .setTitle('Updated')
                            .setDescription(`We have changed the tickets amount in your server to ${idstring}.`)
                        interaction.reply({ embeds: [updated] })
                    }
                })
            }
        })
    }

    if (categorystring === 'ModMail') {
        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.ModMail === undefined) {
                    data = new MainDatabase({
                        ServerID: data.ServerID,
                        OwnerID: data.OwnerID,
                        TicketChannelID: data.TicketTrackerChannelID,
                        TicketNumber: data.TicketNumber,
                        TicketTrackerChannelID: data.TicketChannelID,
                        BotPrefix: data.BotPrefix,
                        SupportRoleID: data.SupportRoleID,
                        ManagerRoleID: data.ManagerRoleID,
                        AdminRoleID: data.AdminRoleID,
                        BetaKey: data.BetaKey,
                        PaidGuild: data.PaidGuild,
                        Transcript: data.Transcript,
                        UseTicketReactions: data.UseTicketReactions,
                        UseDashboard: data.UseDashboard,
                        APIKey: data.APIKey,
                        TicketMessage: data.TicketMessage,
                        CloseMessage: data.CloseMessage,
                        ClaimTicketMessage: data.ClaimTicketMessage,
                        DisabledCommands: data.DisabledCommands,
                        TranscriptMessage: data.TranscriptMessage,
                        EnableTicket: data.EnableTicket,
                        ModMail: 'Disabled',
                        BotVersion: BotVersions
                    })
                    data.save()
                    const fixed = new MessageEmbed()
                    .setTitle('Fixed')
                    .setDescription('We have fixed your database for your guild. ModMail is disabled as default. Anymore issues? please contact us.')
                    interaction.reply({ embeds: [fixed]})
                    MainDatabase.findOneAndRemove({ ServerID: interaction.guildId }, async (err1, data1) => {
                        if (err1) throw err;
                        if (data1) {
                            
                        }
                    })
                }
            }
        })
    }

}