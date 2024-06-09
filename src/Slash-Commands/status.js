const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const mongoose = require('mongoose');
const ms = require('ms');
const { EmbedBuilder, Message } = require("discord.js");
const axios = require('axios');
const { response } = require('express');
const cron = require('cron');
const timestamp = require('unix-timestamp');
timestamp.round = true




module.exports.data = new SlashCommandBuilder()
    .setName('status')
    .setDescription('status Command')
    .addSubcommand(subcommand =>
        subcommand
        .setName('shards')
        .setDescription('View the status of the shards'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('status')
        .setDescription('Get the status of the company status'))

module.exports.run = async (client, interaction) => {
    const teststring = interaction.options.getString('options');

    if (interaction.options.getSubcommand() === 'shards') {
        client.shard.broadcastEval(client => [client.shard.ids, client.ws.status, client.ws.ping, client.guilds.cache.size])
            .then((results) => {
                const embed = new EmbedBuilder()
                    .setTitle(`👨‍💻 Bot Shards (${interaction.client.shard.count})`)
                    .setColor('#ccd6dd')
                    .setTimestamp();

                results.map((data) => {
                    embed.addFields([
                        { name: `📡 Shard ${data[0]}`, value: `**Status:** ${data[1]}\n**Ping:** ${data[2]}ms\n**Guilds:** ${data[3]}\n **users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}` }
                    ])
                });
                interaction.reply({ embeds: [embed] });
            })
            .catch((error) => {
                console.error(error);
                interaction.reply(`❌ Error.`);
            });
    }
    if (interaction.options.getSubcommand() === 'status') {
        const config = {
            headers: { Authorization: `Bearer 9248ffdb653c4f5eb2f3dc0e1337ac82` }
        };
            // This runs every day at 10:30:00, you can do anything you want
            axios.get('https://api.statuspage.io/v1/pages/czzb85ttlzzf/components', config, {
            }).then((res) => {
                axios.get('https://api.statuspage.io/v1/pages/czzb85ttlzzf/incidents', config, {
                }).then((res1) => {
                    const MainEmbed = new EmbedBuilder()
                    .setTitle('Ticket Bot Status')
                    .setDescription('This is the status of Ticket Bot, created by SkyBlox Systems LTD')
                    .addFields({ name: `${res.data[8].name} - ${res.data[8].status}`, value: `${res.data[2].name} - ${res.data[2].status} \n ${res.data[9].name} - ${res.data[9].status} \n ${res.data[15].name} - ${res.data[15].status} \n ${res.data[26].name} - ${res.data[26].status} \n ${res.data[29].name} - ${res.data[29].status} \n ${res.data[36].name} - ${res.data[36].status} \n ${res.data[42].name} - ${res.data[42].status} \n ${res.data[47].name} - ${res.data[47].status} \n ${res.data[51].name} - ${res.data[51].status} \n ${res.data[56].name} - ${res.data[56].status} \n ${res.data[59].name} - ${res.data[59].status} \n ${res.data[62].name} - ${res.data[62].status} \n ${res.data[66].name} - ${res.data[66].status} \n ${res.data[68].name} - ${res.data[68].status} \n ${res.data[70].name} - ${res.data[70].status} \n ${res.data[72].name} - ${res.data[72].status} \n ${res.data[74].name} - ${res.data[74].status}`})
                    interaction.reply({ embeds: [MainEmbed]})                
                })
            }).catch(function (error) {
                console.log('failed to connect')
            })
    }

}