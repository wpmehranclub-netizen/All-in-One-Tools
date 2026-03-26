import { NextResponse } from "next/server";
import handlerMap from "@/engine/handlerMap";

export async function POST(request) {
  try {
    const body = await request.json();
    const { slug, payload } = body;

    if (!slug || !payload) {
      return NextResponse.json({ error: 'Missing slug or payload' }, { status: 400 });
    }

    const handler = handlerMap[slug];
    if (!handler) {
      return NextResponse.json({ error: 'Tool execution handler not implemented' }, { status: 404 });
    }

    const result = await handler(payload);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
