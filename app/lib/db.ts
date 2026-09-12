import postgres from "postgres";

const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof postgres> | undefined;
};

const sql =
  globalForDb.conn ??
  postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = sql;
}

export default sql;
