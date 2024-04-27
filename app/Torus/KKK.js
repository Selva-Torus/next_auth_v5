// server.js (or wherever you initialize your Next.js server)
"use server";
// const { loadConfigFromDatabase } = require("./configManager");

export default async function startServer() {
  // Load dynamic configuration from a database
  //   const dynamicConfig = await loadConfigFromDatabase();

  // Set dynamic configuration as environment variables
  process.env.TEST = "AMAR";
  console.log("sdfs");

  //   Start the Next.js server
  await app.prepare();
  await createServer(handler).listen(3000);
}
