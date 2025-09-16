// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  console.log(process.env.DATABASE_URL);

  const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_VIA6CWsa7BLJ@ep-nameless-butterfly-a59a27bo-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
  const data = await sql`...`;
  return data;
}
