const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../package.json');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');
const core = os.cpus()[0];
const { MessageEmbed, version: djsversion} = require('discord.js');

var total_memory = os.totalmem(); 
var total_mem_in_kb = total_memory/1024; 
var total_mem_in_mb = total_mem_in_kb/1024; 
var total_mem_in_gb = total_mem_in_mb/1024; 
   
total_mem_in_gb = Math.floor(total_mem_in_gb); 
   
total_mem_in_mb = total_mem_in_mb%1024; 
total_mem_in_kb = total_mem_in_kb%1024; 
total_memory = total_memory%1024; 

module.exports.data = new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Bot Info Command')

    module.exports.run = (client, interaction) => {
        const embed = new MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('Bot Stats')
            .setColor('RANDOM')
            .addFields(
                {
                    name: '🌐 Servers',
                    value: `**❯** Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Channels',
                    value: `**❯** Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👥 Server Users',
                    value: `**❯** Serving ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `**❯** ${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Join Date',
                    value: `**❯** ${client.user.createdAt}`,
                    inline: true
                },
                {
                    name: 'Main Bot info',
					value: `**❯** Cores: ${os.cpus().length} \n**❯** Core Model: ${core.model} \n**❯** Ram: ${total_mem_in_gb}GB` ,
                    inline: true
                }
            )
          

         interaction.reply({ embeds: [embed]})
    }