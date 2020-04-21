export const run = async (client, msg, args) => {
  let n = Math.random();
  msg.channel.send(n < 0.001 ? "Eita, caiu em pé!" : n < 0.5005 ? "Cara!" : "Coroa!");
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
