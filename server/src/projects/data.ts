import Database from "../util/database/db.js";
import { db as defaultDatabase } from "../index.js";

export interface Project {
  name: string;
  description?: string;
  dueDate?: Date;
}

export async function saveProject(
  project: Project,
  db: Database = defaultDatabase
): Promise<Project> {
  const { name, description, dueDate } = project;

  return await db.transaction(async (client) => {
    const result = await client.query(
      "INSERT INTO projects(name, description, due_date) VALUES($1, $2, $3) RETURNING *",
      [name, description, dueDate || null]
    );
    return result.rows[0];
  });
}
