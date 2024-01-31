const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const ProKeys = require('../schemas/keys');
const { ObjectId } = require('mongodb');
const config = require('../../slappey.json')
const sellix = require("@sellix/node-sdk")(config.StoreCode);


module.exports.data = new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Premium Command')
    .addSubcommand(subcommand =>
        subcommand
            .setName('view')
            .setDescription('View your premium settings'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('redeem')
            .setDescription('Add ticket bot pro to your guild')
            .addStringOption(option =>
                option.setName('code')
                    .setDescription('Enter the code you would like to redeem. (Code should be sent via email)')
                    .setRequired(true)));


module.exports.run = async (client, interaction) => {


    const notOwner = new EmbedBuilder()
        .setTitle('Owner only command!')
    if (interaction.user.id != interaction.guild.ownerId) {
        interaction.reply({ embeds: [notOwner] })
    }

    if (interaction.options.getSubcommand() === 'redeem') {
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.PaidGuild === 'Yes') {
                    interaction.reply('This guild already has premium.')
                } else {
                    const MSG = interaction.options.getString('code');
                    ProKeys.findOne({ OwnerID: '406164395643633665' }, async (err1, data1) => {
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

                                    Collector1.on('collect', async () => {

                                        try {
                                            const needed = data1.Pro[0].i
                                            const hardwarePayload = {
                                                key: MSG,
                                                product_id: config.product_ids
                                            };
                                            const hardware = await sellix.products.licensing.check(hardwarePayload);
                                            console.log(hardware)

                                            const toTimestamp = (strDate) => {
                                                const dt = new Date(strDate).getTime();
                                                return dt / 1000;
                                            }

                                            MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { PaidGuild: 'Yes', Tier: 'Premium', PremiumCode: MSG, PremiumExpire: toTimestamp(hardware.expires_at) }, async (err2, data2) => {
                                                if (err2) throw err;
                                                if (data2) {
                                                    data2.save()
                                                    ProKeys.findOneAndUpdate({ OwnerID: '406164395643633665' }, { $pull: { Pro: MSG } }, async (err3, data3) => {
                                                        if (err3) throw err;
                                                        if (data3) {
                                                            interaction.channel.send('This guild is now a premium server! The code can no longer be used.')
                                                        }
                                                    })
                                                }
                                            })
                                        } catch (e) {
                                            console.log(e)
                                        }

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

    if (interaction.options.getSubcommand() === 'view') {

        const toTimestamp = (strDate) => {
            const dt = new Date(strDate).getTime();
            return dt / 1000;
        }
        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                if (data.PaidGuild === 'No') {
                    interaction.reply('This guild is not premium')
                }
                if (data.PremiumCode === 'Old System') {
                    interaction.reply('This is using the old system. You can not use the view command')
                } else {
                    const hardwarePayload = {
                        key: data.PremiumCode,
                        product_id: config.product_ids
                    };
                    const hardware = await sellix.products.licensing.check(hardwarePayload);
                    const MainEmbed = new EmbedBuilder()
                        .setTitle('Premium')
                        .setDescription('Information of premium')
                        .addFields([
                            { name: 'Key', value: `${hardware.license_key}`, inline: true },
                            { name: 'Uses', value: `${hardware.uses}`, inline: true },
                            { name: 'Created At', value: `<t:${toTimestamp(hardware.created_at)}:f>`, inline: true },
                            { name: 'Expires', value: `<t:${toTimestamp(hardware.expires_at)}:f>`, inline: true },
                            { name: 'Updated', value: `<t:${toTimestamp(hardware.updated_at)}:f>`, inline: true }
                        ])
                    interaction.reply({ embeds: [MainEmbed] })
                }
            }
        })
    }


}