const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { EmbedBuilder  } = require('discord.js');
const MainDatabase = require('../schemas/TicketData')

module.exports.data = new SlashCommandBuilder()
    .setName('add')
    .setDescription('add Command')
    .addStringOption(option =>
        option.setName('id')
            .setDescription('User ID you want to add.')
            .setRequired(true));

    module.exports.run = (client, interaction) => {
      if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
        const NoPerms = new EmbedBuilder()
            .setTitle('Error')
            .setDescription('The command you tried to run is only allowed to be used on Ticket staff members only')
            return interaction.reply({ embeds: [NoPerms] })
      }

        const usertoadd = interaction.options.getString('id')

        MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
            if (err01) throw err01;
            if (data01) {
              const perms = new EmbedBuilder()
            .setColor('#FF0000')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You don't have the following permissions: Manage_message.`)
      
          const invaild = new EmbedBuilder()
            .setColor('#FF0000')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You didn't mention a user, or you gave an invaild id.`)
      
          const NoMessage = new EmbedBuilder()
            .setColor('#FF0000')
            .setTimestamp()
            .setTitle(`Error`)
            .setDescription(`You did not specify your message`)
      
          const Added = new EmbedBuilder()
            .setColor('#00FF00')
            .setTimestamp()
            .setTitle('Added')
            .setDescription(`<@${interaction.user.id}> have added you to the following ticket <#${interaction.channel.id}>`)
      
          if (!interaction.channel.name.startsWith("ticket-")) return interaction.reply("This is not a valid ticket")
          if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
            return interaction.reply({ embeds: [perms]});
          let user =
            interaction.mentions.members.first() ||
            interaction.guild.members.cache.get(args[0]);
          if (!user)
            return interaction.reply({ embeds: [invaild]});
          user.user
            .send(Added)
          interaction.channel.permissionOverwrites.edit(user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            ATTATCH_FILES: true,
            MANAGE_CHANNELS: false,
          })
          const Logs = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == ChannelType.GuildText)
          .then(() => Logs.send(`Added ${user.user.tag} to the following ticket <@${interaction.channel.id}>`))
            .then(() => interaction.reply(`Added ${user.user.tag} to this ticket!`));
            } else {
              const NoData = new EmbedBuilder()
                .setTitle('Not updated')
                .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)
      
              interaction.reply({ embeds: [NoData]})
            }
          })

    }