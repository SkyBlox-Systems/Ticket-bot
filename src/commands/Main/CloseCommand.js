const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const bot = require('discord.js');
const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;
const CloseSchema = require('../../schemas/TicketLogs-schema');
const mongo = require('../../mongo');
const ClaimTicket = require('../../schemas/ticketclaim')

module.exports = class CloseCommand extends BaseCommand {
  constructor() {
    super('close', 'Main', []);
  }

  async run(client, message, args) {
    function makeURL(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const generators = makeURL(20)


    const ticketembed = new MessageEmbed()
      .setColor('#f6f7f8')
      .setTimestamp()
      .setTitle(`Ticket`)
      .setDescription(`<@${message.author.id}>, are you sure you want to close this ticket? **yes**. If not, it will automatticaly close within 10 seconds.`)

    const closed = new MessageEmbed()
      .setColor('#f6f7f8')
      .setTimestamp()
      .setTitle(`Ticket`)
      .setDescription(`<@${message.author.id}> has closed the following ticket: ${message.channel.name}.`)

    const Logs = new MessageEmbed()
      .setColor('#f6f7f8')
      .setTimestamp()
      .setTitle('Ticket-logs')
      .setDescription(`<@${message.author.id}> has close the following ticket: ${message.channel.name} successfully. \n\n All tickets are removed of our server within 24 hours.`)

    const notclosed = new MessageEmbed()
      .setColor('#f6f7f8')
      .setTimestamp()
      .setTitle(`Ticket`)
      .setDescription(`Close cancelled.`)

    const closing = new MessageEmbed()
      .setColor('#f6f7f8')
      .setTimestamp()
      .setTitle(`Ticket`)
      .setDescription(`Your ticket will be closed in 5 seconds`)
      .setFooter(`Making a transcript....`)

    async function Transcriptmain() {
      let messageCollection = new discord.Collection();
      let channelMessages = await message.channel.messages.fetch({
        limit: 100
      }).catch(err => console.log(err));

      messageCollection = messageCollection.concat(channelMessages);

      while (channelMessages.size === 100) {
        let lastMessageId = channelMessages.lastKey();
        channelMessages = await message.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
        if (channelMessages)
          messageCollection = messageCollection.concat(channelMessages);
      }
      let msgs = messageCollection.array().reverse();
      let data = await fs.readFile('./src/dashboard/template.html', 'utf8').catch(err => console.log(err));
      if (data) {
        await fs.writeFile(`./src/dashboard/Tickets/${generators}.html`, data).catch(err => console.log(err));
        let guildElement = document.createElement('div');
        let guildText = document.createTextNode(message.guild.name);
        let guildImg = document.createElement('img');
        guildImg.setAttribute('src', message.guild.iconURL());
        guildImg.setAttribute('width', '150');
        guildElement.appendChild(guildImg);
        guildElement.appendChild(guildText);
        console.log(guildElement.outerHTML);
        await fs.appendFile(`./src/dashboard/Tickets/${generators}.html`, guildElement.outerHTML).catch(err => console.log(err));

        msgs.forEach(async msg => {
          let parentContainer = document.createElement("div");
          parentContainer.className = "parent-container";

          let avatarDiv = document.createElement("div");
          avatarDiv.className = "avatar-container";
          let img = document.createElement('img');
          img.setAttribute('src', msg.author.displayAvatarURL());
          img.className = "avatar";
          avatarDiv.appendChild(img);

          parentContainer.appendChild(avatarDiv);

          let messageContainer = document.createElement('div');
          messageContainer.className = "message-container";

          let nameElement = document.createElement("span");
          let name = document.createTextNode(msg.author.tag + " " + msg.createdAt.toDateString() + " " + msg.createdAt.toLocaleTimeString() + " UTC");
          nameElement.appendChild(name);
          messageContainer.append(nameElement);

          if (msg.content.startsWith("```")) {
            let m = msg.content.replace(/```/g, "");
            let codeNode = document.createElement("code");
            let textNode = document.createTextNode(m);
            codeNode.appendChild(textNode);
            messageContainer.appendChild(codeNode);
          }
          else {
            let msgNode = document.createElement('span');
            let textNode = document.createTextNode(msg.content);
            msgNode.append(textNode);
            messageContainer.appendChild(msgNode);
          }
          parentContainer.appendChild(messageContainer);
          await fs.appendFile(`./src/dashboard/Tickets/${generators}.html`, parentContainer.outerHTML).catch(err => console.log(err));
        });
      }
    }

    if (!message.channel.name.startsWith("ticket-")) return message.channel.send("This is not a valid ticket")
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You need MANAGE_CHANNELS permission to use this command")
    message.channel.send(ticketembed).then((m) => {
      message.channel.awaitMessages(response => response.content == "yes", {
        max: 1,
        time: 10000,
        errors: ['time']
      }).then(() => {
        message.channel.send(closing)
        Transcriptmain();
        setTimeout(() => {
          ClaimTicket.findOne({ id: message.author.id }, async (err, data) => {
            if (err) throw err;
            if (data) {

                const DMTicketCreatorClosed = new MessageEmbed()
                .setColor('#f5f5f5')
                .setTimestamp()
                .setTitle(`Ticket`)
                .setDescription(`<@${data.ClaimUserID}> has closed your ticket! If you think this was a mistake, please contact one of the admins. Thank you.`)

                const DMTicketClaimClosed = new MessageEmbed()
                .setColor('#f5f5f5')
                .setTimestamp()
                .setTitle(`Ticket`)
                .setDescription(`You have closed the following ticket ${data.ChannelID} for the following user <@${data.id}>.`)


                const ticketttcreator = client.users.cache.get(data.id)
                ticketttcreator.send(DMTicketCreatorClosed)

                const ticketttClaimer = client.users.cache.get(data.ClaimUserID)
                ticketttClaimer.send(DMTicketClaimClosed)
                setTimeout(() => {
                    ClaimTicket.findOneAndDelete({ id: message.author.id }, async (err2, data2) => {
                        if (err2) throw err;
                        if (data2) {
                            console.log('Ticket logs been removed from the database')
                        } 
                    })
                }, 5000);


            }
  
          })
        message.channel.delete()

          

          const SupportLogs = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket-logs" && ch.type == "text")
          const TranscriptLogs = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")

          SupportLogs.send(Logs)
          TranscriptLogs.send(`The transcript for ticket: ${message.channel.name}. The file can be found below or by our server: http://shard1.ticketbots.tk/Tickets/${generators}.html`, { files: [`./src/dashboard/Tickets/${generators}.html`] })

          const guildId = message.guild.id
          const userId = message.member.id
          const DatabaseMessage = (`The transcript for ticket: ${message.channel.name}. The file can be found below or by our server: http://shard1.ticketbots.tk/Tickets/${generators}.html`, { files: [`./src/dashboard/Tickets/${generators}.html`] })

      
        }, 5000);
      }).catch(() => {
        m.edit(notclosed)
      })
    }).catch(() => {
      m.edit(notclosed)
    })
  }
}