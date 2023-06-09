import { config } from 'dotenv';
config();

import pgPromise, { IMain } from 'pg-promise';

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const localConnectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;
const connectionString = process.env.DATABASE_URL || localConnectionString;

const pgp: IMain = pgPromise();
const db = pgp(connectionString);

export default db;


