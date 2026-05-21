import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    if (slug) {
      const result = await db.prepare("SELECT * FROM news WHERE slug = ?").bind(slug).first();
      if (!result) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
      return NextResponse.json(result);
    }

    const { results } = await db.prepare("SELECT * FROM news ORDER BY id DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
