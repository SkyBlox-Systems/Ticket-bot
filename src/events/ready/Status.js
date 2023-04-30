const { Shard } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const { BotVersions } = require('../../../slappey.json')
const { ActivityType } = require('discord.js');


module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }
    async run(client) {
        const activitiess = [
            `${client.guilds.cache.size} servers!`,
            `Shard #${client.shard.ids} / #2`,
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`,
            `Version ${BotVersions}`
        ];

        let i = 0;
        setInterval(() => client.user.setPresence({ activities: [{ name:  `/setup | ${activitiess[i++ % activitiess.length]}`, type: ActivityType.Watching },] }), 15000)
    }
}