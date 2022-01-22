const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const activities = [
		`Testing Discord.js 13`
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`!setup | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
	}
}