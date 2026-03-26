import { NextResponse } from "next/server";
import db from "@/config/db";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const { rows } = await db.query(`SELECT * FROM tools WHERE slug = $1`, [slug]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }
    return NextResponse.json({ data: rows[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
