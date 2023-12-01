const { ShardingManager } = require('discord.js');
const config = require('../slappey.json');
const chalk = require("chalk")
const DataBaseMongo = require('./mongo');
// const DSU = require("@dbd-soft-ui/shards")


const shards = new ShardingManager("./src/index.js", {
    token: config.token,
    totalShards: 1,
    timeout: -1,
    respawn: true
})

shards.on("ShardCreate", async (shard) =>{
    console.log(chalk.cyan("[Ticket Bot Sharding]" + chalk.blue(`${new Date()} spawned ${shard.id}`)))
})

// DSU.register(shards, {
  //  dashboard_url: "https://dashboard.ticketbots.co.uk",
  //  key: "richard1234YT!",
  //  interval: 15/
// })

shards.spawn()
require('./dashboard/server')
// DataBaseMongo.init()
