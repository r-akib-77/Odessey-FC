import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { results } = await db.prepare("SELECT * FROM news ORDER BY id DESC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching news for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const body = await request.json();
    const { title, slug, desc, date, category, image, featured } = body;

    if (!title || !slug || !date || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle featured logic
    if (featured === 1) {
      await db.prepare("UPDATE news SET featured = 0").run();
    }

    const info = await db
      .prepare(
        "INSERT INTO news (title, slug, \"desc\", date, category, image, featured) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(title, slug, desc, date, category, image, featured || 0)
      .run();

    return NextResponse.json({ success: true, id: info.meta.last_row_id });
  } catch (error: any) {
    console.error("Error creating news:", error);
    if (error.message?.includes("UNIQUE constraint failed: news.slug")) {
        return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
