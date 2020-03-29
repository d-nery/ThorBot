export default async client => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("thunderatz.org");
};
