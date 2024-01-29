const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainFile = require('../../slappey.json')
const MainDatabase = require('../schemas/TicketData');
const axios = require('axios');


module.exports.data = new SlashCommandBuilder()
    .setName('custom')
    .setDescription('custom Command')
    .addSubcommand(subcommand =>
        subcommand
            .setName('create')
            .setDescription('Create a custom bot')
            .addStringOption(option =>
                option
                    .setName('clientid')
                    .setDescription('Please type out the client ID')
                    .setRequired(true))
            .addStringOption(option =>
                option
                    .setName('secret')
                    .setDescription('Please type out the client secret')
                    .setRequired(true))
            .addStringOption(option =>
                option
                    .setName('token')
                    .setDescription('Please type out the bot token')
                    .setRequired(true))
            .addStringOption(option =>
                option
                    .setName('ownerid')
                    .setDescription('Please type out the bot owner ID')
                    .setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
        .setName('status')
        .setDescription('Check the status of your bot'))
    .addSubcommand(subcommand => 
        subcommand
        .setName('stop')
        .setDescription('Stop your custom bot'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('restart')
        .setDescription('Restart your custom bot'))
    .addSubcommand(subcommand =>
        subcommand
        .setName('delete')
        .setDescription('Delete your custom bot'))
module.exports.run = (client, interaction) => {
    const clientidbot = interaction.options.getString('clientid')
    const clientsecretbot = interaction.options.getString('secret')
    const tokenbot = interaction.options.getString('token')
    const owneridbot = interaction.options.getString('ownerid')




    const ServerOwner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.options.getSubcommand() === 'create') {
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.PaidGuild === 'Yes') {


                    let data = JSON.stringify({
                        "Image": "skybloxsystemsltd/ticket-bot:Latest",
                        "Env": [
                            `CLIENTID=${clientidbot}`,
                            `CLIENTSEC=${clientsecretbot}`,
                            `TOKEN=${tokenbot}`,
                            `BotOwnerID=${owneridbot}`
                        ]
                    });

                    let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/create?name=${interaction.guild.id}&X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data
                    };

                    let config2 = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/${interaction.guild.id}/start?X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
                        headers: {}
                    };

                    axios.request(config)
                        .then((response) => {
                            interaction.reply('Bot has been created and will start shortly!')
                            setTimeout(() => {
                                axios.request(config2)
                                    .then((response) => {
                                        console.log(JSON.stringify(response.data));
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }, 3000);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    if (data.PaidGuild === 'No') {
                        interaction.reply('This is not a premium server. This command can not be used.')
                    }
                }
            }
        })
    }

}