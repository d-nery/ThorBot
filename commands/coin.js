export const run = async (client, msg, args) => {
  msg.channel.send(["Cara!", "Coroa!"][Math.round(Math.random())]);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "coin",
  category: "Misc",
  description: "Joga uma moeda",
  usage: "coin",
};
