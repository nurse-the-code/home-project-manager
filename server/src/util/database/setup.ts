import { config } from "dotenv";
import pg from "pg";
import createTables from "./createTables.js";
import Database from "./db.js";

config();

const { Client } = pg;

const OPTIONS = {
  RESET: "--reset",
};
const shouldReset = process.argv.includes(OPTIONS.RESET);

const PG_ERROR_CODES = {
  DUPLICATE_OBJECT: "42710",
};

const main = async () => {
  const adminClient = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.POSTGRES_SUPERUSER,
    password: process.env.POSTGRES_PASSWORD,
  });

  await adminClient.connect();
  console.log("Connected to Postgres as superuser");

  if (shouldReset) {
    try {
      // Drop the database if it exists
      await adminClient.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
      console.log(`Dropped database ${process.env.DB_NAME}`);

      // Drop the user if it exists
      await adminClient.query(`DROP USER IF EXISTS ${process.env.DB_USER}`);
      console.log(`Dropped user ${process.env.DB_USER}`);
    } catch (error) {
      console.error("Error deleting user and database:", error);
      process.exit(1);
    }
  }

  try {
    // Create a new user (if it doesn't exist)
    await adminClient.query(
      `CREATE USER ${process.env.DB_USER} WITH PASSWORD '${process.env.DB_PASS}'`
    );

    console.log(`Created user ${process.env.DB_USER}`);
  } catch (error) {
    // @ts-ignore
    if (error.code !== PG_ERROR_CODES.DUPLICATE_OBJECT) {
      console.error("Error creating user:", error);
      process.exit(1);
    }
  }

  try {
    // Create a new database with the public schema
    await adminClient.query(
      `CREATE DATABASE ${process.env.DB_NAME} WITH OWNER ${process.env.DB_USER}`
    );

    console.log(`Created database ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("Error creating database:", error);
    process.exit(1);
  }

  await adminClient.end();
  console.log("Disconnected from Postgres as superuser");

  const db = new Database();

  createTables(db)
    .then(() => {
      console.log("Tables created successfully");
    })
    .catch((error) => {
      console.error("Error creating tables:", error);
    })
    .finally(() => {
      db.end();
    });
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
