const BaseCommand = require('../../utils/structures/BaseCommand');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = class ChristmasCommand extends BaseCommand {
  constructor() {
    super('christmas', 'Fun', []);
  }

  run(client, message, args) {
    axios
    .get('https://afchristmas.anvil.app/_/api/get_days')
    .then((res) => {
      console.log(res.data["Days to Christmas"])
      const ChristamsCountdown = new MessageEmbed()
      .setTitle('🎄 Countdown 🎄')
      .setColor('#f5f5f5')
      .setTimestamp()
      .setDescription(`${res.data["Days to Christmas"]}  ${res.data["Days"]} ${res.data["Until"]} 🎅🏾`)
    message.channel.send({ embeds: [ChristamsCountdown]})
    })
    .catch((err) => {
      console.error('ERR:', err)
    })
  }
}