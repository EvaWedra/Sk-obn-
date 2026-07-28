import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteUser, getUsers, updateUser } from "@/lib/storage";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Len admin môže upravovať členov" }, { status: 403 });
  }

  const body = await req.json();
  const patch: Record<string, unknown> = {};
  if (Array.isArray(body.branches)) patch.branches = body.branches;
  if (body.role === "admin" || body.role === "employee") patch.role = body.role;
  if (typeof body.name === "string" && body.name.trim()) patch.name = body.name.trim();

  const updated = updateUser(params.id, patch);
  if (!updated) return NextResponse.json({ error: "Používateľ nenájdený" }, { status: 404 });
  return NextResponse.json({ user: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Len admin môže odstraňovať členov" }, { status: 403 });
  }
  if (user.id === params.id) {
    return NextResponse.json({ error: "Nemôžete odstrániť sami seba" }, { status: 400 });
  }

  const target = getUsers().find((u) => u.id === params.id);
  if (!target) return NextResponse.json({ error: "Používateľ nenájdený" }, { status: 404 });

  const admins = getUsers().filter((u) => u.role === "admin");
  if (target.role === "admin" && admins.length <= 1) {
    return NextResponse.json({ error: "Musí zostať aspoň jeden admin" }, { status: 400 });
  }

  deleteUser(params.id);
  return NextResponse.json({ ok: true });
}
