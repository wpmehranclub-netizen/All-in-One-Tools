import { NextResponse } from "next/server";
import { tools as toolsData } from "@/config/toolsDB";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    if (!q) return NextResponse.json({ data: [] });

    const lowerQ = q.toLowerCase();
    const rows = toolsData
      .filter(t => t.name.toLowerCase().includes(lowerQ))
      .map(t => ({ name: t.name, slug: t.slug }))
      .slice(0, 10);
      
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
