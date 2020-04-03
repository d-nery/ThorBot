export default {
  ownerID: "232163710506893312",

  admins: [],

  support: [],

  token: "NDE2NjkyOTA2NjExNTcyNzU4.Xn4w8Q.CNfu0XQsPnlmkXfuzDIRPvIjg7k",

  defaultSettings: {
    prefix: ".",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    systemNotice: "true",
    welcomeChannel: "geral",
    welcomeMessage: "Boas vindas {{user}}!",
    welcomeEnabled: "false"
  },

  permLevels: [
    {
      level: 0,
      name: "User",
      check: () => true
    },

    {
      level: 2,
      name: "Moderator",
      check: msg => {
        try {
          const modRole = msg.guild.roles.find(
            r => r.name.toLowerCase() === msg.settings.modRole.toLowerCase()
          );
          if (modRole && msg.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 3,
      name: "Administrator",
      check: msg => {
        try {
          const adminRole = msg.guild.roles.find(
            r => r.name.toLowerCase() === msg.settings.adminRole.toLowerCase()
          );
          return adminRole && msg.member.roles.has(adminRole.id);
        } catch (e) {
          return false;
        }
      }
    },

    {
      level: 4,
      name: "Server Owner",
      check: msg => msg.channel.type === "text" && msg.guild.ownerID === msg.author.id
    },

    {
      level: 8,
      name: "Bot Support",
      check: msg => msg.client.config.support.includes(msg.author.id)
    },

    { level: 9, name: "Bot Admin", check: msg => msg.client.config.admins.includes(msg.author.id) },

    {
      level: 10,
      name: "Bot Owner",
      check: msg => msg.client.config.ownerID === msg.author.id
    }
  ]
};
