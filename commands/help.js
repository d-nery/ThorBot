import { MessageEmbed } from "discord.js";

export const run = async (client, msg, args) => {
  if (!args[0]) {
    const myCommands = msg.guild
      ? client.commands.filter(cmd => cmd.conf.enabled && client.levelCache[cmd.conf.permLevel] <= msg.author.permLevel)
      : client.commands.filter(
          cmd =>
            cmd.conf.enabled &&
            cmd.conf.guildOnly !== true &&
            client.levelCache[cmd.conf.permLevel] <= msg.author.permLevel
        );

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    const sorted = myCommands
      .array()
      .sort((p, c) =>
        p.help.category > c.help.category
          ? 1
          : p.help.name > c.help.name && p.help.category === c.help.category
          ? 1
          : -1
      );

    const exampleEmbed = new MessageEmbed()
      .setColor("#e800ff")
      .setAuthor("Olá! Thor aqui!", "https://static.thunderatz.org/ThorJoinha.png", "https://thunderatz.org")
      .setDescription("Aqui você pode ver todos os comandos que eu conheço.")
      .setTimestamp()
      .setFooter("ThundeRatz", "https://static.thunderatz.org/ThorJoinha.png");

    let currentCategory = sorted[0].help.category.toUpperCase();
    let field = "";
    sorted.forEach(c => {
      const cat = c.help.category.toUpperCase();
      if (currentCategory !== cat) {
        exampleEmbed.addField(currentCategory, field.slice(0, field.length - 2));
        field = "";
        currentCategory = cat;
      }
      field += `\`${c.help.name}\`, `;
    });

    exampleEmbed.addField(currentCategory, field.slice(0, field.length - 2));
    exampleEmbed.addField("\u200b", "**Use `.help <comando>` para ajuda mais específica.**");

    msg.channel.send(exampleEmbed);
  } else {
    let command = args[0];
    if (client.commands.has(command) && client.commands.get(command).conf.enabled) {
      command = client.commands.get(command);
      msg.channel.send(
        `= ${command.help.name} = \n${command.help.description}\nusage:: ${
          command.help.usage
        }\naliases:: ${command.conf.aliases.join(", ")}`,
        { code: "asciidoc" }
      );
    } else {
      msg.channel.send(`Comando ${command} não reconhecido!`);
    }
  }
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "ajuda", "?"],
  permLevel: "User",
};

export const help = {
  name: "help",
  category: "Geral",
  description: "Mostra todos os comandos disponíveis, ou detalhes de um comando específico.",
  usage: "help [comando]",
};
