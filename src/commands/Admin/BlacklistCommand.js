const BaseCommand = require('../../utils/structures/BaseCommand');
const blacklist = require('../../schemas/Blacklist-schema');
const mongoose = require('mongoose');
const { Message } = require('discord.js');
const {MessageEmbed} = require('discord.js');
const currentDateAndTime = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });



module.exports = class BlacklistCommand extends BaseCommand {
    constructor() {
        super('blacklist', 'Admin', []);
    }

    async run(client, message, args) {
        if (message.author.id !== '406164395643633665') {
            const NotOwner = new MessageEmbed()
              .setColor('RANDOM')
              .setTimestamp()
              .setTitle('Help')
              .setDescription('You cannot use the following the command: `!blacklist`. The command is only available for the owner.')
            return message.channel.send({ embeds: [NotOwner]})
          }

        const MSG = args.slice(1).join(" ")
      if (!MSG) return message.channel.send('No reason is provided.')
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ UserID : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {

                const Already = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`**${User.displayName}** has already been blacklisted! Reason is provided below`)
                .addField('Reason', `${data.Reason}`)
                .addField('Time', `${data.Time} UTC`)
                .addField('Admin', `${message.author.tag}`)
                .setColor('#f6f7f8')


                message.channel.send({ embeds: [Already]})
            } else {
                data = new blacklist({ 
                    UserID: User.user.id,
                    Reason: MSG,
                    Time: currentDateAndTime,
                    Admin: message.author.tag,
                })
                data.save()
                .catch(err => console.log(err))

                const Added = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`${User.user.tag} has been added to blacklist.`)
                .addField('Reason', `${MSG}`)
                .addField('Time', `${currentDateAndTime} UTC`)
                .addField('Admin', `${message.author.tag}`)
                .setColor('#f6f7f8')

            message.channel.send({ embeds: [Added]})
            }
           
        })
    }
}