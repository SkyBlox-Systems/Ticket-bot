const { ShardingManager } = require('discord.js');
const config = require('../slappey.json');

const shards = new ShardingManager("./src/index.js", {
    token: config.token,
    totalShards: 2
})

shards.on("ShardCreate", async (shard) =>{
    console.log(`New shard${shard.id}`)
})

shards.spawn(shards.totalShards, 1000)
require('./dashboard/server')