import Discord from "discord.js";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  console.log(`Got ${msg.content}`);

  if (msg.content === "-renzo") {
    const attachment = new Discord.MessageAttachment(
      `https://static.thunderatz.org/thunderbot/renzo/renzo${Math.floor(Math.random() * 9) + 1}.png`
    );
    msg.channel.send(attachment);
  }
});

client.login("NDE2NjkyOTA2NjExNTcyNzU4.Xn4w8Q.CNfu0XQsPnlmkXfuzDIRPvIjg7k");
