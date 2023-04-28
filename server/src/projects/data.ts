import Database from "../util/database/db.js";
import { db as defaultDatabase } from "../index.js";

const mapProject = (row: any) => {
  // const dueDate = row.due_date;
  const { due_date: dueDate } = row;
  return { ...row, dueDate };
};

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
      [name, description, dueDate?.toISOString() || null]
    );

    return mapProject(result.rows[0]);
  });
}
