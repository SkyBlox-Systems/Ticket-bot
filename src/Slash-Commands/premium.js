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

module.exports.run = async (client, interaction) => {


    const notOwner = new EmbedBuilder()
        .setTitle('Owner only command!')
    if (interaction.user.id != interaction.guild.ownerId) {
        interaction.reply({ embeds: [notOwner] })
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
                if (data.PremiumCode === 'Old') {
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