const spyId = 348917866222845952n;

export const run = async (client, msg, args) => {
  if (msg.member.id == spyId) {
    return msg.channel.send("Espião, você não pode usar esse comando...");
  }

  let channel = msg.member.voice.channel;
  let spy = channel.members.find((u) => u.id == spyId);

  if (!spy) {
    return msg.channel.send("Não encontrei o espião no seu canal de voz :(");
  }

  const shouldMute = !(args[0] && args[0] == "off");

  if (shouldMute) {
    await spy.voice.setMute(true);
    return msg.channel.send("Pronto, pode desfrutar da paz");
  }

  await spy.voice.setMute(false);
  return msg.channel.send("Desmutei, se é isso que você quer...");
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "spymute",
  category: "Geral",
  description: "Muta o espião no seu canal de voz, as vezes precisa né.",
  usage: "spymute [off]",
};
