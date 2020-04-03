(async () => {
  let c = await import("./commands/avatar.js");
  console.log(c.conf);
  console.log(c.help);
  console.log(c.run);
})();
