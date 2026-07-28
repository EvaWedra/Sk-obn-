import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { addUser, getUsers } from "@/lib/storage";

const PALETTE = ["#4DBBA8", "#F5A623", "#8B9FE8", "#E88B8B", "#B88BE8"];

export async function GET() {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });
  return NextResponse.json({ users: getUsers() });
}

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Len admin môže pridávať členov" }, { status: 403 });
  }

  const body = await req.json();
  const { name, email, role, branches } = body;
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Meno a email sú povinné" }, { status: 400 });
  }

  const existing = getUsers();
  const color = PALETTE[existing.length % PALETTE.length];
  const newUser = addUser({
    name: name.trim(),
    email: email.trim(),
    role: role === "admin" ? "admin" : "employee",
    branches: Array.isArray(branches) ? branches : [],
    color,
  });

  return NextResponse.json({ user: newUser }, { status: 201 });
}
