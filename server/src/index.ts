// TODO -- add Apollo Server once we have a schema
import { saveProject, Project } from "./projects/data.js";

const newProject = await saveProject({
  name: "test project",
  description: "test description",
  dueDate: new Date(),
});

console.log(newProject);
