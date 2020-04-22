export const run = async (client, msg, args) => {
  msg.channel.send(`**ThunderServidor de Minecraft**
Endereço:  \`${client.config.thunder.mine.addr}\`
Seed: \`[${client.config.thunder.mine.seed}]\``);
};

export const conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mine"],
  permLevel: "User",
};

export const help = {
  name: "minecraft",
  category: "Jogos",
  description: "Mostra o informações do ThunderServidor de Minecraft.",
  usage: "minecraft",
};
