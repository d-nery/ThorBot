export const run = async (client, msg, args) => {
  if (!args || args.length < 1) {
    return msg.reply("Must provide a command to reload.");
  }

  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  let response = await client.unloadCommand(args[0]);

  if (response) {
    return msg.reply(`Error Unloading: ${response}`);
  }

  response = await client.loadCommand(command.help.name);

  if (response) {
    return msg.reply(`Error Loading: ${response}`);
  }

  msg.reply(`The command \`${command.help.name}\` has been reloaded`);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin",
};

export const help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that's been modified.",
  usage: "reload [command]",
};
