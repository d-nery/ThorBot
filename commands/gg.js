export const run = async (client, msg, args) => {
  msg.channel.send(["ez!", "izi", "coxa", "coxa"][Math.floor(Math.random() * 3)]);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "gg",
  category: "Misc",
  description: "GG izi",
  usage: "gg",
};
