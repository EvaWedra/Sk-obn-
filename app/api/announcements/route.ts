import { NextRequest, NextResponse } from "next/server";
import { getAnnouncements, addAnnouncement } from "@/lib/storage";

function checkAuth(req: NextRequest) {
  return req.cookies.get("admin_token")?.value === process.env.ADMIN_TOKEN;
}

export async function GET() {
  return NextResponse.json(getAnnouncements());
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Missing text" }, { status: 400 });
  const ann = addAnnouncement(text.trim());
  return NextResponse.json(ann);
}
