import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const team = searchParams.get("team");

    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    try {
      await db.prepare("ALTER TABLE players ADD COLUMN team TEXT DEFAULT 'Boys'").run();
    } catch (e) {
      // Ignore if column already exists
    }

    let results;
    if (team) {
      const res = await db.prepare("SELECT * FROM players WHERE team = ? ORDER BY number ASC").bind(team).all();
      results = res.results;
    } else {
      const res = await db.prepare("SELECT * FROM players ORDER BY number ASC").all();
      results = res.results;
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, number, position, role, foot, image, team } = body;

    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    try {
      await db.prepare("ALTER TABLE players ADD COLUMN team TEXT DEFAULT 'Boys'").run();
    } catch (e) {
      // Ignore if column already exists
    }

    const result = await db.prepare(
      "INSERT INTO players (name, number, position, role, foot, image, team) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(name, number, position, role, foot, image, team || "Boys").run();

    return NextResponse.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
