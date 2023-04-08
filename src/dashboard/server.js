const Stats  = require('discord-live-stats');

const express = require("express");
const app = express();

const client = new Stats.Server(app, {
    bot: {
        name: "Ticket Bot",
        icon: "https://cdn.discordapp.com/attachments/799964332950683668/1065678710491070484/Ticket_Bot_Logo_2023.png",
        website: "https://ticketbots.co.uk",
        client_id: "799231222303293461",
        client_secret: "Pu1GOyrvlG7YfB2v4KT3zkqxygSKOAyI"
    },
    stats_uri: "https://shard1.ticketbots.co.uk/", //Base URL
    redirect_uri: "https://shard1.ticketbots.co.uk/login", //Landing Page
    owners: ["406164395643633665"],
    authorizationkey: "ticketbot",
})

client.on('error', console.log)

app.listen(105, () => {
  console.log("Application started, listening on port 3000!");
});