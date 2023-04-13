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
        let scheduledMessage = new cron.CronJob('* * * * *', () => {
            // This runs every day at 10:30:00, you can do anything you want
            axios.get('https://public-api.freshstatus.io/api/v1/services/', {
                auth: {
                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                    password: 'skybloxrblx-241'
                },
            }).then((res) => {
                axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[7].id}`, {
                    auth: {
                        username: 'ace01fa75db9ccce27a25bbc69c00887',
                        password: 'skybloxrblx-241'
                    },
                }).then((res1) => {
                    axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[5].id}`, {
                        auth: {
                            username: 'ace01fa75db9ccce27a25bbc69c00887',
                            password: 'skybloxrblx-241'
                        },
                    }).then((res2) => {

                        axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[0].id}`, {
                            auth: {
                                username: 'ace01fa75db9ccce27a25bbc69c00887',
                                password: 'skybloxrblx-241'
                            },
                        }).then((res3) => {

                            axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[38].id}`, {
                                auth: {
                                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                                    password: 'skybloxrblx-241'
                                },
                            }).then((res4) => {

                                axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[7].id}`, {
                                    auth: {
                                        username: 'ace01fa75db9ccce27a25bbc69c00887',
                                        password: 'skybloxrblx-241'
                                    },
                                }).then((res5) => {
                                    axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[3].id}`, {
                                        auth: {
                                            username: 'ace01fa75db9ccce27a25bbc69c00887',
                                            password: 'skybloxrblx-241'
                                        },
                                    }).then((res6) => {
                                        axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[2].id}`, {
                                            auth: {
                                                username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                password: 'skybloxrblx-241'
                                            },
                                        }).then((res7) => {
                                            axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[1].id}`, {
                                                auth: {
                                                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                    password: 'skybloxrblx-241'
                                                },
                                            }).then((res8) => {
                                                axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[22].id}`, {
                                                    auth: {
                                                        username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                        password: 'skybloxrblx-241'
                                                    },
                                                }).then((res9) => {

                                                    axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[6].id}`, {
                                                        auth: {
                                                            username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                            password: 'skybloxrblx-241'
                                                        },
                                                    }).then((res10) => {
                                                        axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[23].id}`, {
                                                            auth: {
                                                                username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                                password: 'skybloxrblx-241'
                                                            },
                                                        }).then((res11) => {
                                                            axios.get(`https://public-api.freshstatus.io/api/v1/incidents/`, {
                                                                auth: {
                                                                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                                    password: 'skybloxrblx-241'
                                                                },
                                                            }).then((res21) => {

                                                                if (res21.data.results[0].end_time === null) {
                                                                    const StatusDown = new EmbedBuilder()
                                                                        .setTitle('Ticket Bot Status')
                                                                        .setDescription('Below is the Ticket Bot status. Updated every minute.')
                                                                        .addFields([
                                                                            { name: 'Shards', value: `${res.data.results[7].name} **${res1.data.status}** \n ${res.data.results[5].name} **${res2.data.status}** \n ${res.data.results[0].name} **${res3.data.status}**` },
                                                                            { name: 'Backend', value: `${res.data.results[38].name} **${res4.data.status}** \n ${res.data.results[4].name} **${res5.data.status}** \n ${res.data.results[3].name} **${res6.data.status}** \n ${res.data.results[2].name} **${res7.data.status}** \n ${res.data.results[1].name} **${res8.data.status}** \n ${res.data.results[22].name} **${res9.data.status}** \n ${res.data.results[6].name} **${res10.data.status}**` },
                                                                            { name: 'Open Source', value: `${res.data.results[23].name} **${res11.data.status}**` },
                                                                            { name: 'Current Incidents', value: `**${res21.data.results[0].title}** \n${res21.data.results[0].description} \n\nYou can find the incident here: https://status..skybloxsystems.com/incident/${res21.data.results[0].id} **Keep in mind, this status could be for a issue outside of ticket bot. This is a company status.**` }
                                                                        ])
                                                                        .setTimestamp()



                                                                    interaction.reply({ embeds: [StatusDown] })
                                                                } else {
                                                                    const StatusUp = new EmbedBuilder()
                                                                        .setTitle('Ticket Bot Status')
                                                                        .setDescription('Below is the Ticket Bot status. Updated every minute.')
                                                                        .addFields([
                                                                            { name: 'Shards', value: `${res.data.results[7].name} **${res1.data.status}** \n ${res.data.results[5].name} **${res2.data.status}** \n ${res.data.results[0].name} **${res3.data.status}**` },
                                                                            { name: 'Backend', value: `${res.data.results[38].name} **${res4.data.status}** \n ${res.data.results[4].name} **${res5.data.status}** \n ${res.data.results[3].name} **${res6.data.status}** \n ${res.data.results[2].name} **${res7.data.status}** \n ${res.data.results[1].name} **${res8.data.status}** \n ${res.data.results[22].name} **${res9.data.status}** \n ${res.data.results[6].name} **${res10.data.status}**` },
                                                                            { name: 'Open Source', value: `${res.data.results[23].name} **${res11.data.status}**` },
                                                                            { name: 'Current Incidents', value: `none` }
                                                                        ])
                                                                        .setTimestamp()

                                                                    interaction.reply({ embeds: [StatusUp] })
                                                                }
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }).catch(function (error) {
                console.log('failed to connect')
            })
        });
    }

}