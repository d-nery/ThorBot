import { MessageAttachment } from "discord.js";

export const run = async (client, msg, args) => {
  if (args[0] !== "renzo") {
    return;
  }

  const attachment = new MessageAttachment(
    `https://static.thunderatz.org/thunderbot/renzo/renzo${Math.floor(Math.random() * 9) + 1}.png`
  );

  msg.channel.send(attachment);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["st"],
  permLevel: "User"
};

export const help = {
  name: "sticker",
  category: "X",
  description: "Manda um sticker aleatório de alguém, por enquanto só do renzo rs.",
  usage: "sticker <name>"
};
