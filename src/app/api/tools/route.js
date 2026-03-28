import { NextResponse } from "next/server";
import { tools as toolsData, categories as categoriesData } from "@/config/toolsDB";

export async function GET() {
  try {
    const rows = toolsData.map(t => {
      const category = categoriesData.find(c => c.slug === t.category_slug);
      return {
        id: t.slug,
        name: t.name,
        slug: t.slug,
        config: t.config,
        category_name: category ? category.name : t.category_slug,
        category_slug: t.category_slug
      };
    });
    return NextResponse.json({ data: rows });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
