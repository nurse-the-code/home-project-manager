import db from "./db.js";

async function createProjectsTable(): Promise<void> {
  console.log("Creating projects table...");
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT CHECK (length(description) <= 1023),
      due_date TIMESTAMP WITH TIME ZONE
    )
  `;
  console.log("Finished creating projects table");

  await db.query(query);
}

async function createTables(): Promise<void> {
  console.log("Creating tables...");
  await createProjectsTable();
  // add more table creation functions here
  console.log("Finished creating tables");
}

export default createTables;
