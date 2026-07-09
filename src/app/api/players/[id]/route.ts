import { NextResponse } from "next/server";

export const runtime = "edge";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { name, number, position, role, foot, image } = body;

    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    await db.prepare(
      "UPDATE players SET name = ?, number = ?, position = ?, role = ?, foot = ?, image = ? WHERE id = ?"
    ).bind(name, number, position, role, foot, image, id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const db = process.env.DB as any;
    if (!db) {
      return NextResponse.json({ error: "Database binding not found" }, { status: 500 });
    }

    await db.prepare("DELETE FROM players WHERE id = ?").bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
