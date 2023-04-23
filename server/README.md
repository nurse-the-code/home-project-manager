# Backend Instructions

This README file contains instructions for setting up and starting the database and server for the Home Project Manager app.

## Prerequisites

Ensure you have the following installed:

- Node.js v14 or higher
- Yarn package manager
- PostgreSQL 14

## Setting up the environment

1. Create a `.env` file in the root folder of the project, and copy the contents from the provided `.env.example` example.

2. Replace any placeholder values in the `.env` file with your specific PostgreSQL configuration.

## Setting up PostgreSQL

Before setting up the database, ensure that PostgreSQL is properly installed and configured on your system. Some generic instructions include:

1. Install PostgreSQL 14 on your system following the official documentation for your operating system.

2. Start the PostgreSQL service and ensure it's running. The process may vary depending on your operating system.

3. Create a PostgreSQL superuser, if you haven't already, with the necessary privileges to create and manage databases and users.

4. Update the `.env` file with your PostgreSQL superuser credentials and other specific configuration details.

## Setting up the database

1. In your terminal, navigate to the root folder of the project.

2. To set up the database, run the following command:

```bash
yarn db:setup
```

This command will create the PostgreSQL user, database, and schema specified in your `.env` file.

3. If you need to reset the database, run the following command:

```bash
yarn db:reset
```

This command will drop the existing user and database, then create a new user, database, and schema.

## Starting the server

1. In your terminal, navigate to the root folder of the project.

2. To start the server, run the following command:

```bash
yarn start
```

This command will compile the TypeScript files and start the server.

You're now ready to work on your Starter Project!
