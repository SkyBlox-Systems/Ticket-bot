const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Discord = require('discord.js');

module.exports.data = new SlashCommandBuilder()
    .setName('guild-dm')
    .setDescription('guild dm Command')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Click which one you want to select')
            .setRequired(true)
            .addChoices({
                name: 'christmas',
                value: 'christmas'
            })
            .addChoices({
                name: 'normal',
                value: 'normal'
            }))
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Require the message you want to send')
            .setRequired(false));


module.exports.run = (client, interaction) => {

    if (interaction.user.id !== '406164395643633665') {
        const NotOwner = new EmbedBuilder()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Help')
            .setDescription('You cannot use the following the command: `/guilddm`. The command is only available for the owner.')
        return interaction.reply(NotOwner)
    }
    interaction.reply('Server')


    const teststring = interaction.options.getString('category');

    if (teststring === 'normal') {
        client.guilds.cache.forEach(async (guild) => {

            const invites = []
    
            const messageforuser =  interaction.options.getString('message');
    
            const test = await guild.invites.fetch()
    
            const dmowner = client.users.cache.get(guild.ownerId)
    
            const DM = new EmbedBuilder()
            .setTitle('New DM')
            .setDescription('You have received a DM from the bot owner. If this message duplicates, it means you have more than 1 guild with our bot in. The message what the owner provided is below')
            .addFields([
                {name: 'Message', value: `${messageforuser}`}
            ])
    
            dmowner.send({ embeds: [DM]})
        })
    
    } 
    if (teststring === 'christmas') {
        client.guilds.cache.forEach(async (guild) => {

            const invites = []
    
            const messageforuser =  interaction.options.getString('message');
    
            const test = await guild.invites.fetch()
    
            const dmowner = client.users.cache.get(guild.ownerId)
    
            const DM = new EmbedBuilder()
            .setTitle('⚠️ Christmas and New Year Update ⚠️')
            .setDescription(`Hello everyone, \n\n My name is Richard and im the founder of Ticket Bot. We are letting you know some important dates and a giveaway what is coming to ticket Bot. As we all know, it's December. We all know it's nearly the end of the year and off course Christmas. We are announceing that on the following dates and times below, we will be disabling Ticket Creations. \n\n <t:1703419200:f> until <t:1703592000:f> \n <t:1703937600:f> until <t:1704369600:f> \n\n We are doing this because we want everyone to enjoy the holiday and take a break from doing support. And now onto the good news! \n\n We are doing a giveaway (Share this with your guild). Starting from now until <t:1703332800:f> we are doing a Ticket Bot giveaway. We are giving out x1 $100, 1x $50 and x2 $25 paypal cash as way to say thank you. To enter, all you have to do is to: \n /christmas-giveaway \n\n Thank you for this year. And I can't wait for the future with you all! \n SkyBlox Systems LTD`)
            .setImage('https://cdn.discordapp.com/attachments/1089099881324478505/1180227462408446034/News.png?ex=657ca77a&is=656a327a&hm=1162c9fe8bac2fdb8132c75a66a5cc1e77a6861038ec1398ccd4900dc9c578f9&')
    
            dmowner.send({ embeds: [DM]})
        })
    }


}