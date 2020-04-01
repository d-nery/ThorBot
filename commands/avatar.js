export const run = async (client, msg, args) => {
  if (!msg.mentions.users.size) {
    return msg.channel.send(msg.author.displayAvatarURL({ format: "png", dynamic: true }));
  }

  msg.channel.send(msg.mentions.users.first().displayAvatarURL({ format: "png", dynamic: true }));
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "avatar",
  category: "Geral",
  description: "Mostra o avatar de um usuário.",
  usage: "avatar [mention]",
};
