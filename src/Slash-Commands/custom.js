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
    .addSubcommand(subcommand =>
        subcommand
            .setName('start')
            .setDescription('Start your custom bot'))

module.exports.run = (client, interaction) => {
    const clientidbot = interaction.options.getString('clientid')
    const clientsecretbot = interaction.options.getString('secret')
    const tokenbot = interaction.options.getString('token')
    const owneridbot = interaction.options.getString('ownerid')




    const ServerOwner = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
        .setColor('#f9f9fa')


    if (interaction.options.getSubcommand() === 'create') { // Create the container for the customer
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.PaidGuild === 'Yes') {
                    if (data.CustomBots === '1') {
                        interaction.reply('You already have a custom bot. Please delete that one first.')
                    } else {

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
                                            interaction.channel.send('The custom bot has been created, and the bot has started. You can now may remove this bot')
                                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { CustomBots: '1' }, (err2, data2) => {
                                                if (err2) throw err;
                                                if (data2) {
                                                    data2.save()
                                                }
                                            })
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            interaction.reply('An error has occurred!')
                                        });
                                }, 3000);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }

                } else {
                    if (data.PaidGuild === 'No') {
                        interaction.reply('This is not a premium server. This command can not be used.')
                    }
                }
            }
        })
    }

    if (interaction.options.getSubcommand() === 'status') {  // Status of the container 
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/${interaction.guild.id}/json?X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                const containerdata = new EmbedBuilder()
                    .setTitle('Status')
                    .setDescription('Get the status of your container')
                    .addFields(
                        { name: 'Name', value: interaction.guild.id, inline: true },
                        { name: 'Status', value: response.data.State.Status, inline: true },
                        { name: 'Start time', value: response.data.State.StartedAt, inline: true },
                        { name: 'Created time', value: response.data.Created, inline: true },
                        { name: 'Container ID', value: response.data.Config.Hostname, inline: true },
                    )
                    .setFooter({ text: 'Container ID is only used if there is a issue with the bot. Send that to customer service if needed.' })
                interaction.reply({ embeds: [containerdata] })
            })
            .catch((error) => {
                console.log(error);
                interaction.reply('An error has occurred!')
            });
    }

    if (interaction.options.getSubcommand() === 'stop') { // Stop the container
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/${interaction.guild.id}/stop?X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                interaction.reply('You bot has been stopped successfully.')
            })
            .catch((error) => {
                console.log(error);
                interaction.reply('An error has occurred!')
            });
    }

    if (interaction.options.getSubcommand() === 'restart') { // Restart the container
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/${interaction.guild.id}/restart?X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                interaction.reply('You bot has been restarted successfully.')
            })
            .catch((error) => {
                console.log(error);
                interaction.reply('An error has occurred!')
            });

    }

    if (interaction.options.getSubcommand() === 'delete') { // Delete the container -- Needs to be done
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });
    }

    if (interaction.options.getSubcommand() === 'start') { // start the container
        if (interaction.user.id != interaction.guild.ownerId)
            return interaction.reply({ embeds: [ServerOwner] });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://portainer.skybloxsystems.com/api/endpoints/2/docker/containers/${interaction.guild.id}/start?X-API-Key=ptr_5RIzgQaLyxFlZ8mjidhGUdmoyMSzQGFSvrR4GbtHj8A=`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                interaction.reply('You bot has been started successfully.')
            })
            .catch((error) => {
                console.log(error);
                interaction.reply('An error has occurred!')

            });

    }

}