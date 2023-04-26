// TODO -- add Apollo Server once we have a schema
import { saveProject, Project } from "./projects/data.js";
import Database from "./util/database/db.js";

const db = new Database();

async function main() {
  const project: Project = {
    name: "My Project",
    description: "This is my project",
    dueDate: new Date(),
  };

  const savedProject = await saveProject(db, project);
  console.log(savedProject);

  await db.end();
}

main().catch((err) => console.error(err));
