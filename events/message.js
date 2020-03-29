export default async (client, msg) => {
  if (msg.author.bot || !msg.content.startsWith(client.config.prefix)) {
    return;
  }

  const args = msg.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) {
    return;
  }

  cmd.run(client, msg, args);
};
