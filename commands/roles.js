// Guilds this command can be run on
const availableOn = [241188169033318400n];

const roles = new Map([
  ["mine", "Minecrafter"],
  ["lol", "LoLzero"],
  ["dontstarve", "Esfomeado"],
  ["gartic", "Gartiqueiro"],
  ["amongus", "Espaçonauta"],
]);

export const run = async (client, msg, args) => {
  if (availableOn.includes(msg.guild.id)) {
    return msg.channel.send("Esse comando não está disponível nesse servidor.");
  }

  let action = "add";
  if (args && args[0] === "remove") {
    action = "remove";
  }

  let reacts = [...roles.keys()].map((v) => client.emojis.cache.find((em) => em.name === v).id);
  let output = `**Reaja abaixo para ${action === "add" ? "adicionar" : "remover"} algum dos cargos de jogo**`;

  const reply = await msg.channel.send(output);

  for (let r of reacts) {
    await reply.react(r);
  }

  const collector = reply.createReactionCollector((r, u) => reacts.includes(r.emoji.id) && u.id === msg.author.id, {
    time: 15000,
  });

  collector.on("collect", (r) => {
    let role = msg.guild.roles.cache.find((role) => role.name === roles.get(r.emoji.name));

    if (action === "remove" && msg.member.roles.cache.has(role.id)) {
      msg.member.roles.remove(role);
      output += `\nRemovi ${role.name} de ${msg.member.displayName}.`;
    } else if (action === "add" && !msg.member.roles.cache.has(role.id)) {
      msg.member.roles.add(role);
      output += `\nAdicionei ${role.name} a ${msg.member.displayName}.`;
    }

    reply.edit(output);
  });

  collector.on("end", () => {
    output += `\nPronto.`;
    reply.edit(output);
    reply.reactions.removeAll();
  });
};

export const conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

export const help = {
  name: "roles",
  category: "Geral",
  description: `Deixa você escolher roles de jogo pra ser marcado quando necessário.
Depois de fazer o comando terá 15 segundos para clicar nas reactions.`,
  usage: "roles [remove]",
};
