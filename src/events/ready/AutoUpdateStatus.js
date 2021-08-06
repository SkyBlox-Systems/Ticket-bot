const BaseEvent = require('../../utils/structures/BaseEvent');
const Discord = require('discord.js');
const FirstMessage = require("../../first-message2")
const ms = require('ms');
const { MessageEmbed, Message } = require("discord.js");
const axios = require('axios');
const { response } = require('express');
const cron = require('cron');


module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {

        const EmbedChannel = '871028108684316732'

        let scheduledMessage = new cron.CronJob('*/2 * * * *', () => {
            // This runs every day at 10:30:00, you can do anything you want
            axios.get('https://public-api.freshstatus.io/api/v1/services/', {
                auth: {
                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                    password: 'skybloxrblx-241'
                },
            }).then((res) => {
                axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[1].id}`, {
                    auth: {
                        username: 'ace01fa75db9ccce27a25bbc69c00887',
                        password: 'skybloxrblx-241'
                    },
                }).then((res2) => {

                    axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[2].id}`, {
                        auth: {
                            username: 'ace01fa75db9ccce27a25bbc69c00887',
                            password: 'skybloxrblx-241'
                        },
                    }).then((res3) => {
                        axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[7].id}`, {
                            auth: {
                                username: 'ace01fa75db9ccce27a25bbc69c00887',
                                password: 'skybloxrblx-241'
                            },
                        }).then((res4) => {
                            axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[3].id}`, {
                                auth: {
                                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                                    password: 'skybloxrblx-241'
                                },
                            }).then((res5) => {
                                axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[6].id}`, {
                                    auth: {
                                        username: 'ace01fa75db9ccce27a25bbc69c00887',
                                        password: 'skybloxrblx-241'
                                    },
                                }).then((res6) => {
                                    axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[5].id}`, {
                                        auth: {
                                            username: 'ace01fa75db9ccce27a25bbc69c00887',
                                            password: 'skybloxrblx-241'
                                        },
                                    }).then((res7) => {
                                        axios.get(`https://public-api.freshstatus.io/api/v1/services/${res.data.results[4].id}`, {
                                            auth: {
                                                username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                password: 'skybloxrblx-241'
                                            },
                                        }).then((res8) => {

                                            axios.get(`https://public-api.freshstatus.io/api/v1/incidents/`, {
                                                auth: {
                                                    username: 'ace01fa75db9ccce27a25bbc69c00887',
                                                    password: 'skybloxrblx-241'
                                                },
                                            }).then((res21) => {

                                                if (res21.data.results[0].end_time === null) {

                                                    const apitest2 = new MessageEmbed()
                                                        .setTitle('Ticket Bot Status')
                                                        .setDescription(`${res.data.results[1].name} **${res2.data.status}** \n ${res.data.results[2].name} **${res3.data.status}**`)
                                                        .addField('Shards', `${res.data.results[7].name} **${res4.data.status}** \n ${res.data.results[3].name} **${res5.data.status}**`)
                                                        .addField('Backend', `${res.data.results[5].name} **${res7.data.status}** \n ${res.data.results[4].name} **${res8.data.status}**`)
                                                        .addField('Current incidents', `**${res21.data.results[0].title}** \n${res21.data.results[0].description} \n\nYou can find the incident here: https://skybloxrblx-241.freshstatus.io/incident/${res21.data.results[0].id} or https://status.ticketbots.tk/incident/${res21.data.results[0].id}`)
                                                        .setTimestamp()
                                                        .setFooter('Last updated')

                                                    FirstMessage(client, EmbedChannel, apitest2, [])

                                                } else {


                                                    const apitest1 = new MessageEmbed()
                                                        .setTitle('Ticket Bot Status')
                                                        .setDescription(`${res.data.results[1].name} **${res2.data.status}** \n ${res.data.results[2].name} **${res3.data.status}**`)
                                                        .addField('Shards', `${res.data.results[7].name} **${res4.data.status}** \n ${res.data.results[3].name} **${res5.data.status}**`)
                                                        .addField('Backend', `${res.data.results[5].name} **${res7.data.status}** \n ${res.data.results[4].name} **${res8.data.status}**`)
                                                        .addField('Current incidents', 'None')
                                                        .setTimestamp()
                                                        .setFooter('Last updated')

                                                    FirstMessage(client, EmbedChannel, apitest1, [])


                                                }










                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })

                    console.log('Authentication was correct and sent api via logs')
                })

            }).catch(function (error) {
                console.log('failed to connect')
            })
        });
        scheduledMessage.start()
    }
}