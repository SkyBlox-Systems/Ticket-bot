const BaseEvent = require('../../utils/structures/BaseEvent');
const blacklist = require('../../schemas/Blacklist-schema');
const { EmbedBuilder, Interaction } = require('discord.js');
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

    const LogChannel = client.channels.cache.get('1065618246507692123')

    process.on('unhandledRejection', (reason, p) => {
      

      const ErrorEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('⚠️ Error')
        .setDescription(`An error has occured when running the command **N/A**. An report of this error has been sent to the admins of the bot.`)
      message.channel.send({ embeds: [ErrorEmbed] })

      const StaffEmbed = new EmbedBuilder()
      .setTitle('⚠️ ERROR')
      .setDescription(`**Unhandled Rejection/Catch: \n\n** Reason: **${reason}** \n Command: **N/A**`)

      LogChannel.send({ embeds: [StaffEmbed] })


    })
  }
}
