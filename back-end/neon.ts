// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  console.log(process.env.DATABASE_URL);
  
  const sql = neon(process.env.DATABASE_URL || "");
  const data = await sql`...`;
  return data;
}
