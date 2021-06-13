const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')


module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'Owner', []);
  }

  async run(client, message, args) {
    if (message.author.id !== '406164395643633665') return message.channel.send('ABUSERS NO!');
    const embed = new MessageEmbed()
        .setTitle('Evaluating...')
    const msg = await message.channel.send(embed);
    try {
        const data = eval(args.join(' ').replace(/```/g, ''));
        const embed = new MessageEmbed()
            .setTitle('Output: ')
            .setDescription(await data)
        await msg.edit(embed)
        await msg.react('✅')
        await msg.react('❌')
        const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
        msg.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                collected.map((emoji) => {
                    switch (emoji._emoji.name) {
                        case '✅':
                            msg.reactions.removeAll();
                            break;
                        case '❌':
                            msg.delete()
                            break;
                    }
                })
            })
    } catch (e) {
        const embed = new MessageEmbed()
            .setTitle('An Error has occured')
        	.setDescription(e.toString());
        console.error(e)
        return await msg.edit(embed);

    }
  }
}