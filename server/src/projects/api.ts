import { Project } from "./data.js";
import { createProject } from "./logic.js";

export const typeDefs = `#graphql
  type Project {
    id: Int!
    name: String!
    description: String
    dueDate: String
  }

  input ProjectInput {
    name: String!
    description: String
    dueDate: String
  }

  type Mutation {
    createProject(input: ProjectInput!): Project!
  }

  type Query {
    _: Boolean
  }
`;

export const resolvers = {
  Mutation: {
    createProject: async (_: any, { input }: { input: Project }) => {
      return await createProject(input);
    },
  },
};
