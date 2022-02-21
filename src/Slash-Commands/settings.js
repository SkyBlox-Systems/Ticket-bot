const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const mongoose = require('mongoose');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
var today = new Date();
var dd = String(today.getDate());

module.exports.data = new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Settings Command')
    .addSubcommand(command01 => 
        command01
        .setName('view')
        .setDescription('View Commands'))
    .addSubcommandGroup(group01 => 
        group01
        .setName('edit')
        .setDescription('Edit commands')
        .addSubcommand(groupsub1 => 
            groupsub1
            .setName('ticketchannelid')
            .setDescription('Ticket Channel ID'))
        .addSubcommand(groupsub2 => 
            groupsub2
            .setName('tickettrackerchannelid')
            .setDescription('Ticket Tracker Channel ID'))
        .addSubcommand(groupsub3 => 
            groupsub3
            .setName('prefix')
            .setDescription('Change Prefix'))
        .addSubcommand(groupsub4 =>
            groupsub4
            .setName('supportrole')
            .setDescription('Change Support Role ID'))
        .addSubcommand(groupsub5 => 
            groupsub5
            .setName('managerrole')
            .setDescription('Change Manger Role ID'))
        .addSubcommand(groupsub6 =>
            groupsub6
            .setName('adminrole')
            .setDescription('Change Admin Role ID'))
        .addSubcommand(groupsub7 => 
            groupsub7
            .setName('transcript')
            .setDescription('Enable Or Disable Transcript'))
        .addSubcommand(groupsub8 => 
            groupsub8
            .setName('tickets')
            .setDescription('Enable Or Disable Tickets'))
    )
    
    // .addSubcommand(subcommand1 => {
    //     subcommand1
    //     .setName('View')
    // })
    module.exports.run = (client, interaction) => {
         const viewslashcommand = interaction.options.getSubcommand('view')
         if(viewslashcommand) {
              MainDatabase.findOne({ ServerID: interaction.guildId }, async (err1, data1) => {
            if (err1) throw err1;
            if (data1) {
              const ListSettings = new MessageEmbed()
                .setTitle(`${interaction.guild.name} bot settings`)
                .setDescription('List of the bot settings for the server.')
                .addField(`ServerID`, `${data1.ServerID}`, true)
                .addField(`TicketChannelID`, `${data1.TicketChannelID}`, true)
                .addField(`TicketNumber`, `${data1.TicketNumber}`, true)
                .addField(`TicketTrackerChannelID`, `${data1.TicketTrackerChannelID}`, true)
                .addField(`Prefix`, `${data1.BotPrefix}`, true)
                .addField(`Support Role`, `${data1.SupportRoleID}`, true)
                .addField('Manager Role', `${data1.ManagerRoleID}`, true)
                .addField(`Admin Role`, `${data1.AdminRoleID}`, true)
                .addField(`Beta Key`, `${data1.BetaKey}`, true)
                .addField(`Paid Guild`, `${data1.PaidGuild}`, true)
                .addField(`Create Transcripts`, `${data1.Transcript}`, true)
                .addField('API Key', `${data1.APIKey}`, true)
                .addField(`Bot Version`, `${data1.BotVersion}`, true)


              interaction.reply({ embeds: [ ListSettings ]})
            } else {

              const ListSettingsError = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Failed to load settings. This can be caused because the server owner did not set the server up correctly or have not run ${client.prefix}install or ${client.prefix}update or ${client.prefix}setup`)

              interaction.reply({ embeds: [ListSettingsError ]})
            }
          })

         }

        
    }