import { Client, Collection } from "discord.js";
import { promisify } from "util";
import fs from "fs";
import Keyv from "keyv";
import winston from "winston";

const readdir = promisify(fs.readdir);

export default class Thor extends Client {
  constructor(config) {
    super();
    this.config = config;

    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple()),
      level: "debug",
    });

    this.commands = new Collection();
    this.aliases = new Collection();

    this.settings = new Keyv("sqlite://data/settings.db");

    this.levelCache = {};
    for (let i = 0; i < this.config.permLevels.length; i++) {
      const thisLevel = this.config.permLevels[i];
      this.levelCache[thisLevel.name] = thisLevel.level;
    }
  }

  permlevel = async msg => {
    let permlvl = 0;

    const permOrder = this.config.permLevels.slice(0).sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (msg.guild && currentLevel.guildOnly) {
        continue;
      }

      if (currentLevel.check(msg)) {
        permlvl = currentLevel.level;
        break;
      }
    }

    return permlvl;
  };

  getSettings = async guild => {
    let defaultConf = await this.settings.get("default");

    if (!defaultConf) {
      this.settings.set("default", this.config.defaultSettings);
      defaultConf = this.config.defaultSettings;
    }

    if (!guild) {
      return defaultConf;
    }

    const guildConf = (await this.settings.get(guild.id)) || {};
    return { ...defaultConf, ...guildConf };
  };

  loadCommand = async cmdName => {
    try {
      this.logger.debug(`Loading Command: ${cmdName}`);
      const props = await import(`./commands/${cmdName}`);

      if (props.init) {
        props.init(this);
      }

      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${cmdName}: ${e}`;
    }
  };

  unloadCommand = async cmdName => {
    let command;

    if (this.commands.has(cmdName)) {
      command = this.commands.get(cmdName);
    } else if (this.aliases.has(cmdName)) {
      command = this.commands.get(this.aliases.get(cmdName));
    }

    if (!command) {
      return `The command \`${cmdName}\` doesn't seem to exist, nor is it an alias. Try again!`;
    }

    if (command.shutdown) {
      await command.shutdown(this);
    }

    const mod = require.cache[require.resolve(`./commands/${command.help.name}.js`)];
    delete require.cache[require.resolve(`./commands/${command.help.name}.js`)];

    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }

    return false;
  };
}
