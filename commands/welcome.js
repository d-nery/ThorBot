export const run = async (client, msg, args) => {
  let channel = msg.channel;

  if (msg.mentions.channels.size) {
    channel = msg.mentions.channels.first();
  }

  await channel.send("", {
    files: ["./media/serverbanner.png"],
  });

  await channel.send(`Olá! Eu sou o Thor, mascote e entidade virtual da Equipe ThundeRatz de Robótica. Boas-vindas ao ThundeRatz Gaming, nosso servidor para jogos e para descontrair.

À esquerda pode achar os canais de texto e voz para diferentes coisas, tente seguir o propósito de cada um para não ficar bagunçado, eles são auto explicativos (e tem uma pequena descrição em cima de alguns), por exemplo, o @Groovy só responde a comandos no <#693174412010193016>.

Este servidor não é restrito apenas a pessoas da equipe, se tem alguém que queira chamar, só mandar o link abaixo.

No mais, é isso, respeitem-se e sem tretas, estão todos sujeitos às diretrizes do discord (https://discord.com/guidelines) e ao bom senso, qualquer problema ou dúvida fale com o <@${client.config.ownerID}> ou outra <@&691071685159551096>.

Bons jogos! <:thor2joinha:694729615926886440>

https://discord.gg/jc4nqXJ`);
};

export const conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner",
};

export const help = {
  name: "welcome",
  category: "System",
  description: "Manda a mensagem de boas-vindas no canal especificado",
  usage: "welcome [channel]",
};
