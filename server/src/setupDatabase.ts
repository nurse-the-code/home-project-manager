import { config } from "dotenv";
import pg from "pg";

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

  // Create a new database
  await adminClient.query(
    `CREATE DATABASE ${process.env.DB_NAME} WITH OWNER ${process.env.DB_USER}`
  );

  console.log(`Created database ${process.env.DB_NAME}`);

  await adminClient.end();

  // Connect to the newly created database
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  await client.connect();

  // Create a new schema
  await client.query(
    `CREATE SCHEMA IF NOT EXISTS ${process.env.SCHEMA_NAME} AUTHORIZATION ${process.env.DB_USER}`
  );

  console.log(`Created schema ${process.env.SCHEMA_NAME}`);

  await client.end();
};

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
