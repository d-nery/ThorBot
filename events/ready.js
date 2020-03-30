export default async client => {
  client.logger.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("thunderatz.org");
};
