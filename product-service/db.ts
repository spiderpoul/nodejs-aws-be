import { ClientConfig, Client, QueryConfig, QueryResult, QueryBuilder } from "pg";
import { config } from "./config";

const {
    db: { database, host, password, port, user },
} = config;
const clientConfig: ClientConfig = {
    host,
    port,
    database,
    user,
    password,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
};


export const performQuery = async <T>(query: QueryConfig | string): Promise<T[]> => {
  const client = new Client(clientConfig)
  await client.connect();
  const result: QueryResult<T> = await client.query<T>(query);
  return result.rows;
}

export const performQueryWithTransaction = async (queriesBuilders: (QueryBuilder | QueryConfig)[]): Promise<any> => {
  const client = new Client(clientConfig)
  await client.connect();
  try {
    await client.query('BEGIN');
    const results = [];
    for (const queryBuilder of queriesBuilders) {
      let query: QueryConfig = null;
      if (typeof queryBuilder === 'function') {
        query = await queryBuilder(results);
      } else {
        query = queryBuilder
      }
      const { rows: result } = await client.query(query);
      results.push(result);
    }
    await client.query('COMMIT');
    return results;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  }

}