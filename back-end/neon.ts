// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  // The connection string comes from the environment only (it was hard-coded here, in a public repo).
  const sql = neon(process.env.DATABASE_URL!);
  const data = await sql`...`;
  return data;
}
