import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET() {
  try {
    const { rows } = await db.query(`
      SELECT t.id, t.name, t.slug, t.config, c.name as category_name, c.slug as category_slug
      FROM tools t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.created_at DESC
    `);
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
