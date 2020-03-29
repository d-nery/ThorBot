export const run = async (client, msg, args) => {
  if (!args[0]) {
    const commandNames = client.commands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Lista de Comandos =\n\n[Use ${client.config.prefix}help <commandname> for details]\n`;
    const sorted = client.commands
      .array()
      .sort((p, c) =>
        p.help.category > c.help.category
          ? 1
          : p.help.name > c.help.name && p.help.category === c.help.category
          ? 1
          : -1
      );

    sorted.forEach(c => {
      const cat = c.help.category;
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${
        c.help.description
      }\n`;
    });

    msg.channel.send(output, { code: "asciidoc", split: { char: "\u200b" } });
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      msg.channel.send(
        `= ${command.help.name} = \n${command.help.description}\nusage:: ${
          command.help.usage
        }\naliases:: ${command.conf.aliases.join(", ")}`,
        { code: "asciidoc" }
      );
    }
  }
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h"],
  permLevel: "User",
};

export const help = {
  name: "help",
  category: "X",
  description: "Mostra essa ajuda ou a de um comando específico.",
  usage: "help",
};
