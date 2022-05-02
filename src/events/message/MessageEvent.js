const BaseEvent = require('../../utils/structures/BaseEvent');
const blacklist = require('../../schemas/Blacklist-schema');
const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const db = require('../../schemas/commands')
const MainDatabase = require('../../schemas/TicketData')
const getprefix = require('../../utils/getprefix');
const { BotVersions } = require('../../../slappey.json')


module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }

  async run(client, message) {

    client.prefix = await getprefix(message.guildId);



    if (message.author.bot) return;
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(client.prefix.length)
        .trim()
        .split(/\s+/);



      const command = client.commands.get(cmdName);
      if (command) {
        const check = await db.findOne({ Guild: message.guild.id })
        const versionCheck = await MainDatabase.findOne({ ServerID: message.guildId })
        blacklist.findOne({ UserID: message.author.id }, async (err, data) => {
          if (err) throw err;
          if (!data) {

            if (command.name === 'update') {
              message.reply(`⚠ Warning! ⚠ \n Ticket Bot non-slash commands will be removed from the bot at this date <t:1656633600> to prepare the discord changes. As slash commands will be the only command feature you can use on this bot. More info here: https://support-dev.discord.com/hc/en-us/articles/4404772028055 \n The command will be sent within 5 seconds.`)
              setTimeout(() => {
                command.run(client, message, cmdArgs)
                
              }, 5000);
            } else {
              if (command.name === 'setup') {
                message.reply(`⚠ Warning! ⚠ \n Ticket Bot non-slash commands will be removed from the bot at this date <t:1656633600> to prepare the discord changes. As slash commands will be the only command feature you can use on this bot. More info here: https://support-dev.discord.com/hc/en-us/articles/4404772028055 \n The command will be sent within 5 seconds.`)
                setTimeout(() => {
                  command.run(client, message, cmdArgs)
                  
                }, 5000);
              } else {
                if (versionCheck.BotVersion !== BotVersions) {
                  const UpdateBot = new MessageEmbed()
                    .setTitle('Update bot')
                    .setDescription(`You are currently running v${versionCheck.BotVersion} of the bot. Please update it to v${BotVersions}. Run the command /upgrade to update the bot.`)
                  await message.channel.send({ embeds: [UpdateBot] })


                } else {
                  if (check) {
                    const DisabledCommand = new MessageEmbed()
                      .setTitle('Disabled')
                      .setDescription(`The following command **${client.prefix}${command.name}** has been disabled in the server by an administrator`)
                      .setColor('#f6f7f8')
                    if (check.Cmds.includes(command.name)) return message.channel.send({ embeds: [DisabledCommand] })
                    message.reply(`⚠ Warning! ⚠ \n Ticket Bot non-slash commands will be removed from the bot at this date <t:1656633600> to prepare the discord changes. As slash commands will be the only command feature you can use on this bot. More info here: https://support-dev.discord.com/hc/en-us/articles/4404772028055 \n The command will be sent within 5 seconds.`)
                    setTimeout(() => {
                      command.run(client, message, cmdArgs)
                      
                    }, 5000);
                  } else {
                    message.reply(`⚠ Warning! ⚠ \n Ticket Bot non-slash commands will be removed from the bot at this date <t:1656633600> to prepare the discord changes. As slash commands will be the only command feature you can use on this bot. More info here: https://support-dev.discord.com/hc/en-us/articles/4404772028055 \n The command will be sent within 5 seconds.`)
                    setTimeout(() => {
                      command.run(client, message, cmdArgs)
                      
                    }, 5000);
                  }
                }

              }

            }

          } else {
            const BlacklistedFromBot = new MessageEmbed()
              .setTitle('Blacklisted!')
              .setDescription('You have been blacklisted from using Ticket Bot!')
              .addField('Reason', `${data.Reason}`)
              .addField('Time', `${data.Time} UTC`)
              .addField('Admin', `${data.Admin}`)

            message.channel.send({ embeds: [BlacklistedFromBot] })
          }

        })
      }

    }
  }
}
