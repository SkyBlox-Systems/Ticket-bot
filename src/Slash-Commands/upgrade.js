const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');
const database = require('../schemas/TicketData')
const { BotVersions } = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('upgrade')
    .setDescription('upgrade bot')



    module.exports.run = (client, interaction) => {

       // const msg =  interaction.channel.send(`upgrade..`);
 
       const ServerOwner = new MessageEmbed()
       .setTitle('Error')
       .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')

       if (interaction.user.id != interaction.guild.ownerId)
            return message.channel.send({ embeds: [ ServerOwner ]});
        
        database.findOne({ ServerID: interaction.guildId}, async (err, data) => {
            if (err) throw err;
            if (data) {
                if(data.BotVersion !== '3.1') {
                    database.findOneAndUpdate({ ServerID: interaction.guildId}, { BotVersion: BotVersions }, async (err2, data2) => {
                        if (err2) throw err;
                        if (data2) {
                            data2.save()
                            const updated = new MessageEmbed()
                            .setTitle('The bot has now been updated')
                            .setDescription(`To find the changes, please head here [Change Log](https://docs.ticketbot.tk/change-log)`)
                            interaction.reply({ embeds: [updated] })
                        }
                    })
                } else {
                    if(data.BotVersion === BotVersions) {
                        const alreadyupdated = new MessageEmbed()
                        .setTitle('Bot in this guild is already on the updated version. ')

                        interaction.reply({ embeds: [alreadyupdated] })
                    }
                }
            }
        })

    }