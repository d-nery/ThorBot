export const run = async (client, msg, args) => {
  const m = await msg.channel.send("Ping?");
  m.edit(`Pong! ${m.createdTimestamp - msg.createdTimestamp}ms.`);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

export const help = {
  name: "ping",
  category: "X",
  description: "Vê a latência.",
  usage: "ping"
};
