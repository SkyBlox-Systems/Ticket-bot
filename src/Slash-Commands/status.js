const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const mongoose = require('mongoose');




module.exports.data = new SlashCommandBuilder()
    .setName('status')
    .setDescription('status Command')

module.exports.run = async (client, interaction) => {
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