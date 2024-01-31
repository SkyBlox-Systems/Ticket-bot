const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const config = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const axios = require('axios');
const { sendMail } = require('send-email-api')
const MainDatabase = require('../schemas/TicketData')


module.exports.data = new SlashCommandBuilder()
    .setName('request')
    .setDescription('request Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Select which option you would like')
            .addChoices({
                name: 'Guild',
                value: 'guild'
            })
            .setRequired(true))


module.exports.run = async (client, interaction) => {
    const values = interaction.options.getString('category');

    const ServerOwner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to guild owner only. Please do not try and use this command because you will not get anywhere.')
    if (interaction.user.id != interaction.guild.ownerId)
        return interaction.reply({ embeds: [ServerOwner] });

    if (values === 'guild') {
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                interaction.reply('We have sent the messages in DMS')
                if (data.APIKey === 'N/A') {
                    function makeURL(length) {
                        var result = '';
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        var charactersLength = characters.length;
                        for (var i = 0; i < length; i++) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                        }
                        return result;
                    }
                    const generator = makeURL(15)

                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { APIKey: generator }, async (err1, data1) => {
                        if (err1) throw err;
                        if (data1) {
                            data1.save()
                            const dmsend = client.users.cache.get(interaction.user.id)

                            const MainEmbed = new EmbedBuilder()
                                .setTitle('Request')
                                .setDescription(`A API has been created for your guild for 5 minutes to allow you to download your guild data. You can download the data from here https://api.ticketbots.co.uk/api/v1/settings/${interaction.guild.id}/apikey=${generator}`)

                            dmsend.send({ embeds: [MainEmbed] })

                            setTimeout(() => {
                                const MainEmbed2 = new EmbedBuilder()
                                    .setTitle('Request')
                                    .setDescription(`Your API has been deleted`)

                                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { APIKey: 'N/A' }, async (err2, data2) => {
                                    if (err2) throw err;
                                    if (data2) {
                                        data2.save()
                                    }
                                })
                                dmsend.send({ embeds: [MainEmbed2] })
                            }, 300000);
                        }
                    })

                } else {
                    const dmsend = client.users.cache.get(interaction.user.id)
                    console.log(dmsend)

                    const MainEmbed = new EmbedBuilder()
                        .setTitle('Request')
                        .setDescription(`As your guild has a API, you can download the data from here https://api.ticketbots.co.uk/api/v1/settings/${interaction.guild.id}/apikey=${data.APIKey}`)

                    dmsend.send({ embeds: [MainEmbed] })
                }
            }
        })
    }

}