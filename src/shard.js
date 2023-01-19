const { ShardingManager } = require('discord.js');
const config = require('../slappey.json');
const chalk = require("chalk")
const DataBaseMongo = require('./mongo');


const shards = new ShardingManager("./src/index.js", {
    token: config.token,
    totalShards: 2,
    timeout: -1,
    respawn: true
})

shards.on("ShardCreate", async (shard) =>{
    console.log(chalk.cyan("[Ticket Bot Sharding]" + chalk.blue(`${new Date()} spawned ${shard.id}`)))
})

shards.spawn()
require('./dashboard/server')
// DataBaseMongo.init()