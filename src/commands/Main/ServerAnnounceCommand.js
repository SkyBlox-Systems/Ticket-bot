const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const MainDatabase = require('../../schemas/TicketData')



module.exports = class ServerAnnounceCommand extends BaseCommand {
  constructor() {
    super('ServerAnnounce', 'Main', []);
  }

  async run(client, message, args) {

    MainDatabase.findOne({ ServerID: message.guild.id }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {

        const ServerOwner = new MessageEmbed()
      .setTitle('Error')
      .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
      .setColor('#f9f9fa')


    if (message.author.id != message.guild.owner.id)
      return message.channel.send(ServerOwner);


    let MSG = message.content
      .split(`${client.prefix}ServerAnnounce`)
      .join("");
    if (!MSG)
      return message.channel.send(`You did not specify your message to send!`);

    const Dms = new MessageEmbed()
      .setColor('#f5f5f5')
      .setTimestamp()
      .setTitle(`Server Announcement!`)
      .addField('Server', `${message.guild.name}`, true)
      .addField('Announcer', `${message.author.username}`, true)
      .addField('Message', args.slice(0).join(" "))
      .setFooter(`${message.author.tag} | ${message.author.id}`, `${message.author.avatarURL()}`)

    const Ready = new MessageEmbed()
      .setColor('#f5f5f5')
      .setTimestamp()
      .setTitle('Server Announcement!')
      .addField('Server', `${message.guild.name}`, true)
      .addField('Announcer', `${message.author.username}`, true)
      .addField('Message', args.slice(0).join(" "))
      .setFooter(`${message.author.tag} | ${message.author.id}`, `${message.author.avatarURL()}`)
      .setDescription('Please react with ✅ to confirm the message \nReact with ❌ to cancel the command')

    const sent = new MessageEmbed()
      .setColor('#f5f5f5')
      .setTimestamp()
      .setTitle('Sent!')
      .setDescription('Message has been sent')

    const cancelled = new MessageEmbed()
      .setColor('#f5f5f5')
      .setTimestamp()
      .setTitle('Cancelled')

    message.channel.send(Ready)
      .then(m => {
        m.react('✅')
        m.react('❌')
        const filter24 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const collector24 = m.createReactionCollector(filter24, { max: 1, time: 2 * 60 * 1000 });
        collector24.on('collect', () => {
          m.edit(sent)
          message.guild.members.cache.forEach(member => {
            member.send(Dms).catch(e => console.error(`Couldn't DM member ${member.user.tag}`));
          });
        })
        const filter25 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
        const collector25 = m.createReactionCollector(filter25, { max: 1, time: 2 * 60 * 1000 });
        collector25.on('collect', () => {
          m.edit(cancelled)
          setTimeout(() => {
            m.delete()
          }, 5000);
        })
      })

      } else {
        const NoData = new MessageEmbed()
        .setTitle('Not updated')
        .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        message.channel.send(NoData)
      }
    })
  
  }
}