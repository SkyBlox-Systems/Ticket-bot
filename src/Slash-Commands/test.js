const { SlashCommandBuilder } = require('@discordjs/builders');
const pagination = require('discordjs-button-pagination');
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')

module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')
    .addStringOption(option =>
        option.setName('reason')
            .setDescription('Add a reason to ticket')
            .setRequired(true));

module.exports.run = (client, interaction) => {
    // ProKeys.findOne({ OwnerID: '406164395643633665' }, async (err, data) => {
    //     if (err) throw err;
    //     if (data) {
        
    //         data.Pro.forEach((element, i) => {
    //             if (element === '') {
    //                 console.log(i)
    //             }
    //         //   if (i == 0) return;
    //         //   list += "\n" + element;
    //         })


    //     } else {
    //         data = new ProKeys({
    //             OwnerID: '406164395643633665',
    //             Pro: Array
    //         })
    //         data.save()
    //     }
    // })

    // console.log(interaction.guild.name)
    // const user = interaction.user.id
    // const paymentlink = stripe.paymentLinks.create({
    //     line_items: [{price: 'price_1K0uc5Fgu1qoPGq39KRZoG4Z', quantity: 1}],

    // })
    // interaction.reply('Please wait while we generate the url...')

    // setTimeout(() => {

    //     console.log(paymentlink)

    //     interaction.channel.send(`Here is the url for the payment ${paymentlink.url}. You have 3 minutes to do the payment, or the link will expire.`)

    //     setTimeout(() => {

    //         console.log(paymentlink)

    //     }, 60000);

    // }, 3000);
    //    ticketclaim.findOne({ id: interaction.user.id }, async (err, data) => {
    //        if (err) throw err;
    //        if (data) {
    //            interaction.reply('Data found')
    //        } else {
    //            interaction.reply('No data found')
    //        }
    //    })
    //     const test = new MessageEmbed()
    //     .setTitle('test')

    //    const message = interaction.channel.send({ embeds: [test], fetchReply: true})
    //    message.react('✅');
}