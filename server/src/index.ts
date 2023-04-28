import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { saveProject, Project } from "./projects/data.js";
import Database from "./util/database/db.js";
import { resolvers, typeDefs } from "./projects/api.js";

export const db = new Database();

async function main() {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      // Log the full error details on the server for debugging
      console.error(error);

      // Customize the error message for clients
      return process.env.NODE_ENV === "production"
        ? new Error("An error occurred")
        : error;
    },
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main().catch((err) => console.error(err));

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log("Gracefully shutting down...");
  await db.end();
  console.log("Shut down database connection");
  console.log("Goodbye! 👋");
  process.exit(0);
};

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received. Closing database connection.");
  await gracefulShutdown();
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received. Closing database connection.");
  await db.end();
  await gracefulShutdown();
});
