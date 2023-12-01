const { SlashCommandBuilder } = require('@discordjs/builders');
// const pagination = require('discordjs-button-pagination');

const Discord = require('discord.js');
const { EmbedBuilder, } = require('discord.js');
const ticketclaim = require('../schemas/ticketclaim')
const MainFile = require('../../slappey.json')
const ProKeys = require('../schemas/keys')
const { ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const axios = require('axios');
const timestamp = require('unix-timestamp');
timestamp.round = true
const { Translate } = require('@google-cloud/translate').v2;
const { TranslateID } = require('../../slappey.json')
const config = require('../../slappey.json')
const sellix = require("@sellix/node-sdk")(config.StoreCode, "ticketbot");


const hardwarePayload = {
    key: "TICKETBOT-FDKZIGKTGHHNMFMQ",
    product_id: "6297d688d34c6"
  };



module.exports.data = new SlashCommandBuilder()
    .setName('test')
    .setDescription('test Command')

module.exports.run = async (client, interaction) => {
    void (async () => {
        try {
          const check = await sellix.products.licensing.check(hardwarePayload);
          console.log(check)
          const toTimestamp = (strDate) => {
            const dt = new Date(strDate).getTime();
            return dt / 1000;
          }
          console.log(toTimestamp(check.expires_at));
          interaction.reply(`<t:${toTimestamp(check.expires_at)}:f>`)
        } catch (e) {
          console.log(e);
          if (e === 'Error: License expired.: {"status":400,"data":null,"error":"License expired.","message":null,"env":"production"}') {
            console.log('kik')
          }
        }
      })();
}