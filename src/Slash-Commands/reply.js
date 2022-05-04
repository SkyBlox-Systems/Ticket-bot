const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('ticketreply')
    .setDescription('Ticket Reply Command')
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Require the message you want to send')
            .setRequired(true));

    module.exports.run = (client, interaction) => {

        MainDatabase.findOne({ ServerID: interaction.guildId }, async (err01, data01) => {
            if (err01) throw err;
            if (data01) {
                if (data01.ModMail === 'Enabled') {
                    const messageforuser =  interaction.options.getString('message');
                    ticketclaim.findOne({ ServerID: interaction.guildId, ChannelID: interaction.channel.id }, async (err, data) => {
                        if (err) throw err;
                        if (data) {
                           
            
                            interaction.reply(`The message has been sent to ${data.id}`)
            
                            const sendtouser = new MessageEmbed()
                            .setTitle(`A reply from ${interaction.member.user.tag}`)
                            .setDescription(`This staff member from this server ${interaction.guild.name} has replied to your ticket. Below is the ticket. For you to reply, please type out ${data.TicketIDs} in our DMs, and we further from there.`)
                            .addField('Ticket Reply:', `${messageforuser}`, true)
                            .setTimestamp()
                            .setFooter({ text: `user id: ${interaction.member.user.id}`});

                            const ticketsend = client.users.cache.get(data.id)
            
                            ticketsend.send({ embeds: [sendtouser] })
            
                        } else {
                            interaction.reply('No Ticket Found with this channel ID or you are not inside a ticket.')
                        }
                    })

                } else {
                    if (data01.ModMail === 'Disabled') {
                        interaction.reply('ModMail is not enabled on this server. This command can not be used.')
                    }
                }
            }
        })
    }