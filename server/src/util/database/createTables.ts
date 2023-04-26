import Database from "./db";

async function createProjectsTable(db: Database): Promise<void> {
  console.log("Creating projects table...");
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT CHECK (length(description) <= 1023),
      due_date TIMESTAMP WITH TIME ZONE
    )
  `;

  await db.query(query);
  console.log("Finished creating projects table");
}

async function createTables(db: Database): Promise<void> {
  console.log("Creating tables...");
  await createProjectsTable(db);
  // add more table creation functions here
}

export default createTables;
