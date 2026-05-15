import { NextRequest, NextResponse } from "next/server";
import { deleteAnnouncement } from "@/lib/storage";

function checkAuth(req: NextRequest) {
  return req.cookies.get("admin_token")?.value === process.env.ADMIN_TOKEN;
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  deleteAnnouncement(id);
  return NextResponse.json({ ok: true });
}
