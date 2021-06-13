const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js'); 

module.exports = class PenisCommand extends BaseCommand {
  constructor() {
    super('penis', 'Admin', []);
  }

  async run(client, message, args) {
      function makeURL() { 

        var characters = '0123456789'; 
        
        var charactersLength = characters.length; 
        
        var mode = Math.floor(Math.random() * 2) + 1;
        
        var result;
        
        if (mode == 1) {
        result = characters.charAt(Math.floor(Math.random() * charactersLength)) + "." + characters.charAt(Math.floor(Math.random() * charactersLength)); 
        }
        
        if (mode == 2) {
        result = characters.charAt(Math.floor(Math.random() * charactersLength)) + characters.charAt(Math.floor(Math.random() * charactersLength)) + "." + characters.charAt(Math.floor(Math.random() * charactersLength)); 
        }
        
        return result; 
        
        } 

        const PenisSize = new MessageEmbed()
        .setTitle('Penis')
        .setDescription('Your penis size is ' + makeURL() + " inches long. If your penis under 1 inches, please think about cutting it off. Thanks!")
        .setFooter('Made by Penistone')
        .setColor('#f6f7f8')
        
        message.channel.send(PenisSize)
  }
}