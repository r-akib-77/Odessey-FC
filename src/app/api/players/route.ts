import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  try {
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const { results } = await db.prepare("SELECT * FROM players ORDER BY number ASC").all();
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, number, position, role, foot, image } = body;

    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    const result = await db.prepare(
      "INSERT INTO players (name, number, position, role, foot, image) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(name, number, position, role, foot, image).run();

    return NextResponse.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
