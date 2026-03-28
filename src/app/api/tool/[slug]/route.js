import { NextResponse } from "next/server";
import { tools as toolsData } from "@/config/toolsDB";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const tool = toolsData.find(t => t.slug === slug);
    if (!tool) {
      return NextResponse.json({ error: 'Tool not found' }, { status: 404 });
    }
    return NextResponse.json({ data: tool });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
