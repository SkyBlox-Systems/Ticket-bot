const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const axios = require('axios');


module.exports.data = new SlashCommandBuilder()
  .setName('shortner')
  .setDescription('shortner Command')
  .addStringOption(option =>
    option.setName('link')
      .setDescription('Must provide a url')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('expire')
      .setDescription('Set how long the link is vaild for (in days).')
      .setRequired(true))
  .addStringOption(option =>
    option.setName('password')
      .setDescription('Set a password for the link. There is no password set as default.')
      .setRequired(false))

module.exports.run = async (client, interaction) => {
  const URLTarget = interaction.options.getString('link')
  const ExpireIn = interaction.options.getString('expire')
  const PasswordSet = interaction.options.getString('password')

  function makeURL(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const SpecialCode = makeURL(5)
  const CustomURLCode = makeURL(7)


  var data = JSON.stringify({
    "target": `${URLTarget}`,
    "description": `Special code: ${SpecialCode}`,
    "expire_in": `${ExpireIn} days`,
    "password": `${PasswordSet}`,
    "customurl": `${CustomURLCode}`,
    "reuse": false,
    "domain": "link.skybloxsystems.com"
  });

  var data2 = JSON.stringify({
    "target": `${URLTarget}`,
    "description": `Special code: ${SpecialCode}`,
    "expire_in": `${ExpireIn} days`,
    "customurl": `${CustomURLCode}`,
    "reuse": false,
    "domain": "link.skybloxsystems.com"
  });

  if (PasswordSet !== null) {
    var config = {
      method: 'post',
      url: 'https://link.skybloxsystems.com/api/v2/links',
      headers: {
        'X-API-KEY': 'IsFQYRJqC4A0jT0kBEBUVkP4vQjK6qsW6HD5hqth',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });

    const LinkCreated = new MessageEmbed()
      .setTitle('Link created')
      .setDescription(`The link has been created! Thank you for using our service. Password is needed, and you will sent a DM`)
      .addField('URL', `[Click me](https://link.skybloxsystems.com/${CustomURLCode})`, true)
      .addField('Expire', `${ExpireIn} days`, true)
      .addField('Password', `${PasswordSet}`, true)

    const LinkCreatedDM = new MessageEmbed()
      .setTitle('Link created')
      .setDescription(`The link has been created! In this message, you have been given a special code. This code is used if u want to edit it. Email: support@skybloxsystems.com with the code to change the link.`)
      .addField('URL', `[Click me](https://link.skybloxsystems.com/${CustomURLCode})`, true)
      .addField('Expire', `${ExpireIn} days`, true)
      .addField('Password', `${PasswordSet}`, true)
      .addField('Code', `${SpecialCode}`, true)

    const user = interaction.user.id;

    interaction.reply({ embeds: [LinkCreated] })
    interaction.user.send({ embeds: [LinkCreatedDM] })
  }

  if (PasswordSet === null) {
    var config = {
      method: 'post',
      url: 'https://link.skybloxsystems.com/api/v2/links',
      headers: {
        'X-API-KEY': 'IsFQYRJqC4A0jT0kBEBUVkP4vQjK6qsW6HD5hqth',
        'Content-Type': 'application/json'
      },
      data: data2
    };

    axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });

    const LinkCreated = new MessageEmbed()
      .setTitle('Link created')
      .setDescription(`The link has been created! Thank you for using our service. There is no password set, and you will sent a DM`)
      .addField('URL', `[Click me](https://link.skybloxsystems.com/${CustomURLCode})`, true)
      .addField('Expire', `${ExpireIn} days`, true)

    const LinkCreatedDM = new MessageEmbed()
      .setTitle('Link created')
      .setDescription(`The link has been created! In this message, you have been given a special code. This code is used if u want to edit it. Email: support@skybloxsystems.com with the code to change the link.`)
      .addField('URL', `[Click me](https://link.skybloxsystems.com/${CustomURLCode})`, true)
      .addField('Expire', `${ExpireIn} days`, true)
      .addField('Code', `${SpecialCode}`, true)

    const user = interaction.user.id;

    interaction.reply({ embeds: [LinkCreated] })
    interaction.user.send({ embeds: [LinkCreatedDM] })
  }


}