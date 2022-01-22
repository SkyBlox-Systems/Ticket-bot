const BaseCommand = require('../../utils/structures/BaseCommand');
const axios = require('axios');
const { MessageEmbed, Channel } = require('discord.js');

module.exports = class StatusCommand extends BaseCommand {
  constructor() {
    super('status', 'Info', []);
  }

  async run(client, message, args) {
    axios.get('https://api.hetrixtools.com/v1/eb4ff9803da2be0d631e3fe73d0685a6/server/stats/3025cef345ebb827fea3a390ab4564e3/')
      .then((res) => {
        const API = new MessageEmbed()
          .setTitle('Status')
          .setColor('GREEN')
          .setTimestamp()
          .addField(`Virtual Machine`, `Name: ${res.data.UptimeMonitorName} \nReboot: ${res.data.RebootRequired} \nUptime: ${res.data.SystemUptime}`)
          .addField(`Current time`, `CPU: ${res.data.Stats[0].CPU}% \nCPU IOWait: ${res.data.Stats[0].IOWait}%  \nRam: ${res.data.Stats[0].RAM}% used \nRam Swap: ${res.data.Stats[0].Swap}% \nNetwork In: ${res.data.Stats[0].NetIn} kbps \nNetwork Out: ${res.data.Stats[0].NetOut} kbps  \nDisk: ${res.data.Stats[0].Disk}% \nMinute: ${res.data.Stats[0].Minute}`)

        message.channel.send({ embeds: [API]})

      })
      .catch((err) => {
        console.error('ERR:', err)
      })
  }

}