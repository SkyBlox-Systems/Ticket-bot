const BaseCommand = require('../../utils/structures/BaseCommand');
const CommandsSchema = require('../../schemas/commands')
const { MessageEmbed } = require('discord.js')


module.exports = class CommandDisableCommand extends BaseCommand {
    constructor() {
        super('CommandDisable', 'Admin', []);
    }

    async run(client, message, args) {
        const AdminPerms = new MessageEmbed()
            .setTitle('Error')
            .setDescription('You need administrator permissions to use this command')
            .setColor('#f6f7f8')

        const specifyCommand = new MessageEmbed()
            .setTitle('Please specify a command')
            .setColor('#f6f7f8')

        const NotExist = new MessageEmbed()
            .setTitle('Error')
            .setDescription(`The command you put does not exist within the bot command list. Please check ${client.prefix}help for list of commands!`)
            .setColor('#f6f7f8')


        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(AdminPerms)
        const cmd = args[0];
        if (!cmd) return message.channel.send(specifyCommand)
        if (!!client.commands.get(cmd) === false) return message.channel.send(NotExist);
        CommandsSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                const AlreadyDisabled = new MessageEmbed()
                    .setTitle('Disabled')
                    .setDescription(`The command **${client.prefix}${cmd}** has already been disabled`)
                    .setColor('#f6f7f8')

                if (data.Cmds.includes(cmd)) return message.channel.send(AlreadyDisabled);
                data.Cmds.push(cmd)
            } else {
                data = new CommandsSchema({
                    Guild: message.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            const Disabled = new MessageEmbed()
                .setTitle('Disabled')
                .setDescription(`Command ${cmd} has been disabled`)
                .setColor('#f6f7f8')

            message.channel.send(Disabled)
        })
    }
}