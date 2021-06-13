const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons');





module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', []);
  }

  async run(client, message, args) {
    let button = new MessageButton()
      .setStyle('green') //default: blurple
      .setLabel('Fucking') //default: NO_LABEL_PROVIDED
      .setID('click_to_function') //note: if you use the style "url" you must provide url using .setURL('https://example.com')

    await message.channel.send('The best https://www.youtube.com/watch?v=bawmxQE_Fj0', button);
  }
}
