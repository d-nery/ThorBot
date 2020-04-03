export default async client => {
  client.logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("lutas top no youtube.", { type: "WATCHING" });
};
