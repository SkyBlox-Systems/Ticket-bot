const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
const ClaimTicket = require('../../schemas/ticketclaim')
const MainDatabase = require('../../schemas/TicketData')
const discord = require('discord.js'); //Define the discord.js module
const moment = require('moment');
require('moment-duration-format')
const axios = require('axios');
const d = new Date()
var today = new Date();
var dd = String(today.getDate());
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();

const document = dom.window.document;









module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    const discordTranscripts = require('discord-html-transcripts');

const channel  = message.channel;  // Used for ticket name, guild icon, and guild name

// You do not need to await this
const attachment = await discordTranscripts.createTranscript(channel, {
  limit: -1, // Max amount of messages to fetch.
  returnBuffer: false, // Return a buffer instead of a MessageAttachment 
  fileName: 'transcript.html' // Only valid with returnBuffer false. Name of attachment. 
});
let parentContainer = document.createElement("div");
fs.writeFile(`./src/dashboard/Tickets/${message.author.id}/testfile.html`, parentContainer.outerHTML).catch(err => console.log(err));


channel.send({
    files: [attachment]
});
  }
}
