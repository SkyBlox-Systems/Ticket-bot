const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    const activities = [
			`${client.guilds.cache.size} servers!`,
			`Shard #0`,
			`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
			`Version 2.1 Dev`
		];

		let i = 0;
		setInterval(() => client.user.setActivity(`!setup | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
	}
}