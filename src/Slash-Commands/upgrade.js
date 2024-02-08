const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');
timestamp.round = true
const { Translate } = require('@google-cloud/translate').v2;
const { TranslateID } = require('../../slappey.json')
const config = require('../../slappey.json')
const sellix = require("@sellix/node-sdk")(config.StoreCode, "ticketbot");
const MainDatabase = require('../schemas/TicketData')


module.exports.data = new SlashCommandBuilder()
    .setName('upgrade2')
    .setDescription('upgrade all guilds')

module.exports.run = async (client, interaction) => {
    if (interaction.user.id !== '406164395643633665') {
        const NotOwner = new EmbedBuilder()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `/upgrade`. The command is only available for the owner.')
        return interaction.reply(NotOwner)
    }

    client.guilds.cache.forEach(async (guild) => {


        const messageforuser =  interaction.options.getString('message');

        const dmowner = client.users.cache.get(guild.ownerId)


        MainDatabase.findOne({ ServerID: guild.id }, async (err4, data4) => {
            if (err4) throw err;
            if (data4) {
              data4 = new MainDatabase({
                ServerID: data4.ServerID || interaction.guild.id,
                OwnerID: data4.OwnerID || guild.ownerId,
                TicketChannelID: data4.TicketTrackerChannelID || 'N/A',
                TicketNumber: data4.TicketNumber || '0',
                ClosedTickets: data4.ClosedTickets || '0',
                TicketTrackerChannelID: data4.TicketChannelID || 'N/A',
                FeedbackChannelID: data4.FeedbackChannelID || 'N/A',
                BotPrefix: data4.BotPrefix || '!',
                SupportRoleID: data4.SupportRoleID || 'N/A',
                ManagerRoleID: data4.ManagerRoleID || 'N/A',
                AdminRoleID: data4.AdminRoleID || 'N/A',
                BetaKey: data4.BetaKey || 'N/A',
                PaidGuild: data4.PaidGuild || 'No',
                Tier: data4.Tier || 'Free',
                PremiumCode: data4.PremiumCode || 'N/A',
                PremiumExpire: data4.PremiumExpire || '0',
                Transcript: data4.Transcript || 'Yes',
                UseTicketReactions: data4.UseTicketReactions || 'Yes',
                UseDashboard: data4.UseDashboard || 'Yes',
                APIKey: data4.APIKey || 'N/A',
                TicketMessage: data4.TicketMessage || 'Thank you for contacting Support! Please wait for a customer support to claim your ticket.',
                CloseMessage: data4.CloseMessage || 'has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.',
                ClaimTicketMessage: data4.ClaimTicketMessage || 'has open a ticket and needs support.',
                OpenTicket: data4.OpenTicket || 'I have open a ticket for you!',
                DisabledCommands: data4.DisabledCommands || 'NA',
                TranscriptMessage: data4.TranscriptMessage || 'Transcript for',
                EnableTicket: data4.EnableTicket || 'Enabled',
                ModMail: data4.ModMail || 'Disabled',
                VoiceTicket: data4.VoiceTicket || 'Disabled',
                CustomBots: data4.CustomBots || '0',
                TicketIDLength: data4.TicketIDLength || '5',
                SecondServer: data4.SecondServer || 'Disabled',
                SecondServerID: data4.SecondServerID || 'N/A',
                SecondServerSupportRoleID: data4.SecondServerSupportRoleID || 'N/A',
                SecondServerAdminRoleID: data4.SecondServerAdminRoleID || 'N/A',
                SecondServerManagerRoleID: data4.SecondServerManagerRoleID || 'N/A',
                SecondServerClaimChannel: data4.SecondServerClaimChannel || 'N/A',
                SecondServerLogsChannel: data4.SecondServerLogsChannel || 'N/A',
                SecondServerTranscriptChannel: data4.SecondServerTranscriptChannel || 'N/A',
                ROBLOX: data4.ROBLOX || 'Disabled',
                TypeOfServer: data4.TypeOfServer || 'First',
                Important: data4.Important || 'Enabled',
                WebsiteCode: data4.WebsiteCode || 'N/A',
                Language: data4.Language || 'en',
                Threads: data4.Threads || 'Disabled',
                SupportServer: data4.SupportServer || 'No',
                BotVersion: config.BotVersions
              })
              data4.save()

              const updated = new EmbedBuilder()
                .setTitle('The bot has now been updated')
                .setDescription(`To find the changes, please head here [Change Log](https://docs.ticketbot.co.uk/change-log). Please Re-Run the command.`)
                .setFooter({ text: 'We have updated all guilds'})
                dmowner.send({ embeds: [updated] })

              MainDatabase.findOneAndRemove({ ServerID: guild.id }, async (err2, data2) => {
                if (err2) throw err;
                if (data2) {
                }

              })
            } else {
              interaction.reply('We are having issues updating your guild. Please contact support via our support server. Do that by heading to our website')
            }
          })
    })
}