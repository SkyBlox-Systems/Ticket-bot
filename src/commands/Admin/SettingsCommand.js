const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
const MainDatabase = require('../../schemas/TicketData')
var today = new Date();
var dd = String(today.getDate());
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class SettingsCommand extends BaseCommand {
  constructor() {
    super('settings', 'Admin', []);
  }



  async run(client, message, args) {
    

    const ServerOwner = new MessageEmbed()
      .setTitle('Error')
      .setDescription('This command is restricted to server owner only. Please do not try and use this command because you will not get anywhere.')


    const MainMessage = new MessageEmbed()
      .setTitle('Settings')
      .setDescription('List settings 1️⃣ \nEdit settings 2️⃣\nAuto insert settings 3️⃣')

    message.channel.send({ embeds: [ MainMessage] })
      .then(m => {
        m.react('1️⃣')
        m.react('2️⃣')
        m.react('3️⃣')

        const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        const Collector1 = m.createReactionCollector({ filter: Filter1, max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        const Collector2 = m.createReactionCollector({ filter: Filter2,  max: 1, time: 2 * 60 * 1000 });
        const Filter32 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
        const Collector32 = m.createReactionCollector({ filter: Filter32,  max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOne({ ServerID: message.guildId }, async (err1, data1) => {
            if (err1) throw err1;
            if (data1) {
              const ListSettings = new MessageEmbed()
                .setTitle(`${message.guild.name} bot settings`)
                .setDescription('List of the bot settings for the server.')
                .addField(`ServerID`, `${data1.ServerID}`, true)
                .addField(`TicketChannelID`, `${data1.TicketChannelID}`, true)
                .addField(`TicketNumber`, `${data1.TicketNumber}`, true)
                .addField(`TicketTrackerChannelID`, `${data1.TicketTrackerChannelID}`, true)
                .addField(`Prefix`, `${data1.BotPrefix}`, true)
                .addField(`Support Role`, `${data1.SupportRoleID}`, true)
                .addField('Manager Role', `${data1.ManagerRoleID}`, true)
                .addField(`Admin Role`, `${data1.AdminRoleID}`, true)
                .addField(`Beta Key`, `${data1.BetaKey}`, true)
                .addField(`Paid Guild`, `${data1.PaidGuild}`, true)
                .addField(`Create Transcripts`, `${data1.Transcript}`, true)
                .addField('API Key', `${data1.APIKey}`, true)
                .addField('ModMail', `${data1.ModMail}`, true)
                .addField(`Bot Version`, `${data1.BotVersion}`, true)


              message.channel.send({ embeds: [ ListSettings ]})
            } else {

              const ListSettingsError = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Failed to load settings. This can be caused because the server owner did not set the server up correctly or have not run ${client.prefix}install or ${client.prefix}update or ${client.prefix}setup`)

              message.channel.send({ embeds: [ListSettingsError ]})
            }
          })
        })

        Collector2.on('collect', () => {
          if (message.author.id != message.guild.ownerId)
            return message.channel.send({ embeds: [ ServerOwner ]});

          MainDatabase.findOne({ ServerID: message.guildId }, async (err2, data2) => {
            if (err2) throw err2;
            if (data2) {
              const ListSettings2 = new MessageEmbed()
                .setTitle(`${message.guild.name} bot settings`)
                .setDescription('List of the bot settings for the server.')
                .addField(`ServerID`, `${data2.ServerID}`, true)
                .addField(`TicketChannelID 1️⃣`, `${data2.TicketChannelID}`, true)
                .addField(`TicketNumber`, `${data2.TicketNumber}`, true)
                .addField(`TicketTrackerChannelID 2️⃣`, `${data2.TicketTrackerChannelID}`, true)
                .addField(`Prefix 3️⃣`, `${data2.BotPrefix}`, true)
                .addField(`Support Role 4️⃣`, `${data2.SupportRoleID}`, true)
                .addField('Manager Role 5️⃣', `${data2.ManagerRoleID}`, true)
                .addField(`Admin Role 6️⃣`, `${data2.AdminRoleID}`, true)
                .addField(`Beta Key`, `${data2.BetaKey}`, true)
                .addField(`Paid Guild`, `${data2.PaidGuild}`, true)
                .addField(`Create Transcripts 7️⃣`, `${data2.Transcript}`, true)
                .addField(`Ticket reactions (Soon)`, `${data2.UseTicketReactions}`, true)
                .addField(`Dashboard (soon)`, `${data2.UseDashboard}`, true)
                .addField(`API Key 8️⃣`, `${data2.APIKey}`, true)
                .addField('Change Messages 9️⃣', `List Message`, true)
                .addField('Creation of Tickets 🔟', `${data2.EnableTicket}`, true)
                .addField('ModMail 🔢', `${data2.ModMail}`, true)
                .addField(`Bot Version`, `${data2.BotVersion}`, true)

              message.channel.send({ embeds: [ ListSettings2 ]})
                .then(m1 => {
                  m1.react('1️⃣')
                  m1.react('2️⃣')
                  m1.react('3️⃣')
                  m1.react('4️⃣')
                  m1.react('5️⃣')
                  m1.react('6️⃣')
                  m1.react('7️⃣')
                  m1.react('8️⃣')
                  m1.react('9️⃣')
                  m1.react('🔟')
                  m1.react('🔢')

                  const Filter3 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
                  const Collector3 = m1.createReactionCollector({ filter: Filter3,  max: 1, time: 2 * 60 * 1000 });

                  const Filter6 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
                  const Collector6 =  m1.createReactionCollector({ filter: Filter6,  max: 1, time: 2 * 60 * 1000 });

                  const Filter9 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
                  const Collector9 =  m1.createReactionCollector({ filter: Filter9,  max: 1, time: 2 * 60 * 1000 });

                  const Filter12 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
                  const Collector12 =  m1.createReactionCollector({ filter: Filter12,  max: 1, time: 2 * 60 * 1000 });

                  const Filter13 = (reaction, user) => reaction.emoji.name === '5️⃣' && user.id === message.author.id;
                  const Collector13 =  m1.createReactionCollector({ filter: Filter13,  max: 1, time: 2 * 60 * 1000 });

                  const Filter14 = (reaction, user) => reaction.emoji.name === '6️⃣' && user.id === message.author.id;
                  const Collector14 =  m1.createReactionCollector({ filter: Filter14,  max: 1, time: 2 * 60 * 1000 });

                  const Filter26 = (reaction, user) => reaction.emoji.name === '7️⃣' && user.id === message.author.id;
                  const Collector26 =  m1.createReactionCollector({ filter: Filter26,  max: 1, time: 2 * 60 * 1000 });

                  const Filter27 = (reaction, user) => reaction.emoji.name === '8️⃣' && user.id === message.author.id;
                  const Collector27 =  m1.createReactionCollector({ filter: Filter27,  max: 1, time: 2 * 60 * 1000 });

                  const Filter35 = (reaction, user) => reaction.emoji.name === '9️⃣' && user.id === message.author.id;
                  const Collector35 =  m1.createReactionCollector({ filter: Filter35,  max: 1, time: 2 * 60 * 1000 });

                  const Filter52 = (reaction, user) => reaction.emoji.name === '🔟' && user.id === message.author.id;
                  const Collector52 =  m1.createReactionCollector({ filter: Filter52,  max: 1, time: 2 * 60 * 1000 });

                  const Filter53 = (reaction, user) => reaction.emoji.name === '🔢' && user.id === message.author.id;
                  const Collector53 = m1.createReactionCollector({ filter: Filter53, max: 1, time: 2 * 60 * 1000 }); 



                  Collector3.on('collect', () => {
                    const ServerIDEmbed = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed ]}))

                    const Filter4 = (m2) => m2.author.id == message.author.id
                    const Collector4 = new MessageCollector(message.channel, { filter: Filter4,  max: 1 });

                    Collector4.on('collect', m3 => {
                      console.log(m3.content)
                    })
                    Collector4.on('end', m4 => {
                      const YouSureToUpdate1 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m4.first().content}?`)
                      message.channel.send(({ embeds: [ YouSureToUpdate1 ]}))
                        .then(m5 => {
                          m5.react('✅')

                          const Filter5 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector5 = m5.createReactionCollector({ filter: Filter5,  max: 1, time: 2 * 60 * 1000 });
                          Collector5.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { TicketChannelID: m4.first().content }, async (err3, data3) => {
                              if (err3) throw err3;
                              if (data3) {
                                data3.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })

                        })
                    })
                  })

                  Collector26.on('collect', () => {
                    if (data2.Transcript === "Yes") {
                      MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { Transcript: "No" }, async (err04, data04) => {
                        if (err04) throw err04;
                        if (data04) {
                          data04.save()
                          message.channel.send('Transcript has been disabled on this server.')
                        }
                      })
                    } else {
                      MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { Transcript: "Yes" }, async (err05, data05) => {
                        if (err05) throw err05;
                        if (data05) {
                          data05.save()
                          message.channel.send('Transcript has been enabled on this server.')
                        }
                      })
                    }
                  })

                  Collector27.on('collect', () => {

                    if (data2.APIKey === "N/A") {
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
                      MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { APIKey: generator }, async (err06, data06) => {
                        if (err06) throw err06;
                        if (data06) {
                          data06.save()
                          const MainEmbed = new MessageEmbed()
                            .setTitle('Done')
                            .setDescription('We have generated your API key')
                            .addField(`API Key`, `${generator}`)
                            .addField('Use it here', `[Click Me](https://api.ticketbots.tk/api/${generator})`)
                          message.channel.send(({ embeds: [ MainEmbed ]}))
                        }
                      })
                    } else {
                      const AlreadyFoundAPIKey = new MessageEmbed()
                        .setTitle('Error')
                        .setDescription(`You already have a API key linked to this server. If you want a new one, please react with a ✅. If you want to keep the current one, please react with ❌`)
                        .addField(`API Key`, `${data2.APIKey}`)

                      message.channel.send(({ embeds: [ AlreadyFoundAPIKey ]}))
                        .then(m28 => {
                          m28.react('✅')
                          m28.react('❌')

                          const Filter30 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector30 = m28.createReactionCollector({ filter: Filter30, max: 1, time: 2 * 60 * 1000 });

                          const Filter31 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                          const Collector31 = m28.createReactionCollector({ filter: Filter31, max: 1, time: 2 * 60 * 1000 });

                          Collector30.on('collect', () => {
                            function makeURL2(length) {
                              var result = '';
                              var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                              var charactersLength = characters.length;
                              for (var i = 0; i < length; i++) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                              }
                              return result;
                            }
                            const generator2 = makeURL2(7)

                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { APIKey: generator2 }, async (err07, data07) => {
                              if (err07) throw err07;
                              if (data07) {
                                data07.save()
                                const MainEmbed2 = new MessageEmbed()
                                  .setTitle('Done')
                                  .setDescription('We have generated your API key')
                                  .addField(`API Key`, `${generator2}`)
                                  .addField('Use it here', `[Click Me](https://api.ticketbots.tk/api/${generator2})`)
                                message.channel.send(({ embeds: [ MainEmbed2 ]}))
                              }
                            })
                          })
                        })
                    }
                  })

                  Collector35.on('collect', () => {
                    const MessagesEmbedForSettings = new MessageEmbed()
                      .setTitle('Settings')
                      .setDescription('Please select the message you want to change \n **The bold text in the message you can not change!**')
                      .addField('Ticket Message 1️⃣', `${data2.TicketMessage}`)
                      .addField('Close Message 2️⃣', `**User** ${data2.CloseMessage}`)
                      .addField('Claim Ticket Message 3️⃣', `**User** ${data2.ClaimTicketMessage}`)
                      .addField('Transcript Message 4️⃣', `${data2.TranscriptMessage} **Ticket-userid**`)

                    message.channel.send(({ embeds: [ MessagesEmbedForSettings ]}))
                      .then(m30 => {
                        m30.react('1️⃣')
                        m30.react('2️⃣')
                        m30.react('3️⃣')
                        m30.react('4️⃣')

                        const Filter36 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
                        const Collector36 = m30.createReactionCollector({ filter: Filter36,  max: 1, time: 2 * 60 * 1000 });
                        const Filter37 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
                        const Collector37 = m30.createReactionCollector({ filter: Filter37,  max: 1, time: 2 * 60 * 1000 });
                        const Filter38 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
                        const Collector38 = m30.createReactionCollector({ filter: Filter38,  max: 1, time: 2 * 60 * 1000 });
                        const Filter39 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
                        const Collector39 = m30.createReactionCollector({ filter: Filter39,  max: 1, time: 2 * 60 * 1000 });

                        Collector36.on('collect', () => {
                          const TicketMessageEmbed1 = new MessageEmbed()
                            .setTitle('Change')
                            .setDescription('Please type out your new Ticket Message!')
                          message.channel.send(({ embeds: [ TicketMessageEmbed1 ]}))

                          const Filter40 = (m31) => m31.author.id == message.author.id
                          const Collector40 = new MessageCollector(message.channel, { filter: Filter40,  max: 1 });

                          Collector40.on('collect', m32 => {
                            console.log(m32.content)
                          })

                          Collector40.on('end', m33 => {
                            const TicketMessageEmbed2 = new MessageEmbed()
                              .setTitle('You sure?')
                              .setDescription('You sure you want to change it to this?')
                              .addField('Current Message', `${data2.TicketMessage}`)
                              .addField('New Message', `${m33.first().content}`)

                            message.channel.send(({ embeds: [ TicketMessageEmbed1 ]}))
                              .then(m34 => {
                                m34.react('✅')
                                m34.react('❌')

                                const Filter41 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                                const Collector41 = m34.createReactionCollector({ filter: Filter41,  max: 1, time: 2 * 60 * 1000 });
                                const Filter42 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                const Collector42 = m34.createReactionCollector({ filter: Filter42,  max: 1, time: 2 * 60 * 1000 });

                                Collector41.on('collect', () => {
                                  MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { TicketMessage: m33.first().content }, async (err10, data10) => {
                                    if (err10) throw err10;
                                    if (data10) {
                                      data10.save()
                                      message.channel.send('Message has been updated!')
                                    }
                                  })
                                })

                                Collector42.on('collect', () => {
                                  message.channel.send('Canclled!')
                                })
                              })
                          })

                        })


                        Collector37.on('collect', () => {
                          const CloseMessageEmbed1 = new MessageEmbed()
                            .setTitle('Change')
                            .setDescription('Please type out your new Close Message!')
                          message.channel.send(({ embeds: [ CloseMessageEmbed1 ]}))

                          const Filter43 = (m35) => m35.author.id == message.author.id
                          const Collector43 = new MessageCollector(message.channel, { filter: Filter43, max: 1 });

                          Collector43.on('collect', m36 => {
                            console.log(m36.content)
                          })

                          Collector43.on('end', m37 => {
                            const CloseMessageEmbed2 = new MessageEmbed()
                              .setTitle('You sure?')
                              .setDescription('You sure you want to change it to this?')
                              .addField('Current Message', `**User** ${data2.CloseMessage}`)
                              .addField('New Message', `**User** ${m37.first().content}`)

                            message.channel.send(({ embeds: [ CloseMessageEmbed2 ]}))
                              .then(m38 => {
                                m38.react('✅')
                                m38.react('❌')

                                const Filter44 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                                const Collector44 = m38.createReactionCollector({ filter: Filter44,  max: 1, time: 2 * 60 * 1000 });
                                const Filter45 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                const Collector45 = m38.createReactionCollector({ filter: Filter45,  max: 1, time: 2 * 60 * 1000 });

                                Collector44.on('collect', () => {
                                  MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { CloseMessage: m37.first().content }, async (err11, data11) => {
                                    if (err11) throw err11;
                                    if (data11) {
                                      data11.save()
                                      message.channel.send('Message has been updated!')
                                    }
                                  })
                                })

                                Collector45.on('collect', () => {
                                  message.channel.send('Canclled!')
                                })
                              })
                          })

                        })

                        Collector38.on('collect', () => {
                          const ClaimTicketMessageEmbed1 = new MessageEmbed()
                            .setTitle('Change')
                            .setDescription('Please type out your new Claim Ticket Message!')
                          message.channel.send(({ embeds: [ ClaimTicketMessageEmbed1 ]}))

                          const Filter46 = (m39) => m39.author.id == message.author.id
                          const Collector46 = new MessageCollector(message.channel, { filter: Filter46,  max: 1 });

                          Collector46.on('collect', m40 => {
                            console.log(m40.content)
                          })

                          Collector46.on('end', m41 => {
                            const ClaimTicketMessageEmbed2 = new MessageEmbed()
                              .setTitle('You sure?')
                              .setDescription('You sure you want to change it to this?')
                              .addField('Current Message', `**User** ${data2.ClaimTicketMessage}`)
                              .addField('New Message', `**User** ${m41.first().content}`)

                            message.channel.send(({ embeds: [ ClaimTicketMessageEmbed2 ]}))
                              .then(m42 => {
                                m42.react('✅')
                                m42.react('❌')

                                const Filter47 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                                const Collector47 = m42.createReactionCollector({ filter: Filter47,  max: 1, time: 2 * 60 * 1000 });
                                const Filter48 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                const Collector48 = m42.createReactionCollector({ filter: Filter48,  max: 1, time: 2 * 60 * 1000 });

                                Collector47.on('collect', () => {
                                  MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { ClaimTicketMessage: m41.first().content }, async (err12, data12) => {
                                    if (err12) throw err12;
                                    if (data12) {
                                      data12.save()
                                      message.channel.send('Message has been updated!')
                                    }
                                  })
                                })

                                Collector48.on('collect', () => {
                                  message.channel.send('Canclled!')
                                })
                              })
                          })

                        })

                        Collector39.on('collect', () => {
                          const TranscriptMessageEmbed1 = new MessageEmbed()
                            .setTitle('Change')
                            .setDescription('Please type out your new Transcript Message!')
                          message.channel.send(({ embeds: [ TranscriptMessageEmbed1 ]}))

                          const Filter49 = (m43) => m43.author.id == message.author.id
                          const Collector49 = new MessageCollector(message.channel, { filter: Filter49, max: 1 });

                          Collector49.on('collect', m44 => {
                            console.log(m44.content)
                          })

                          Collector49.on('end', m45 => {
                            const TranscriptMessageEmbed2 = new MessageEmbed()
                              .setTitle('You sure?')
                              .setDescription('You sure you want to change it to this?')
                              .addField('Current Message', `${data2.TranscriptMessage} **User**`)
                              .addField('New Message', `${m45.first().content} **User**`)

                            message.channel.send(({ embeds: [ TranscriptMessageEmbed2 ]}))
                              .then(m46 => {
                                m46.react('✅')
                                m46.react('❌')

                                const Filter50 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                                const Collector50 = m46.createReactionCollector({ filter: Filter50,  max: 1, time: 2 * 60 * 1000 });
                                const Filter51 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                                const Collector51 = m46.createReactionCollector({ filter: Filter51,  max: 1, time: 2 * 60 * 1000 });

                                Collector50.on('collect', () => {
                                  MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { TranscriptMessage: m45.first().content }, async (err13, data13) => {
                                    if (err13) throw err13;
                                    if (data13) {
                                      data13.save()
                                      message.channel.send('Message has been updated!')
                                    }
                                  })
                                })

                                Collector51.on('collect', () => {
                                  message.channel.send('Canclled!')
                                })
                              })
                          })

                        })


                      })
                  })

                  Collector9.on('collect', () => {
                    const ServerIDEmbed3 = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the prefix to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed3 ]}))
                    const Filter10 = (m9) => m9.author.id == message.author.id
                    const Collector10 = new MessageCollector(message.channel, { filter: Filter10,  max: 1 });

                    Collector10.on('collect', m11 => {
                      console.log(m11.content)
                    })
                    Collector10.on('end', m12 => {
                      const YouSureToUpdate3 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m12.first().content}`)
                      message.channel.send(({ embeds: [ YouSureToUpdate3 ]}))
                        .then(m13 => {
                          m13.react('✅')

                          const Filter11 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector11 = m13.createReactionCollector({ filter: Filter11,  max: 1, time: 2 * 60 * 1000 });

                          Collector11.on('collect', () => {

                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { BotPrefix: m12.first().content }, async (err5, data5) => {
                              if (err5) throw err5;
                              if (data5) {
                                data5.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })

                        })

                    })

                  })

                  Collector6.on('collect', () => {
                    const ServerIDEmbed2 = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed2 ]}))

                    const Filter7 = (m5) => m5.author.id == message.author.id
                    const Collector7 = new MessageCollector(message.channel, { filter: Filter7,  max: 1 });

                    Collector7.on('collect', m6 => {
                      console.log(m6.content)
                    })
                    Collector7.on('end', m7 => {
                      const YouSureToUpdate2 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m7.first().content}?`)
                      message.channel.send(({ embeds: [ YouSureToUpdate2 ]}))
                        .then(m8 => {
                          m8.react('✅')

                          const Filter8 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector8 = m8.createReactionCollector({ filter: Filter8,  max: 1, time: 2 * 60 * 1000 });
                          Collector8.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { TicketTrackerChannelID: m7.first().content }, async (err4, data4) => {
                              if (err4) throw err4;
                              if (data4) {
                                data4.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })
                        })
                    })
                  })

                  Collector12.on('collect', () => {
                    const ServerIDEmbed3 = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed3 ]}))

                    const Filter15 = (m14) => m14.author.id === message.author.id
                    const Collector15 = new MessageCollector(message.channel, { filter: Filter15,  max: 1 });

                    Collector15.on('collect', m15 => {
                      console.log(m15.content)
                    })
                    Collector15.on('end', m16 => {
                      const YouSureToUpdate3 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m16.first().content}?`)
                      message.channel.send(({ embeds: [ YouSureToUpdate3 ]}))
                        .then(m17 => {
                          m17.react('✅')

                          const Filter16 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector16 = m17.createReactionCollector({ filter: Filter16,  max: 1, time: 2 * 60 * 1000 });

                          Collector16.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { SupportRoleID: m16.first().content }, async (err6, data6) => {
                              if (err6) throw err6;
                              if (data6) {
                                data6.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })
                        })
                    })
                  })

                  Collector13.on('collect', () => {
                    const ServerIDEmbed4 = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed4 ]}))

                    const Filter17 = (m18) => m18.author.id === message.author.id
                    const Collector17 = new MessageCollector(message.channel, { filter: Filter17,  max: 1 });

                    Collector17.on('collect', m19 => {
                      console.log(m19.content)
                    })
                    Collector17.on('end', m20 => {
                      const YouSureToUpdate4 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m20.first().content}?`)
                      message.channel.send(({ embeds: [ YouSureToUpdate4 ]}))
                        .then(m27 => {
                          m27.react('✅')

                          const Filter18 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector18 = m27.createReactionCollector({ filter: Filter18,  max: 1, time: 2 * 60 * 1000 });

                          Collector18.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { ManagerRoleID: m20.first().content }, async (err7, data7) => {
                              if (err7) throw err7;
                              if (data7) {
                                data7.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })
                        })
                    })
                  })

                  Collector14.on('collect', () => {
                    const ServerIDEmbed5 = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(({ embeds: [ ServerIDEmbed5 ]}))

                    const Filter19 = (m22) => m22.author.id === message.author.id
                    const Collector19 = new MessageCollector(message.channel, { filter: Filter19,  max: 1 });

                    Collector19.on('collect', m23 => {
                      console.log(m23.content)
                    })
                    Collector19.on('end', m24 => {
                      const YouSureToUpdate5 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m24.first().content}?`)
                      message.channel.send(({ embeds: [ YouSureToUpdate5 ]}))
                        .then(m25 => {
                          m25.react('✅')

                          const Filter20 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector20 = m25.createReactionCollector({ filter: Filter20,  max: 1, time: 2 * 60 * 1000 });

                          Collector20.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { AdminRoleID: m24.first().content }, async (err8, data8) => {
                              if (err8) throw err8;
                              if (data8) {
                                data8.save()
                                message.channel.send('Updated!')
                              }
                            })
                          })
                        })
                    })
                  })

                  Collector52.on('collect', () => {
                    const Xmas95 = new Date('December 24, 2021 00:00:00');

                    if (Xmas95.getDate() == dd) {
                      MainDatabase.findOne({ ServerID: message.guildId }, async (err14, data14) => {

                        if (err14) throw err14
                        if (data14) {
                          if (data14.EnableTicket === 'Enabled') {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { EnableTicket: 'Disabled' }, async (err15, data15) => {
                              if (err15) throw err15;
                              if (data15) {
                                data14.save()
                                message.channel.send('Tickets have now been disabled in this server.')
                              }
                            })
                          } else {
                            if (data14.EnableTicket === 'Disabled') {
                              MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { EnableTicket: 'Enbalbed' }, async (err16, data16) => {
                                if (err16) throw err16;
                                if (data16) {
                                  data16.save()
                                  message.channel.send('Tickets have now been enabled in this server.')
                                }
                              })
                            }
                          }
                        }
                      })

                    } else {
                      const DisabledUntilChristmas = new MessageEmbed()
                      .setTitle('Disabled!')
                      .setDescription('This command is disabled until New Year Day at 12:00 UTC. Please come back then to disable / enable the tickets.')

                      message.channel.send(({ embeds: [ DisabledUntilChristmas ]}))
                    }
                  })

                  Collector53.on('collect', () => {
                    MainDatabase.findOne({ ServerID: message.guildId }, async (err17, data17) => {
                      if (err17) throw err;
                      if (data17) {
                        if (data17.ModMail === 'Enabled') {
                          MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { ModMail: 'Disabled' }, async (err18, data18) => {
                            if (err18) throw err;
                            if (data18) {
                              data18.save()
                              message.channel.send('ModMail has been disabled in this server.')
                            }
                          })
                        } else {
                          if (data17.ModMail === 'Disabled') {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guildId}, { ModMail: 'Enabled' }, async (err19, data19) => {
                              if (err19) throw err;
                              if (data19) {
                                data19.save()
                                message.channel.send('ModMail has been enabled on this server.')
                              }
                            })
                          }
                        }
                      }
                    })
                  })


                })



            } else {

              const ListSettingsError2 = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Failed to load settings. This can be caused because the server owner did not set the server up correctly or have not run ${client.prefix}install or ${client.prefix}update or ${client.prefix}setup`)

              message.channel.send(ListSettingsError2)
            }
          })
        })

        Collector32.on('collect', () => {
          if (message.author.id != message.guild.ownerId            )
            return message.channel.send(ServerOwner);
          MainDatabase.findOne({ ServerID: message.guildId }, async (err08, data08) => {
            if (err08) throw err08;
            if (data08) {
              const TicketChannelMain2 = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "GUILD_TEXT")
              const TicketTrackerMain2 = message.guild.channels.cache.find(ch2 => ch2.name.toLowerCase() == `tickets: ${data08.TicketNumber}` && ch2.type == "GUILD_VOICE")
              const SupportRoleMain2 = message.guild.roles.cache.find((r) => r.name === 'ticket support');
              const ManagerRoleMain2 = message.guild.roles.cache.find((r2) => r2.name === 'ticket manager');




              const AutoSetup = new MessageEmbed()
                .setTitle('Settings')
                .setDescription('This is only suggested to be used if this is your first time using the bot on the server The following thing will be added to settings. React with ✅ to do the setup or react with ❌ to cancel')
                .addField('TicketChannelID', `${TicketChannelMain2.id}`)
                .addField('TicketTrackerChannelID', `${TicketTrackerMain2.id}`)
                .addField('Support Role', `${SupportRoleMain2}`)
                .addField('Manager Role', `${ManagerRoleMain2}`)

              message.channel.send({ embeds: [AutoSetup]})
                .then(m29 => {
                  m29.react('✅')
                  m29.react('❌')

                  const Filter33 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                  const Collector33 = m29.createReactionCollector({ filter: Filter33,  max: 1, time: 2 * 60 * 1000 });
                  const Filter34 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                  const Collector34 = m29.createReactionCollector({ filter: Filter34,  max: 1, time: 2 * 60 * 1000 });

                  Collector33.on('collect', () => {
                    MainDatabase.findOneAndUpdate({ ServerID: message.guildId }, { TicketChannelID: TicketChannelMain2.id, TicketTrackerChannelID: TicketTrackerMain2.id, SupportRoleID: SupportRoleMain2.id, ManagerRoleID: ManagerRoleMain2.id }, async (err9, data9) => {
                      if (err9) throw err9;
                      if (data9) {
                        data9.save()
                        message.channel.send('Updated!')
                      }
                    })
                  })

                  Collector34.on('collect', () => {
                    message.channel.send('Cancelled')
                  })
                })
            }
          })

        })
      })
  }
}