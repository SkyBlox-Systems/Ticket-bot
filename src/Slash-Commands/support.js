const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');
const axios = require('axios')

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const configs = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('support')
    .setDescription('Support Command')
    .addStringOption(option =>
        option.setName('email')
            .setDescription('what is your email?')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Why you need to contact support?')
            .setRequired(true))


module.exports.run = (client, interaction) => {

    const CustomerEmail = interaction.options.getString('email')
    const CustomerMessage = interaction.options.getString('message')

    let data = JSON.stringify({
        "alert": true,
        "autorespond": true,
        "source": "API",
        "name": interaction.user.username,
        "email": CustomerEmail,
        "subject": "Ticket Bot - Customer Support",
        "message": `data:text/html,${CustomerMessage}`
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://support.skybloxsystems.comapi/tickets.json',
        headers: { 
          'X-API-Key': configs.osTicketAPI, 
          'Content-Type': 'application/json', 
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        interaction.reply('A customer service ticket has been open. Please check your emails.')
      })
      .catch((error) => {
        console.log(error);
        const embed = new EmbedBuilder()
        .setTitle('Error')
        .setDescription('There was an issue creating the ticket through the automatic system. Please email **support@skybloxsystems.com**.')
        interaction.reply({ embeds: [embed]})
      });
      

}