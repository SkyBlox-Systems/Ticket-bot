const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const MainDatabase = require('../schemas/TicketData')
const mongoose = require('mongoose');
const { EmbedBuilder, Guild, MessageCollector, Collector } = require('discord.js');
var today = new Date();
var dd = String(today.getDate());
const { ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ComponentType, ChannelType, ButtonBuilder } = require('discord.js');
const paginationEmbed = require('discordjs-v14-pagination');


module.exports.data = new SlashCommandBuilder()
  .setName('settings')
  .setDescription('Settings Command')
  .addSubcommand(subcommand =>
    subcommand
    .setName('edit')
    .setDescription('Edit your guild settings'))
  .addSubcommand(subcommand =>
    subcommand
    .setName('view')
    .setDescription('View your guild settings'))
  .addSubcommand(subcommand =>
    subcommand
    .setName('auto')
    .setDescription('Auto insert your settings (Mainly only used on new guilds)'))
  .addSubcommand(subcommand => 
    subcommand
    .setName('second')
    .setDescription('Setup second guild'))


module.exports.run = async (client, interaction) => {

  const ServerOwner = new EmbedBuilder()
    .setTitle('Error')
    .setDescription('This command is restricted to guild owner only. Please do not try and use this command because you will not get anywhere.')

  


  if (interaction.options.getSubcommand() === 'view') {


    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.PaidGuild === 'Yes') {
          const ListSettingsPaid = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription(`List of the bot settings for the guild`)
            .addFields([
              { name: 'ServerID', value: `${data.ServerID}`, inline: true },
              { name: `TicketChannelID`, value: `${data.TicketChannelID}`, inline: true },
              { name: `TicketNumber`, value: `${data.TicketNumber}`, inline: true },
              { name: `TicketTrackerChannelID`, value: `${data.TicketTrackerChannelID}`, inline: true },
              { name: 'FeedbackChannelID', value: `${data.FeedbackChannelID}`, inline: true },
              { name: `Use Ticket Reactions`, value: `${data.UseTicketReactions}`, inline: true },
              { name: `Support Role`, value: `${data.SupportRoleID}`, inline: true },
              { name: `Manager Role`, value: `${data.ManagerRoleID}`, inline: true },
              { name: `Admin Role`, value: `${data.AdminRoleID}`, inline: true },
              { name: `Beta Key`, value: `${data.BetaKey}`, inline: true },
              { name: `Tier`, value: `${data.Tier}`, inline: true },
              { name: `Create Transcripts`, value: `${data.Transcript}`, inline: true },
              { name: `API Key`, value: `${data.APIKey}`, inline: true },
              { name: `Change Messages`, value: `List messages`, inline: true },
              { name: `ModMail`, value: `${data.ModMail}`, inline: true },
              { name: `Second Guild`, value: `${data.SecondServer}`, inline: true },
              { name: `Important Announcement`, value: `${data.Important}`, inline: true },
              { name: `Custom Code`, value: `${data.WebsiteCode}`, inline: true },
              { name: `Language`, value: `${data.Language}`, inline: true },
              { name: `Threads`, value: `${data.Threads}`, inline: true },
              { name: `Bot Version`, value: `${data.BotVersion}`, inline: true } 
            ])



          const ListSettingsPaid2 = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription(`List of the bot settings for the guild (premium only)`)
            .addFields([
              { name: `Voice Call Tickets`, value: `${data.VoiceTicket}`, inline: true },
              { name: `Amount of custom bots`, value: `${data.CustomBots}`, inline: true },
              { name: `Premium code`, value: `${data.PremiumCode}`, inline: true },
              { name: `Ticket ID Length`, value: `${data.TicketIDLength}`, inline: true},
              { name: 'Custom features', value: `Soon`, inline: true }
            ])
            const firstPageButton = new ButtonBuilder()
            .setCustomId('first')
            .setLabel('First')
            .setStyle(ButtonStyle.Primary);

          
          const previousPageButton = new ButtonBuilder()
            .setCustomId('previous')
            .setLabel('Previous')
            .setStyle(ButtonStyle.Danger);
          
          const nextPageButton = new ButtonBuilder()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle(ButtonStyle.Success);
          
          const lastPageButton = new ButtonBuilder()
            .setCustomId('last')
            .setLabel('Last')
            .setStyle(ButtonStyle.Primary);
            

          const pages = [
            ListSettingsPaid,
            ListSettingsPaid2
          ]
          const buttons  = [firstPageButton, previousPageButton, nextPageButton, lastPageButton];



          paginationEmbed(
            interaction, // The interaction object
            pages, // Your array of embeds
            buttons , // Your array of buttons
            60000, // (Optional) The timeout for the embed in ms, defaults to 60000 (1 minute)
        );
        } else {
          const ListSettings = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} bot settings`)
            .setDescription(`List of the bot settings for the guild`)
            .addFields([
              { name: 'ServerID', value: `${data.ServerID}`, inline: true },
              { name: `TicketChannelID`, value: `${data.TicketChannelID}`, inline: true },
              { name: `TicketNumber`, value: `${data.TicketNumber}`, inline: true },
              { name: `TicketTrackerChannelID`, value: `${data.TicketTrackerChannelID}`, inline: true },
              { name: 'FeedbackChannelID', value: `${data.FeedbackChannelID}`, inline: true },
              { name: `Use Ticket Reactions`, value: `${data.UseTicketReactions}`, inline: true },
              { name: `Support Role`, value: `${data.SupportRoleID}`, inline: true },
              { name: `Manager Role`, value: `${data.ManagerRoleID}`, inline: true },
              { name: `Admin Role`, value: `${data.AdminRoleID}`, inline: true },
              { name: `Beta Key`, value: `${data.BetaKey}`, inline: true },
              { name: `Tier`, value: `${data.Tier}`, inline: true },
              { name: `Create Transcripts`, value: `${data.Transcript}`, inline: true },
              { name: `API Key`, value: `${data.APIKey}`, inline: true },
              { name: `Change Messages`, value: `List messages`, inline: true },
              { name: `ModMail`, value: `${data.ModMail}`, inline: true },
              { name: `Second Guild`, value: `${data.SecondServer}`, inline: true },
              { name: `Important Announcement`, value: `${data.Important}`, inline: true },
              { name: `Custom Code`, value: `${data.WebsiteCode}`, inline: true },
              { name: `Language`, value: `${data.Language}`, inline: true },
              { name: `Threads`, value: `${data.Threads}`, inline: true },
              { name: `Bot Version`, value: `${data.BotVersion}`, inline: true } 
            ]);
          interaction.reply({ embeds: [ListSettings] })
        }
      }
    })
  }

  if (interaction.options.getSubcommand() === 'edit') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });

    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err01, data01) => {
      if (err01) throw err;
      if (data01) {

        const editdropdown = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('edit')
              .setPlaceholder('Nothing selected')
              .addOptions([
                {
                  label: 'Ticket Tracker Channel ID',
                  description: 'Change the Ticket Tracker Channel ID',
                  value: 'tracker',
                },
                {
                  label: 'Ticket Channel ID',
                  description: 'Change the Ticket Channel ID',
                  value: 'ticketchan',
                },
                {
                  label: 'Feedback Channel ID',
                  description: 'Change the Feedback Channel ID',
                  value: 'feedbackchann',
                },
                {
                  label: 'Support Role',
                  description: 'Change the Staff Support Role ID',
                  value: 'support',
                },
                {
                  label: 'Admin Role',
                  description: 'Change the Admin Support Role ID',
                  value: 'admin',
                },
                {
                  label: 'Manager Role',
                  description: 'Change the Manager Role ID',
                  value: 'manager',
                },
                {
                  label: 'Transcript',
                  description: `Enable or disable transcript (Currently ${data01.Transcript} in this guild)`,
                  value: 'transcript',
                },
                {
                  label: 'Tickets',
                  description: `Enable or disable tickets (Currently ${data01.EnableTicket})`,
                  value: 'tickets',
                },
                {
                  label: 'Mod Mail',
                  description: `Enable or disable ModMail (Currently ${data01.ModMail})`,
                  value: 'ModMail',
                },
                {
                  label: 'Voice Tickets',
                  description: `Enable or disable voice tickets (Currently ${data01.VoiceTicket} & premium only)`,
                  value: 'Voice',
                },
                {
                  label: 'API',
                  description: `Change, or view the current api code. Current key is ${data01.APIKey}`,
                  value: 'api',
                },
                {
                  label: 'Change Ticket ID Length',
                  description: `Change, or view the current length of the Ticket ID Creation. Current length size ${data01.TicketIDLength}`,
                  value: 'ticketid',
                },
                {
                  label: 'Second Server',
                  description: `Enable or disable second server. Currently ${data01.SecondServer}`,
                  value: 'secondserver',
                },
                {
                  label: 'Ticket Reactions',
                  description: `Enable or disable ticket reactions. Currently ${data01.UseTicketReactions}`,
                  value: 'reaction'
                },
                {
                  label: 'Roblox Tickets',
                  description: `Allow ROBLOX support tickets. Currently ${data01.ROBLOX}`,
                  value: 'roblox'
                },
                { 
                  label: 'Important Announcement',
                  description: 'Enable or disable important announcement after commands in this guild',
                  value: 'important'
                },
                {
                  label: 'Generate Code',
                  description: 'This is still WIP. This code will be used for our upcoming game and website support.',
                  value: 'codes'
                },
                { 
                  label: `Threads`,
                  description: `Enable or disable threads in your guild. Currently ${data01.Threads}`,
                  value: 'threads'
                }
              ]),
          );
        await interaction.reply({ content: `Edit settings \n You can also now edit your guild settings here https://dashboard.ticketbots.co.uk/settings/${interaction.guild.id}/`, components: [editdropdown], ephemeral: true });

        const MainCollector = interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.StringSelectMenuBuilder
        })
        MainCollector.on("collect", async (collected) => {
          const value = collected.values[0]
         

          if (value === 'tracker') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketTrackerChannelID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'ticketchan') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketChannelID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'feedbackchann') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { FeedbackChannelID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'support') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SupportRoleID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'admin') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { AdminRoleID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'manager') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { ManagerRoleID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'transcript') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });

            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.Transcript === 'Yes') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Transcript: "No" }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      const disabledtranscript = new EmbedBuilder()
                        .setTitle('Transcript has been disabled on this server.')

                      collected.reply({ embeds: [disabledtranscript] })

                    }
                  })
                } else {
                  if (data.Transcript === 'No') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Transcript: "Yes" }, async (err2, data2) => {
                      if (err2) throw err;
                      if (data2) {
                        data2.save()
                        const enabledtranscript = new EmbedBuilder()
                          .setTitle('Transcript has been enabled on this server.')
                        collected.reply({ embeds: [enabledtranscript] })
                      }
                    })
                  }
                }
              }
            })
          }

          if (value === 'tickets') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.EnableTicket === 'Enabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { EnableTicket: 'Disabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      const disabledtickets = new EmbedBuilder()
                        .setTitle('Tickets has been disabled on this server.')
                      collected.reply({ embeds: [disabledtickets] })
                    }
                  })
                } else {
                  if (data.EnableTicket === 'Disabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { EnableTicket: 'Enabled' }, async (err2, data2) => {
                      data2.save()
                      const enableddtickets = new EmbedBuilder()
                        .setTitle('Tickets has been enabled on this server.')
                      collected.reply({ embeds: [enableddtickets] })
                    })
                  }
                }
              }
            })
          }

          if (value === 'ModMail') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.ModMail === 'Enabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { ModMail: 'Disabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.reply(`ModMail has been disabled in this server.`)
                    }
                  })
                } else {
                  if (data.ModMail === 'Disabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { ModMail: 'Enabled' }, async (err2, data2) => {

                      if (err2) throw err;
                      if (data2) {
                        data2.save()
                        collected.reply(`ModMail has been enabled on this server.`)
                      }
                    })
                  }
                }
              } else {
              }
            })
          }

          if (value === 'Voice') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.PaidGuild === 'Yes') {
                  if (data.VoiceTicket === 'Disabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { VoiceTicket: 'Enabled' }, async (err2, data2) => {
                      if (err2) throw err;
                      if (data2) {
                        data2.save()
                        collected.reply('Voice tickets has been enabled on this server.')
                      }
                    })
                  } else if (data.VoiceTicket === 'Enabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { VoiceTicket: 'Disabled' }, async (err3, data3) => {
                      if (err3) throw err;
                      if (data3) {
                        data3.save()
                        collected.reply('Voice tickets has been disabled on this server.')
                      }
                    })
                  }
                }
              } else if (data.PaidGuild === 'No') {
                interaction.reply('This command can only be used by premium servers. Please upgrade here: https://ticketbot.sellix.io/')
              }
            })
          }

          if (value === 'api') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (data.APIKey === "N/A") {
                function makeURL(length) {
                  var result = '';
                  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                  var charactersLength = characters.length;
                  for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  }
                  return result;
                }
                const generator = makeURL(15)
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { APIKey: generator }, async (err06, data06) => {
                  if (err06) throw err06;
                  if (data06) {
                    data06.save()
                    const MainEmbed = new EmbedBuilder()
                      .setTitle('Done')
                      .setDescription('We have generated your API key')
                      .addFields([
                        { name: `API Key`, value: `${generator}`, inline: false },
                        { name: `Use it here`, value: `[Click Me]((http://api.ticketbots.co.uk/api/${generator})`, inline: false }
                      ])
                    collected.reply(({ embeds: [MainEmbed], ephemeral: true }))
                  }
                })
              } else {
                const AlreadyFoundAPIKey = new EmbedBuilder()
                  .setTitle('Error')
                  .setDescription(`You already have a API key linked to this server. If you want a new one, please react with a ✅. If you want to keep the current one, please react with ❌`)
                  .addFields([
                    { name: `API Key`, value: `${data.APIKey}`, inline: false }
                  ])

                const reactionerror = await collected.reply(({ embeds: [AlreadyFoundAPIKey], fetchReply: true }))
                reactionerror.react('✅')
                reactionerror.react('❌')

                const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                const Collector1 = reactionerror.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                const Collector2 = reactionerror.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                Collector1.on('collect', () => {
                  function makeURL2(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                      result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                  }
                  const generator2 = makeURL2(15)

                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { APIKey: generator2 }, async (err07, data07) => {
                    if (err07) throw err07;
                    if (data07) {
                      data07.save()
                      const MainEmbed2 = new EmbedBuilder()
                        .setTitle('Done')
                        .setDescription('We have generated your API key')
                        .addFields([
                          { name: `API Key`, value: `${generator2}`, inline: false },
                          { name: `Use it here`, value: `[Click Me](https://api.ticketbot.co.uk/api/${generator2})`, inline: false },
                        ])
                      interaction.channel.send(({ embeds: [MainEmbed2], ephemeral: true }))
                    }
                  })
                })
              }
            })
          }

          if (value === 'ticketid') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.PaidGuild === 'Yes') {
                  const EditMessage = new EmbedBuilder()
                    .setTitle('Edit')
                    .setDescription('Please type out the id you want to set?')
                  collected.reply({ embeds: [EditMessage], ephemeral: true })
                  const Filter = (m) => m.author.id === interaction.user.id;
                  const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

                  Collector.on('collect', m1 => {
                  })
                  Collector.on('end', async (m2) => {
                    const YouSureToUpdate = new EmbedBuilder()
                      .setTitle('You sure?')
                      .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

                    const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
                    YouSureUpdateEmbed.react('✅')
                    YouSureUpdateEmbed.react('❌')

                    const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                    const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                    const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                    const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                    Collector1.on('collect', () => {
                      interaction.channel.send({ content: 'Updated', ephemeral: true })
                      MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketIDLength: m2.first().content }, async (err1, data1) => {
                        if (err1) throw err;
                        if (data1) {
                          data1.save()
                        }
                      })
                    })
                    Collector2.on('collect', () => {
                      interaction.channel.send({ content: 'Cancelled', ephemeral: true })
                    })
                  })
                } else {
                  if (data.PaidGuild === 'No') {
                    collected.reply('This command can only be used by premium servers. Please upgrade here: https://ticketbot.sellix.io/')
                  }
                }
              } else {
                collected.reply('There is a issue getting this guild data.. Retrying...')
              }
            })
          }

          if (value === 'secondserver') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.SecondServer === 'Disabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServer: 'Enabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.reply('Second Server has been enabled on this guild')
                    }
                  })
                } else {
                  if (data.SecondServer === 'Enabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServer: 'Disabled' }, async (err1, data1) => {
                      if (err1) throw err;
                      if (data1) {
                        data1.save()
                        collected.reply('Second server has been disabled on this guild')
                      }
                    })
                  }
                }
              }
           })
          }
          if (value === 'reaction') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.UseTicketReactions === 'Yes') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { UseTicketReactions: 'No' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.reply('Tickets reactions has been disabled in this guild.')
                    }
                  })
                } else {
                  if (data.UseTicketReactions === 'No') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { UseTicketReactions: 'Yes' }, async (err1, data1) => {
                      if (err1) throw err;
                      if (data1) {
                        data1.save()
                        collected.reply('Ticket reactions has been enabled in this guild.')
                      }
                    })
                  }
                }
              }
            })
          }

          if (value === 'roblox') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.ROBLOX === 'Disabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { ROBLOX: 'Enabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.reply('Roblox support has now been enabled in this guild')
                    }
                  })
                } else {
                  if (data.ROBLOX === 'Enabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { ROBLOX: 'Disabled'}, async (err1, data1) => {
                      if (err1) throw err;
                      if (data1) {
                        data1.save()
                        collected.reply('Roblox support has now been disabled in this guild')
                      }
                    })
                  }
                }
              }
            })
          }

          if (value === 'important') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });

            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.Important === 'Disabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Important: 'Enabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.channel.send('Important announcement has been enabled on this guild')
                    }
                  })
                }
                if (data.Important === 'Enabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Important: 'Disabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.channel.send('Important announcement has been disabled on this guild')
                    }
                  })
                }
              }
            })
          }

          if (value === 'codes') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (data.WebsiteCode === "N/A") {
                function makeURL(length) {
                  var result = '';
                  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                  var charactersLength = characters.length;
                  for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                  }
                  return result;
                }
                const generator = makeURL(15)
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { WebsiteCode: generator }, async (err06, data06) => {
                  if (err06) throw err06;
                  if (data06) {
                    data06.save()
                    const MainEmbed = new EmbedBuilder()
                      .setTitle('Done')
                      .setDescription('We have generated your code')
                      .addFields([
                        { name: `Code`, value: `${generator}`, inline: false },
                        { name: `Note`, value: `This is still a WIP system. This code does nothing right now.`, inline: false },
                      ])
                    collected.reply(({ embeds: [MainEmbed], ephemeral: true }))
                  }
                })
              } else {
                const AlreadyFoundAPIKey = new EmbedBuilder()
                  .setTitle('Error')
                  .setDescription(`You already have a code linked to this server. If you want a new one, please react with a ✅. If you want to keep the current one, please react with ❌`)
                  .addFields([
                    { name: `Code`, value: `${data.WebsiteCode}`, inline: false },
                  ])

                const reactionerror = await collected.reply(({ embeds: [AlreadyFoundAPIKey], fetchReply: true }))
                reactionerror.react('✅')
                reactionerror.react('❌')

                const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
                const Collector1 = reactionerror.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
                const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
                const Collector2 = reactionerror.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

                Collector1.on('collect', () => {
                  function makeURL2(length) {
                    var result = '';
                    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    var charactersLength = characters.length;
                    for (var i = 0; i < length; i++) {
                      result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return result;
                  }
                  const generator2 = makeURL2(15)

                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { WebsiteCode: generator2 }, async (err07, data07) => {
                    if (err07) throw err07;
                    if (data07) {
                      data07.save()
                      const MainEmbed2 = new EmbedBuilder()
                      .setTitle('Done')
                      .setDescription('We have generated your code')
                      .addFields([
                        { name: `Code`, value: `${generator}`, inline: false },
                        { name: `Note`, value: `This is still a WIP system. This code does nothing right now.`, inline: false }
                      ])

                      interaction.channel.send(({ embeds: [MainEmbed2], ephemeral: true }))
                    }
                  })
                })
              }
            })
          }

          if (value === 'threads') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Edit settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return collected.reply({ embeds: [ServerOwner] });
            MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
              if (err) throw err;
              if (data) {
                if (data.Threads === 'Disabled') {
                  MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Threads: 'Enabled' }, async (err1, data1) => {
                    if (err1) throw err;
                    if (data1) {
                      data1.save()
                      collected.reply('Threads has been enabled within your guild.')
                    }
                  })
                } else {
                  if (data.Threads === 'Enabled') {
                    MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { Threads: 'Disabled' }, async (err1, data1) => {
                      if (err1) throw err;
                      if (data1) {
                        data1.save()
                        collected.reply('Threads has been disabled within your guild.')
                      }
                    })
                  }
                }
              }
            })
          }
        })


      }
    })

  }

  if (interaction.options.getSubcommand() === 'auto') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        const TicketChannelMain2 = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == ChannelType.GuildText)
        const FeedbackChannelID2 = interaction.guild.channels.cache.find(ch => ch.name.toLowerCase() == "feedback" && ch.type == ChannelType.GuildText)
        const TicketTrackerMain2 = interaction.guild.channels.cache.find(ch2 => ch2.name.toLowerCase() == `tickets: ${data.TicketNumber}` && ch2.type == ChannelType.GuildVoice)
        const SupportRoleMain2 = interaction.guild.roles.cache.find((r) => r.name === 'ticket support');
        const ManagerRoleMain2 = interaction.guild.roles.cache.find((r2) => r2.name === 'ticket manager');




        const AutoSetup = new EmbedBuilder()
          .setTitle('Settings')
          .setDescription('This is only suggested to be used if this is your first time using the bot on the server The following thing will be added to settings. React with ✅ to do the setup or react with ❌ to cancel')
          .addFields([
            { name: `TicketChannelID`, value: `${TicketChannelMain2.id}`, inline: true },
            { name: `TicketTrackerChannelID`, value: `${TicketTrackerMain2.id}`, inline: false },
            { name: `FeedbackChannelID`, value: `${FeedbackChannelID2.id}`, inline: false },
            { name: `Support Role`, value: `${SupportRoleMain2}`, inline: false },
            { name: `Manager Role`, value: `${ManagerRoleMain2}`, inline: false }
          ])


        const AutoSetupEmoji = await interaction.reply({ embeds: [AutoSetup], fetchReply: true })
        AutoSetupEmoji.react('✅')
        AutoSetupEmoji.react('❌')

        const Filter33 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
        const Collector33 = AutoSetupEmoji.createReactionCollector({ filter: Filter33, max: 1, time: 2 * 60 * 1000 });
        const Filter34 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
        const Collector34 = AutoSetupEmoji.createReactionCollector({ filter: Filter34, max: 1, time: 2 * 60 * 1000 });

        Collector33.on('collect', () => {
          MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { TicketChannelID: TicketChannelMain2.id, TicketTrackerChannelID: TicketTrackerMain2.id, FeedbackChannelID: FeedbackChannelID2.id, SupportRoleID: SupportRoleMain2.id, ManagerRoleID: ManagerRoleMain2.id }, async (err9, data9) => {
            if (err9) throw err9;
            if (data9) {
              data9.save()
              interaction.channel.send('Updated!')
            }
          })
        })

        Collector34.on('collect', () => {
          interaction.channel.send('Cancelled')
        })
      }
    }
    )
  }

  if (interaction.options.getSubcommand() === 'second') {
    if (interaction.user.id != interaction.guild.ownerId)
      return interaction.reply({ embeds: [ServerOwner] });
    MainDatabase.findOne({ ServerID: interaction.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        if (data.SecondServer === 'Disabled')
          return interaction.reply('This command can not be used as the feature is disabled within this guild.')
        const editdropdown = new ActionRowBuilder()
          .addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('edit')
              .setPlaceholder('Nothing selected')
              .addOptions([
                {
                  label: 'View',
                  description: 'View the current settings',
                  value: 'view',
                },
                {
                  label: 'Guild ID',
                  description: 'Change the second Guild ID',
                  value: 'id',
                },
                {
                  label: 'Support role ID',
                  description: 'Change the second guild support role ID',
                  value: 'supportrole',
                },
                {
                  label: 'Admin role ID',
                  description: 'Change the second guild admin role ID',
                  value: 'adminrole',
                },
                {
                  label: 'Manager role ID',
                  description: 'Change the second guild manager role ID',
                  value: 'mangerrole',
                },
                {
                  label: 'Claim ticket channel ID',
                  description: 'Change the channel ID for the second guild',
                  value: 'claimid'
                },
                {
                  label: 'Logs channel ID',
                  description: 'Change the channel ID for the second guild',
                  value: 'logsid'
                },
                {
                  label: 'Transcript channel ID',
                  description: 'Change the channel ID for the second guild',
                  value: 'transcriptid'
                },
              ]),
          );
        await interaction.reply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true });

        const MainCollector = interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.StringSelectMenuBuilder
        })
        MainCollector.on("collect", async (collected) => {
          const value = collected.values[0]

          if (value === 'view') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (data.TypeOfServer == 'First') {
              const MainEmbed = new EmbedBuilder()
                .setTitle('View second guild')
                .setDescription('List of the bot settings for the guild')
                .addFields([
                  { name: `Second guild`, value: `${data.SecondServer}`, inline: true },
                  { name: `Guild ID`, value: `${data.SecondServerID}`, inline: true },
                  { name: `Support Role ID,`, value: `${data.SecondServerSupportRoleID}`, inline: true },
                  { name: `Admin Role ID`, value: `${data.SecondServerAdminRoleID}`, inline: true },
                  { name: `Manager Role ID`, value: `${data.SecondServerManagerRoleID}`, inline: true },
                  { name: `Claim ticket channel ID`, value: `${data.SecondServerClaimChannel}`, inline: true },
                  { name: `Logs channel ID`, value: `${data.SecondServerLogsChannel}`, inline: true },
                  { name: `Transcript channel ID`, value: `${data.SecondServerTranscriptChannel}`, inline: true}
                ])

               collected.reply({ embeds: [MainEmbed], ephemeral: true })

            } else {
              if (data.TypeOfServer === 'Second') {
                const MainEmbed = new EmbedBuilder()
                  .setTitle('View first guild')
                  .setDescription('List of the bot settings for the guild')
                  .addFields([
                    { name: `First guild`, value: `${data.SecondServer}`, inline: true },
                    { name: `Guild ID`, value: `${data.SecondServerID}`, inline: true },
                    { name: `Support Role ID`, value: `${data.SecondServerSupportRoleID}`, inline: true },
                    { name: `Admin Role ID`, value: `${data.SecondServerAdminRoleID}`, inline: true },
                    { name: `Manager Role ID`, value: `${data.SecondServerManagerRoleID}`, inline: true },
                    { name: `Claim ticket channel ID`, value: `${data.SecondServerClaimChannel}`, inline: true },
                    { name: `Logs channel ID`, value: `${data.SecondServerLogsChannel}`, inline: true },
                    { name: `Transcript channel ID`, value: `${data.SecondServerTranscriptChannel}`, inline: true }
                  ])

                collected.reply({ embeds: [MainEmbed], ephemeral: true })

              } 
            }
          }

          if (value === 'id') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'supportrole') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerSupportRoleID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'mangerrole') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerManagerRoleID: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'claimid') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerClaimChannel: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'logsid') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerLogsChannel: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }

          if (value === 'transcriptid') {
            editdropdown.components[0].setDisabled(true)
            interaction.editReply({ content: 'Second Server settings', components: [editdropdown], ephemeral: true })
            if (interaction.user.id != interaction.guild.ownerId)
              return interaction.reply({ embeds: [ServerOwner] });
            const EditMessage = new EmbedBuilder()
              .setTitle('Edit')
              .setDescription('Please type out the id you want to set?')
            collected.reply({ embeds: [EditMessage], ephemeral: true })
            const Filter = (m) => m.author.id === interaction.user.id;
            const Collector = new MessageCollector(interaction.channel, { filter: Filter, max: 1 });

            Collector.on('collect', m1 => {
            })
            Collector.on('end', async (m2) => {
              const YouSureToUpdate = new EmbedBuilder()
                .setTitle('You sure?')
                .setDescription(`You sure that you want to change it to ${m2.first().content}?`)

              const YouSureUpdateEmbed = await interaction.channel.send({ embeds: [YouSureToUpdate], fetchReply: true, ephemeral: true })
              YouSureUpdateEmbed.react('✅')
              YouSureUpdateEmbed.react('❌')

              const Filter1 = (reaction, user) => reaction.emoji.name === '✅' && user.id === interaction.user.id;
              const Collector1 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
              const Filter2 = (reaction, user) => reaction.emoji.name === '❌' && user.id === interaction.user.id;
              const Collector2 = YouSureUpdateEmbed.createReactionCollector({ filter: Filter2, max: 1, time: 2 * 60 * 1000 });

              Collector1.on('collect', () => {
                interaction.channel.send({ content: 'Updated', ephemeral: true })
                MainDatabase.findOneAndUpdate({ ServerID: interaction.guild.id }, { SecondServerTranscriptChannel: m2.first().content }, async (err1, data1) => {
                  if (err1) throw err;
                  if (data1) {
                    data1.save()
                  }
                })
              })
              Collector2.on('collect', () => {
                interaction.channel.send({ content: 'Cancelled', ephemeral: true })
              })
            })
          }
        })
      }
    })
  }
}