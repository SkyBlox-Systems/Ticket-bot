const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData')
const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
require('discord-buttons')(client)
const moment = require('moment');
require('moment-duration-format')
const axios = require('axios');
const d = new Date()
var today = new Date();
var dd = String(today.getDate());







module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    const Xmas95 = new Date('December 25, 2021 00:00:00');

     if (Xmas95.getDate() == dd) {
      message.channel.send('christmas')

    } else {
      message.channel.send('Na')
    }
    

   
    // const MSG = args.slice(0).join(" ");

    // const InvaildCode2 = new MessageEmbed()
    //   .setTitle(`No link is provided. `);

    // if (!MSG) return message.channel.send(InvaildCode2)

    // axios.defaults.headers.common = {
    //   "X-API-Key": "NBRJG4bo2tJp9vO2OajZcXw7j_8Wtd9ORkksQoCy",
    // };

    // axios.post('https://shortener.skybloxsystems.com/api/v2/links', {'target': MSG}, {"Content-type": "Application/json"})
    //   .then((res) => {
    //     console.log(res.data)
    //     message.channel.send("done :D here is the link you dumb: " + res.data.link)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     message.channel.send(err.message)
    //   })

  }
}
