const BaseCommand = require('../../utils/structures/BaseCommand');
const xvideos = require('@rodrigogs/xvideos');

module.exports = class PornCommand extends BaseCommand {
  constructor() {
    super('porn', 'Admin', []);
  }

  async run(client, message, args) {
    const fresh = await xvideos.videos.fresh({ page: 1 });
    const yesdad =  await xvideos.videos.details({ url: 'https://www.xvideos.com/video36638661/chaturbate_lulacum69_30-05-2018' });
    message.channel.send(yesdad)
  }
}