const prefix = require("../schemas/TicketData");

const getprefix = async (guildID) => {
  const result = await prefix.findOne({
    ServerID: guildID,
  });

  if (result) {
    return result.BotPrefix;
  } else if (!result) {
    return "!";
  }
};

module.exports = getprefix;