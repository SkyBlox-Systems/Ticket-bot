const Stats = require('sharding-stats');
const config = require('../../slappey.json');
const express = require("express");
const app = express();

const StatsServer = new Stats.Server(app, {
  selfHost: false, // set it to true, to "self-host" the stats websites via your APP, by doing StatsServer.getStatsData(); | Data is sent via: "POST /stats" - that endpoint will be automatically assigned by the Server, if your app is a valid APP Server
  bannedUsers: [],
  bot: {
      name: "Ticket Bot Dev",
      icon: "https://i.ibb.co/rdkx8KZ/Ticket-Bot-Logo-With-Name.png",
      website: "https://ticketbots.co.uk",
      client_id: config.clientID,
      client_secret: config.ClientSecret
  },
  stats_uri: "https://devbot.ticketbots.co.uk", //Base URL. Can be IP:PORT or Domains behind a proxy or just a Domain.
  redirect_uri: "https://devbot.ticketbots.co.uk/login", //Landing Page
  owners: ["406164395643633665"],
  authorizationkey: "testing",
});


StatsServer.on('error', console.log)

app.listen(1002, () => {
  console.log("Application started, listening on port 3000!");
});

function receiveStatsDataManually() {
  return StatsServer.getStatsData(); // { raw, pretty }; // (raw|pretty).(shards|total);
}
