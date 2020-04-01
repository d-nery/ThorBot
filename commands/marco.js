export const run = async (client, msg, args) => {
  const m = await msg.channel.send("Marco?");
  m.edit(`Polo! ${m.createdTimestamp - msg.createdTimestamp}ms.`);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "marco",
  category: "Geral",
  description: "Vê a latência.",
  usage: "marco",
};
