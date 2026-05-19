import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const IDEAS_FILE = join(process.cwd(), "data", "ideas.json");

function readIdeas() {
  try {
    return JSON.parse(readFileSync(IDEAS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeIdeas(ideas: unknown[]) {
  writeFileSync(IDEAS_FILE, JSON.stringify(ideas, null, 2));
}

export async function GET() {
  const ideas = readIdeas();
  return NextResponse.json(ideas);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const ideas = readIdeas().filter((i: { id: string }) => i.id !== id);
  writeIdeas(ideas);
  return NextResponse.json({ ok: true });
}
