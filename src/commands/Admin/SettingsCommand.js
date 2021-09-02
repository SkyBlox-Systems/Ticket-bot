const BaseCommand = require('../../utils/structures/BaseCommand');
const mongoose = require('mongoose');
const { MessageEmbed, Guild, MessageCollector, Collector } = require('discord.js');
const MainDatabase = require('../../schemas/TicketData')

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

    message.channel.send(MainMessage)
      .then(m => {
        m.react('1️⃣')
        m.react('2️⃣')
        m.react('3️⃣')

        const Filter1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
        const Collector1 = m.createReactionCollector(Filter1, { max: 1, time: 2 * 60 * 1000 });
        const Filter2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
        const Collector2 = m.createReactionCollector(Filter2, { max: 1, time: 2 * 60 * 1000 });
        const Filter32 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
        const Collector32 = m.createReactionCollector(Filter32, { max: 1, time: 2 * 60 * 1000 });

        Collector1.on('collect', () => {
          MainDatabase.findOne({ ServerID: message.guild.id }, async (err1, data1) => {
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
                .addField(`Bot Version`, `${data1.BotVersion}`, true)


              message.channel.send(ListSettings)
            } else {

              const ListSettingsError = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`Failed to load settings. This can be caused because the server owner did not set the server up correctly or have not run ${client.prefix}install or ${client.prefix}update or ${client.prefix}setup`)

              message.channel.send(ListSettingsError)
            }
          })
        })

        Collector2.on('collect', () => {
          if (message.author.id != message.guild.owner.id)
            return message.channel.send(ServerOwner);

          MainDatabase.findOne({ ServerID: message.guild.id }, async (err2, data2) => {
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
                .addField(`Bot Version`, `${data2.BotVersion}`, true)

              message.channel.send(ListSettings2)
                .then(m1 => {
                  m1.react('1️⃣')
                  m1.react('2️⃣')
                  m1.react('3️⃣')
                  m1.react('4️⃣')
                  m1.react('5️⃣')
                  m1.react('6️⃣')
                  m1.react('7️⃣')
                  m1.react('8️⃣')

                  const Filter3 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === message.author.id;
                  const Collector3 = m1.createReactionCollector(Filter3, { max: 1, time: 2 * 60 * 1000 });

                  const Filter6 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === message.author.id;
                  const Collector6 = m1.createReactionCollector(Filter6, { max: 1, time: 2 * 60 * 1000 });

                  const Filter9 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === message.author.id;
                  const Collector9 = m1.createReactionCollector(Filter9, { max: 1, time: 2 * 60 * 1000 });

                  const Filter12 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === message.author.id;
                  const Collector12 = m1.createReactionCollector(Filter12, { max: 1, time: 2 * 60 * 1000 });

                  const Filter13 = (reaction, user) => reaction.emoji.name === '5️⃣' && user.id === message.author.id;
                  const Collector13 = m1.createReactionCollector(Filter13, { max: 1, time: 2 * 60 * 1000 });

                  const Filter14 = (reaction, user) => reaction.emoji.name === '6️⃣' && user.id === message.author.id;
                  const Collector14 = m1.createReactionCollector(Filter14, { max: 1, time: 2 * 60 * 1000 });

                  const Filter26 = (reaction, user) => reaction.emoji.name === '7️⃣' && user.id === message.author.id;
                  const Collector26 = m1.createReactionCollector(Filter26, { max: 1, time: 2 * 60 * 1000 });

                  const Filter27 = (reaction, user) => reaction.emoji.name === '8️⃣' && user.id === message.author.id;
                  const Collector27 = m1.createReactionCollector(Filter27, { max: 1, time: 2 * 60 * 1000 });


                  Collector3.on('collect', () => {
                    const ServerIDEmbed = new MessageEmbed()
                      .setTitle("Change")
                      .setDescription("Please say what you wanna change the id to?")

                    message.channel.send(ServerIDEmbed)

                    const Filter4 = (m2) => m2.author.id == message.author.id
                    const Collector4 = new MessageCollector(message.channel, Filter4, { max: 1 });

                    Collector4.on('collect', m3 => {
                      console.log(m3.content)
                    })
                    Collector4.on('end', m4 => {
                      const YouSureToUpdate1 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m4.first().content}?`)
                      message.channel.send(YouSureToUpdate1)
                        .then(m5 => {
                          m5.react('✅')

                          const Filter5 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector5 = m5.createReactionCollector(Filter5, { max: 1, time: 2 * 60 * 1000 });
                          Collector5.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { TicketChannelID: m4.first().content }, async (err3, data3) => {
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
                      MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { Transcript: "No" }, async (err04, data04) => {
                        if (err04) throw err04;
                        if (data04) {
                          data04.save()
                          message.channel.send('Transcript has been disabled on this server.')
                        }
                      })
                    } else {
                      MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { Transcript: "Yes" }, async (err05, data05) => {
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
                      const generator = makeURL(7)
                      MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { APIKey: generator }, async (err06, data06) => {
                        if (err06) throw err06;
                        if (data06) {
                          data06.save()
                          const MainEmbed = new MessageEmbed()
                            .setTitle('Done')
                            .setDescription('We have generated your API key')
                            .addField(`API Key`, `${generator}`)
                            .addField('Use it here', `[Click Me](https://api.ticketbots.tk/api/${generator})`)
                          message.channel.send(MainEmbed)
                        }
                      })
                    } else {
                      const AlreadyFoundAPIKey = new MessageEmbed()
                        .setTitle('Error')
                        .setDescription(`You already have a API key linked to this server. If you want a new one, please react with a ✅. If you want to keep the current one, please react with ❌`)
                        .addField(`API Key`, `${data2.APIKey}`)

                      message.channel.send(AlreadyFoundAPIKey)
                        .then(m28 => {
                          m28.react('✅')
                          m28.react('❌')

                          const Filter30 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector30 = m28.createReactionCollector(Filter30, { max: 1, time: 2 * 60 * 1000 });

                          const Filter31 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                          const Collector31 = m28.createReactionCollector(Filter31, { max: 1, time: 2 * 60 * 1000 });

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
                                message.channel.send(MainEmbed2)
                              }
                            })
                          })
                        })
                    }
                  })

                  Collector9.on('collect', () => {
                      const ServerIDEmbed3 = new MessageEmbed()
                        .setTitle("Change")
                        .setDescription("Please say what you wanna change the prefix to?")

                      message.channel.send(ServerIDEmbed3)
                      const Filter10 = (m9) => m9.author.id == message.author.id
                      const Collector10 = new MessageCollector(message.channel, Filter10, { max: 1 });

                      Collector10.on('collect', m11 => {
                        console.log(m11.content)
                      })
                      Collector10.on('end', m12 => {
                        const YouSureToUpdate3 = new MessageEmbed()
                          .setTitle('You sure?')
                          .setDescription(`You sure that you want to change it to ${m12.first().content}`)
                        message.channel.send(YouSureToUpdate3)
                          .then(m13 => {
                            m13.react('✅')

                            const Filter11 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                            const Collector11 = m13.createReactionCollector(Filter11, { max: 1, time: 2 * 60 * 1000 });

                            Collector11.on('collect', () => {

                              MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { BotPrefix: m12.first().content }, async (err5, data5) => {
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

                    message.channel.send(ServerIDEmbed2)

                    const Filter7 = (m5) => m5.author.id == message.author.id
                    const Collector7 = new MessageCollector(message.channel, Filter7, { max: 1 });

                    Collector7.on('collect', m6 => {
                      console.log(m6.content)
                    })
                    Collector7.on('end', m7 => {
                      const YouSureToUpdate2 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m7.first().content}?`)
                      message.channel.send(YouSureToUpdate2)
                        .then(m8 => {
                          m8.react('✅')

                          const Filter8 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector8 = m8.createReactionCollector(Filter8, { max: 1, time: 2 * 60 * 1000 });
                          Collector8.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { TicketTrackerChannelID: m7.first().content }, async (err4, data4) => {
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

                    message.channel.send(ServerIDEmbed3)

                    const Filter15 = (m14) => m14.author.id === message.author.id
                    const Collector15 = new MessageCollector(message.channel, Filter15, { max: 1 });

                    Collector15.on('collect', m15 => {
                      console.log(m15.content)
                    })
                    Collector15.on('end', m16 => {
                      const YouSureToUpdate3 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m16.first().content}?`)
                      message.channel.send(YouSureToUpdate3)
                        .then(m17 => {
                          m17.react('✅')

                          const Filter16 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector16 = m17.createReactionCollector(Filter16, { max: 1, time: 2 * 60 * 1000 });

                          Collector16.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { SupportRoleID: m16.first().content }, async (err6, data6) => {
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

                    message.channel.send(ServerIDEmbed4)

                    const Filter17 = (m18) => m18.author.id === message.author.id
                    const Collector17 = new MessageCollector(message.channel, Filter17, { max: 1 });

                    Collector17.on('collect', m19 => {
                      console.log(m19.content)
                    })
                    Collector17.on('end', m20 => {
                      const YouSureToUpdate4 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m20.first().content}?`)
                      message.channel.send(YouSureToUpdate4)
                        .then(m27 => {
                          m27.react('✅')

                          const Filter18 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector18 = m27.createReactionCollector(Filter18, { max: 1, time: 2 * 60 * 1000 });

                          Collector18.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { ManagerRoleID: m20.first().content }, async (err7, data7) => {
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

                    message.channel.send(ServerIDEmbed5)

                    const Filter19 = (m22) => m22.author.id === message.author.id
                    const Collector19 = new MessageCollector(message.channel, Filter19, { max: 1 });

                    Collector19.on('collect', m23 => {
                      console.log(m23.content)
                    })
                    Collector19.on('end', m24 => {
                      const YouSureToUpdate5 = new MessageEmbed()
                        .setTitle('You sure?')
                        .setDescription(`You sure that you want to change it to ${m24.first().content}?`)
                      message.channel.send(YouSureToUpdate5)
                        .then(m25 => {
                          m25.react('✅')

                          const Filter20 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                          const Collector20 = m25.createReactionCollector(Filter20, { max: 1, time: 2 * 60 * 1000 });

                          Collector20.on('collect', () => {
                            MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { AdminRoleID: m24.first().content }, async (err8, data8) => {
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
          MainDatabase.findOne({ ServerID: message.guild.id }, async (err08, data08) => {
            if (err08) throw err08;
            if (data08) {
              const TicketChannelMain2 = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "ticket" && ch.type == "text")
              const TicketTrackerMain2 = message.guild.channels.cache.find(ch2 => ch2.name.toLowerCase() == `tickets: ${data08.TicketNumber}` && ch2.type == "voice")
              const SupportRoleMain2 =  message.guild.roles.cache.find((r) => r.name === 'ticket support');
              const ManagerRoleMain2 = message.guild.roles.cache.find((r2) => r2.name === 'ticket manager');



          
              const AutoSetup = new MessageEmbed()
              .setTitle('Settings')
              .setDescription('This is only suggested to be used if this is your first time using the bot on the server The following thing will be added to settings. React with ✅ to do the setup or react with ❌ to cancel')
              .addField('TicketChannelID', `${TicketChannelMain2.id}`)
              .addField('TicketTrackerChannelID', `${TicketTrackerMain2.id}`)
              .addField('Support Role', `${SupportRoleMain2.id}`)
              .addField('Manager Role', `${ManagerRoleMain2.id}`)

              message.channel.send(AutoSetup)
              .then(m29 => {
                m29.react('✅')
                m29.react('❌')

                const Filter33 = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
                const Collector33 = m29.createReactionCollector(Filter33, { max: 1, time: 2 * 60 * 1000 });
                const Filter34 = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                const Collector34 = m29.createReactionCollector(Filter34, { max: 1, time: 2 * 60 * 1000 });

                Collector33.on('collect', () => {
                  MainDatabase.findOneAndUpdate({ ServerID: message.guild.id }, { TicketChannelID: TicketChannelMain2.id,  TicketTrackerChannelID: TicketTrackerMain2.id,  SupportRoleID: SupportRoleMain2.id,  ManagerRoleID: ManagerRoleMain2.id}, async (err9, data9) => {
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