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
    .addStringOption(option =>
        option.setName('options')
            .setDescription('The main category')
            .setRequired(true)
            .addChoices({
                name: 'Shards',
                value: 'shards'
            })
            .addChoices({
                name: 'Main Status',
                value: 'status'
            }));

module.exports.run = async (client, interaction) => {
    const teststring = interaction.options.getString('options');

    if (teststring === 'shards') {
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
    if (teststring === 'status') {
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
                    .addFields({ name: `${res.data[9].name} - ${res.data[9].status}`, value: `${res.data[2].name} - ${res.data[2].status} \n ${res.data[10].name} - ${res.data[10].status} \n ${res.data[17].name} - ${res.data[17].status} \n ${res.data[25].name} - ${res.data[25].status} \n ${res.data[33].name} - ${res.data[33].status} \n ${res.data[39].name} - ${res.data[39].status} \n ${res.data[44].name} - ${res.data[44].status} \n ${res.data[49].name} - ${res.data[49].status} \n ${res.data[52].name} - ${res.data[52].status} \n ${res.data[55].name} - ${res.data[55].status} \n ${res.data[58].name} - ${res.data[58].status} \n ${res.data[63].name} - ${res.data[63].status} \n ${res.data[65].name} - ${res.data[65].status} \n ${res.data[67].name} - ${res.data[67].status}`})
                    interaction.reply({ embeds: [MainEmbed]})                
                })
            }).catch(function (error) {
                console.log('failed to connect')
            })
    }

}