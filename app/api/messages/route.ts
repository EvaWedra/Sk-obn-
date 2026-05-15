import { NextRequest, NextResponse } from "next/server";
import { addMessage, getMessages } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, topic, message } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const msg = addMessage({ name: name.trim(), contact: contact?.trim() ?? "", topic, message: message.trim() });
    return NextResponse.json({ ok: true, id: msg.id });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const messages = getMessages();
  return NextResponse.json(messages);
}
