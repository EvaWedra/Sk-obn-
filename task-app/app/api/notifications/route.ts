import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { markNotificationsRead, notificationsForUser } from "@/lib/storage";

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const notifications = notificationsForUser(user);
  return NextResponse.json({ notifications });
}

export async function PATCH(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const { ids } = await req.json();
  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: "Chýba zoznam ids" }, { status: 400 });
  }
  markNotificationsRead(user.id, ids);
  return NextResponse.json({ ok: true });
}
