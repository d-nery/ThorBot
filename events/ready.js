export default async client => {
  client.logger.log(`Logged in as ${client.user.tag}!`, "ready");
  client.user.setActivity("lutas top no youtube.", { type: "WATCHING" });
};
