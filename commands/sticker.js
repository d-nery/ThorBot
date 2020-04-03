import { MessageAttachment } from "discord.js";

const stickers = new Map([
  ["renzo", 10],
  ["schneider", 8],
  ["schin", "schneider"],
]);

const baseURL = "https://static.thunderatz.org/thunderbot/";

export const run = async (client, msg, args, level) => {
  if (!args[0]) {
    return;
  }

  let person = args[0];

  if (!stickers.has(person)) {
    return;
  }

  if (typeof stickers.get(person) == "string") {
    person = stickers.get(person);
  }

  const attachment = new MessageAttachment(
    `${baseURL}/${person}/${person}${Math.floor(Math.random() * (stickers.get(person) - 1)) + 1}.png`
  );

  msg.channel.send(attachment);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["st"],
  permLevel: "User",
};

export const help = {
  name: "sticker",
  category: "Geral",
  description: "Manda um sticker aleatório de alguém, por enquanto só do renzo e do schneider rs.",
  usage: "sticker <name>",
};
