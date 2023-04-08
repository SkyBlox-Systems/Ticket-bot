const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const { BotVersions } = require('../../../slappey.json')

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        const activities = [
            `Upgrading...`
            // `${client.guilds.cache.size} servers!`,
            // `Shard #${client.shard.ids} / #2`,
            // `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
            // `Version ${BotVersions}`
        ];

        let i = 0;
        setInterval(() => client.user.setActivity(`/setup | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
    }
}