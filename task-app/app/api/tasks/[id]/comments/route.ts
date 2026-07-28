import { NextRequest, NextResponse } from "next/server";
import { canSeeBranch, getCurrentUser } from "@/lib/auth";
import { addComment, addNotification, getTask } from "@/lib/storage";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const task = getTask(params.id);
  if (!task || !canSeeBranch(user, task.branchId)) {
    return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });
  }

  const { text } = await req.json();
  if (typeof text !== "string" || !text.trim()) {
    return NextResponse.json({ error: "Komentár nemôže byť prázdny" }, { status: 400 });
  }

  const comment = addComment(params.id, user.id, text.trim());
  if (!comment) return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });

  addNotification({
    branchId: task.branchId,
    userId: null,
    type: "comment",
    taskId: task.id,
    message: `${user.name} pridal(a) komentár k úlohe "${task.title}"`,
  });

  return NextResponse.json({ comment }, { status: 201 });
}
