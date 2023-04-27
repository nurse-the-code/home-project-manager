import { Project, saveProject } from "./data.js";

export async function createProject(input: Project): Promise<Project> {
  return await saveProject(input);
}
