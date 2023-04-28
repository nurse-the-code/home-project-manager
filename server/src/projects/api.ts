import DateTime from "../util/graphql/DateTime.js";
import { Project } from "./data.js";
import { createProject } from "./logic.js";

export const typeDefs = `#graphql
  scalar DateTime

  type Project {
    id: Int!
    name: String!
    description: String
    dueDate: DateTime
  }

  input ProjectInput {
    name: String!
    description: String
    dueDate: DateTime
  }

  type Mutation {
    createProject(input: ProjectInput!): Project!
  }

  type Query {
    _: Boolean
  }
`;

export const resolvers = {
  DateTime,
  Mutation: {
    createProject: async (_: any, { input }: { input: Project }) => {
      return await createProject(input);
    },
  },
};
