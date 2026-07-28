import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, SESSION_COOKIE } from "@/lib/auth";
import { getUser } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const { userId, password } = await req.json();
  const user = getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "Používateľ neexistuje" }, { status: 404 });
  }

  if (user.role === "admin" && password !== getAdminPassword()) {
    return NextResponse.json({ error: "Nesprávne heslo" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, user });
  res.cookies.set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
