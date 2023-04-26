import db from "../util/database/db.js";
import withTransaction from "../util/database/transaction.js";
import { ITask } from "pg-promise";

export interface Project {
  name: string;
  description?: string;
  dueDate?: Date;
}

export async function saveProject(project: Project): Promise<Project> {
  const { name, description, dueDate } = project;

  return await db.task(async (tx: ITask<unknown>) => {
    return await tx.one(
      "INSERT INTO projects(name, description, due_date) VALUES($1, $2, $3) RETURNING *",
      [name, description, dueDate || null]
    );
  });
}
