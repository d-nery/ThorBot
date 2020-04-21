export default async (client, msg) => {
  if (msg.author.bot) {
    return;
  }

  const settings = (msg.settings = await client.getSettings(msg.guild));

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (msg.content.match(prefixMention)) {
    return msg.reply(`Meu prefixo nessa guilda é \`${settings.prefix}\``);
  }

  if (!msg.content.startsWith(settings.prefix)) {
    return;
  }

  const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (msg.guild && !msg.member) {
    await msg.guild.fetchMember(msg.author);
  }

  const level = await client.permlevel(msg);
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd || !cmd.conf.enabled) {
    return msg.reply(
      `não consegui encontrar o comando \`${command}\`. Use \`${settings.prefix}help\` para ver os comandos disponíveis`
    );
  }

  if (!msg.guild && cmd.conf.guildOnly) {
    return msg.channel.send(
      "Esse comando não está disponível em mensagens privadas. Use-o numa guilda."
    );
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return msg.channel.send(`Você não tem permissão para usar esse comando.
Seu nível de permissão é ${level} (${client.config.permLevels.find((l) => l.level === level).name})
Esse comando precisa de nível ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  msg.author.permLevel = level;
  client.logger.debug(
    `[CMD] ${client.config.permLevels.find((l) => l.level === level).name} ${
      msg.author.username
    } (${msg.author.id}) ran command ${cmd.help.name}`
  );

  msg.channel.startTyping();
  await cmd.run(client, msg, args);
  msg.channel.stopTyping();
};
