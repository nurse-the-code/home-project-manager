import { IDatabase, ITask } from "pg-promise";

async function withTransaction<T>(
  db: IDatabase<unknown>,
  fn: (tx: ITask<unknown>) => Promise<T>
): Promise<T> {
  // @ts-ignore
  const tx = await db.tx();
  try {
    const result = await fn(tx);
    await tx.commit();
    return result;
  } catch (error) {
    await tx.rollback();
    throw error;
  }
}

export default withTransaction;
