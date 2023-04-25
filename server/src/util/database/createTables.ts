import db from "./db.js";

async function createProjectsTable(): Promise<void> {
  const query = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT CHECK (length(description) <= 1023),
      due_date TIMESTAMP WITH TIME ZONE
    )
  `;

  await db.query(query);
}

async function createTables(): Promise<void> {
  await createProjectsTable();
  // add more table creation functions here
}

export default createTables;
