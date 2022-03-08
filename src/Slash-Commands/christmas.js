const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('christmas')
    .setDescription('Christmas Command')


    module.exports.run = (client, interaction) => {
        axios
        .get('https://afchristmas.anvil.app/_/api/get_days')
        .then((res) => {
          console.log(res.data["Days to Christmas"])
          const ChristamsCountdown = new MessageEmbed()
          .setTitle('🎄 Countdown 🎄')
          .setColor('#f5f5f5')
          .setTimestamp()
          .setDescription(`${res.data["Days to Christmas"]}  ${res.data["Days"]} ${res.data["Until"]} 🎅🏾`)
        interaction.reply({ embeds: [ChristamsCountdown]})
        })
        .catch((err) => {
          console.error('ERR:', err)
        })
    }