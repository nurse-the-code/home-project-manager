import { config } from "dotenv";
import pg, { PoolClient } from "pg";
const { Pool } = pg;

config();

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const localConnectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;
const connectionString = process.env.DATABASE_URL || localConnectionString;

const pool = new Pool({
  connectionString: connectionString,
});

class Database {
  async query(text: string, params?: any[]) {
    const client = await pool.connect();
    try {
      return client.query(text, params);
    } finally {
      client.release();
    }
  }

  async transaction(fn: (client: PoolClient) => Promise<any>) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await fn(client);
      await client.query("COMMIT");
      return result;
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }

  async getClient() {
    return await pool.connect();
  }

  async end() {
    await pool.end();
  }
}

export default Database;
