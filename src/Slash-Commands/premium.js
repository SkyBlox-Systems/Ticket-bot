const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const ProKeys = require('../schemas/keys');
const { ObjectId } = require('mongodb');
const configg = require('../../slappey.json')

module.exports.data = new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Premium Command')
    .addStringOption(option =>
        option.setName('redeem')
            .setDescription('Put your premium code here')
            .setRequired(false));


module.exports.run = async (client, interaction) => {

    const notOwner = new EmbedBuilder()
        .setTitle('Owner only command!')
    if (interaction.user.id != interaction.guild.ownerId) {
        interaction.reply({ embeds: [notOwner] })
    }

    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            if (data.PaidGuild === 'Yes') {
                interaction.reply('This guild already has premium.')
            } else {
                const MSG = interaction.options.getString('redeem');
                ProKeys.findOne({ OwnerID: configg.BotOwnerID }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {

                        data1.Pro.forEach(async (element, i) => {
                            if (element === MSG) {
                                const foundcode = new EmbedBuilder()
                                    .setTitle('Premium')
                                    .setDescription(`The code **${MSG}** is a vaild existing code. Would you like to claim premium on this server?`)
                                const PremiumEmoji = await interaction.reply({ embeds: [foundcode], fetchReply: true })
                                PremiumEmoji.react('✅')
                                PremiumEmoji.react('❌')

                                const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                                const Collector1 = PremiumEmoji.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                                const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                                const Collector2 = PremiumEmoji.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                                Collector1.on('collect', () => {
                                    const needed = data1.Pro[0].i
                                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { PaidGuild: 'Yes', Tier: 'Premium', PremiumCode: MSG }, async (err2, data2) => {
                                        if (err2) throw err;
                                        if (data2) {
                                            data2.save()
                                            ProKeys.findOneAndUpdate({ OwnerID: configg.BotOwnerID}, {$pull: { Pro: MSG}}, async (err3, data3) => {
                                                if (err3) throw err;
                                                if (data3) {
                                                    interaction.channel.send('This guild is now a premium server! The code can no longer be used.')
                                                }
                                            })
                                        }
                                    })
                                })
                            } 
                                
                            

                        })
                        if (MSG === null) {
                            interaction.reply('No code is provided! If you are trying to buy premium, please buy it here https://ticketbot.sellix.io/')
                        } else {
                            if (data.PaidGuild === 'Yes') {
                                interaction.reply('This guild already has premium.')
                            }
                        }
                    }
                })

            }
        }

    })

}