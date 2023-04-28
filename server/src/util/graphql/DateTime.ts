import { GraphQLScalarType, Kind } from "graphql";

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description:
    "Date and time value with timezone, represented as an ISO 8601 string",

  parseValue(value: unknown): Date {
    if (typeof value !== "string") {
      throw new Error("DateTime must be a string in ISO 8601 format");
    }
    const date = new Date(value);
    if (isNaN(date.valueOf())) {
      throw new Error("Invalid date format");
    }
    return date;
  },

  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error("Value must be an instance of Date");
    }
    if (isNaN(value.getTime())) {
      throw new Error("Invalid date format");
    }
    return value.toISOString();
  },

  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (isNaN(date.valueOf())) {
        throw new Error("Invalid date format");
      }
      return date;
    }
    throw new Error("Date must be a string in ISO 8601 format");
  },
});

export default DateTime;
