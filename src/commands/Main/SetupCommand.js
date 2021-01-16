const BaseCommand = require('../../utils/structures/BaseCommand');
const { Discord, Channel } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = class SetupCommand extends BaseCommand {
  constructor() {
    super('setup', 'Main', []);
  }

  async run(client, message, args, guild) {

    const Welcome = new MessageEmbed()
      .setTitle('Main Setup')
      .setDescription('Welcome to the main setup. Before we get everything ready for you, please read everything underneath:\n\n- The bot will make 2 new roles: `ticket manager` and `ticket support`. These two roles have different job and will be told soon\n- A category will be made called `support` in that channel, there will be 3 new channels: `Ticket`, `Staff-room` and `Transcript`.\n- Bot might lag at some point when making the transcript \n- transcript are random generated\n\nPlease react with ✅ if you are ready!')
      .setFooter('Got 2 minutes to react')
      .setColor('BLUE')

    const ready = new MessageEmbed()
      .setTitle('Started!')
      .setDescription('We have started!')
      .setColor('BLUE')

    const Done = new MessageEmbed()
      .setTitle('Finished')
      .setDescription('The setup have been completed. Please give the roles to the staff members who needs the following role: `ticket support` to help customers. Give Higher ranks `ticket managers`. You might need to move the channels around.')
      .setColor('GREEN')

    const Error = new MessageEmbed()
      .setTitle('Error')
      .setDescription('It seems like the setup has already been done. If you think this is an issue, please check your roles, channels and see if you do not have it already.')
      .setColor('RED')

    const ServerOwner = new MessageEmbed()
    .setTitle('Error')
    .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')
    .setColor('RED')

    const Maincategory = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'Support' && ch.type === 'category')

    if(message.author.id != message.guild.owner.id)
    return message.channel.send(ServerOwner);

    message.channel.send(Welcome)
      .then(m => {
        m.react('✅')
        const filter24 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const collector24 = m.createReactionCollector(filter24, { max: 1, time: 2 * 60 * 1000 }); // 
        collector24.on('collect', () => {
          m.edit(ready)

          if (message.guild.roles.cache.find(roles => roles.name === 'ticket manager')) {
            m.delete()
            message.channel.send(Error)
          } else {
            message.guild.roles.create({
              data: {
                name: 'ticket manager',
                color: 'BLUE',
              },
            })

            message.guild.roles.create({
              data: {
                name: 'ticket support',
                color: 'GREEN',
              },
            })


            const Supportcat = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "support" && ch.type == "category")

            message.guild.channels.create('Support', { type: 'category', position: 1 }).then(async (chan) => {
            })
            message.guild.channels.create('Ticket', { parent: Supportcat}).then(async (chan) => {
              chan.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
              })
            })
            message.guild.channels.create('Ticket-staff', { parent: Supportcat}).then(async (chan) => {
              chan.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: true,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Transcript', { parent: Supportcat}).then(async (chan) => {
              chan.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })
            message.guild.channels.create('Ticket-logs', { parent: Supportcat}).then(async (chan) => {
              chan.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket support'), {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: false,
                ATTACH_FILES: false,
              })
              chan.updateOverwrite(message.guild.roles.cache.find(roles => roles.name === 'ticket manager'), {
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true,
                MANAGE_CHANNELS: true,
                ATTACH_FILES: true,
              })
            })


            setTimeout(() => {
              m.edit(Done)
              const TranscriptChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'transcript' && ch.type == 'text');
              const TranscriptChannelMessage = new MessageEmbed()
                .setTitle('Transcript!')
                .setDescription('In this channel, this is where all of the close tickets and transcripts get logged. Only Ticket managers can talk in this channel.')
                .setColor('BLUE')
  
              const TicketChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket' && ch.type == 'text');
              const TicketChannelMessage = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('In this channel, You can only open a ticket. If you try and run the command in any other channel, it will not work. To make a ticket, please use the command `!ticket`.')
                .setColor('BLUE')
  
              const StaffroomChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-staff' && ch.type == 'text');
              const StaffroomChannelMessage = new MessageEmbed()
                .setTitle('Staff room')
                .setDescription('In this channel, This is where the support team hang out. You can chat to the managers and the team about the tickets. Nothing in this channel should be leaked at any time. Commands can be listed here: N/A.')
                .setColor('BLUE')

                const TicketLogsChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'ticket-logs' && ch.type == 'text');
                const TicketLogsChannelMessage = new MessageEmbed()
                .setTitle('Staff room')
                .setDescription('In this channel, this is where all of the tickets in this server will be logged. Such as: Close, add, remove, creation etc.')
                .setColor('BLUE')
                
               TranscriptChannel.send(TranscriptChannelMessage).then((msg) => msg.pin())
               TicketChannel.send(TicketChannelMessage).then((msg) => msg.pin())
               StaffroomChannel.send(StaffroomChannelMessage).then((msg) => msg.pin())
               TicketLogsChannel.send(TicketLogsChannelMessage).then((msg) => msg.pin())
            }, 5000);
          }

        })

      })
  }
}