const BaseCommand = require('../../utils/structures/BaseCommand');
const blacklist = require('../../schemas/Blacklist-schema');
const mongoose = require('mongoose');
const { Message } = require('discord.js');
const {MessageEmbed} = require('discord.js');


module.exports = class BlacklistCommand extends BaseCommand {
    constructor() {
        super('blacklist', 'Admin', []);
    }

    async run(client, message, args) {
        const User = message.guild.members.cache.get(args[0])
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {

                const Already = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`**${User.displayName}** has already been blacklisted!`)
                .setColor('#f6f7f8')


                message.channel.send(Already)
            } else {
                data = new blacklist({ id : User.user.id })
                data.save()
                .catch(err => console.log(err))

                const Added = new MessageEmbed()
                .setTitle('Blacklist')
                .setDescription(`${User.user.tag} has been added to blacklist.`)
                .setColor('#f6f7f8')

            message.channel.send(Added)
            }
           
        })
    }
}