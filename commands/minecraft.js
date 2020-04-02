export const run = async (client, msg, args) => {
  msg.channel.send(`**ThunderServidor de Minecraft**
Endereço:  \`35.198.60.125:25565\`
Seed: \`[4230481854676846495]\``);
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
