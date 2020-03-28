import { Client, MessageAttachment } from "discord.js";
import config from "./config.json";

const client = new Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`nice combat videos`, { type: "WATCHING" });
});

client.on("message", async msg => {
  if (msg.author.bot || !msg.content.startsWith(config.prefix)) {
    return;
  }

  const args = msg.content
    .slice(config.prefix.length)
    .trim()
    .split(" ");
  const command = args.shift().toLowerCase();

  if (command === "renzo") {
    const attachment = new MessageAttachment(
      `https://static.thunderatz.org/thunderbot/renzo/renzo${Math.floor(Math.random() * 9) + 1}.png`
    );
    msg.channel.send(attachment);
  }

  if (command === "ping") {
    const m = await msg.channel.send("Ping?");
    m.edit(`Pong! ${m.createdTimestamp - msg.createdTimestamp}ms.`);
  }
});

client.login("NDE2NjkyOTA2NjExNTcyNzU4.Xn4w8Q.CNfu0XQsPnlmkXfuzDIRPvIjg7k");
