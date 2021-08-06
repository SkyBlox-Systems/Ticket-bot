const BaseCommand = require('../../utils/structures/BaseCommand');
const MainDatabase = require('../../schemas/TicketData')
const { MessageEmbed } = require('discord.js')


module.exports = class RemoveCommand extends BaseCommand {
  constructor() {
    super('remove', 'Main', []);
  }

  async run(client, message, args) {

    MainDatabase.findOne({ ServerID: message.guild.id }, async (err01, data01) => {
      if (err01) throw err01;
      if (data01) {
        const perms = new MessageEmbed()
          .setColor('RED')
          .setTimestamp()
          .setTitle(`Error`)
          .setDescription(`You don't have the following permissions: Manage_message.`)

        const invaild = new MessageEmbed()
          .setColor('RED')
          .setTimestamp()
          .setTitle(`Error`)
          .setDescription(`You didn't mention a user, or you gave an invaild id.`)

        const NoMessage = new MessageEmbed()
          .setColor('RED')
          .setTimestamp()
          .setTitle(`Error`)
          .setDescription(`You did not specify your message`)

        const Added = new MessageEmbed()
          .setColor('GREEN')
          .setTimestamp()
          .setTitle('Removed')
          .setDescription(`<@${message.author.id}> have removed you to the following ticket <#${message.channel.id}>`)

        const AdminPerms = new MessageEmbed()
          .setColor('RED')
          .setTimestamp()
          .setTitle('ERROR')
          .setDescription('The person you tried to remove is the creator of the ticket or have customer service perms.')

        if (!message.channel.name.startsWith("ticket-" || "staff-")) return message.channel.send("This is not a valid ticket")
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
          return message.channel.send(perms);
        let user =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[0]);
        if (!user)
          return message.channel.send(invaild);
        user.user
        if (user.permissions.has("MANAGE_MESSAGES")) return message.channel.send(AdminPerms)
          .send(Added)
        message.channel.updateOverwrite(user, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          ATTATCH_FILES: false,
        })
        const Logs = message.guild.channels.cache.find(ch => ch.name.toLowerCase() == "transcript" && ch.type == "text")
          .then(() => Logs.send(`Remove ${user.user.tag} to the following ticket <@${message.channel.id}>`))
          .then(() => message.channel.send(`Removed ${user.user.tag} from this ticket!`));
      } else {
        const NoData = new MessageEmbed()
          .setTitle('Not updated')
          .setDescription(`The server is not updated with the latest version of the bot. This server is currently running version **v2.0** and the latest update is **v2.1** Please get the owner to run ${client.prefix}update`)

        message.channel.send(NoData)
      }
    })
  }
}