import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ data: [] });

    const { rows } = await db.query(
      `SELECT name, slug FROM tools WHERE name ILIKE $1 LIMIT 10`,
      [`%${q}%`]
    );
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
