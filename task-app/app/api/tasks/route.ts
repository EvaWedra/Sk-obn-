import { NextRequest, NextResponse } from "next/server";
import { canSeeBranch, getCurrentUser } from "@/lib/auth";
import { addNotification, addTask, getTasks } from "@/lib/storage";
import { getBranch, getSection } from "@/lib/config";

export async function GET(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("section");
  const branchId = searchParams.get("branch");
  const view = searchParams.get("view"); // "archive" = completed tasks, otherwise active tasks

  let tasks = getTasks().filter((t) => canSeeBranch(user, t.branchId));
  if (sectionId) tasks = tasks.filter((t) => t.sectionId === sectionId);
  if (branchId && branchId !== "all") tasks = tasks.filter((t) => t.branchId === branchId);
  tasks = tasks.filter((t) => (view === "archive" ? t.status === "hotove" : t.status !== "hotove"));

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const body = await req.json();
  const { sectionId, branchId, title, description, priority, tags, assigneeId, recurrence } = body;

  if (!sectionId || !branchId || !title?.trim()) {
    return NextResponse.json({ error: "Chýbajú povinné polia" }, { status: 400 });
  }
  if (!canSeeBranch(user, branchId)) {
    return NextResponse.json({ error: "Nemáte prístup do tejto pobočky" }, { status: 403 });
  }
  const section = getSection(sectionId);
  if (section?.adminOnly && user.role !== "admin") {
    return NextResponse.json({ error: "Túto sekciu môže vytvárať len admin" }, { status: 403 });
  }

  const task = addTask({
    sectionId,
    branchId,
    title: title.trim(),
    description: description?.trim() ?? "",
    priority: priority ?? "normalna",
    tags: Array.isArray(tags) ? tags : [],
    assigneeId: assigneeId || null,
    createdBy: user.id,
    status: "nove",
    recurrence: recurrence ?? "none",
    photos: Array.isArray(body.photos) ? body.photos : [],
  });

  const branch = getBranch(branchId);
  addNotification({
    branchId,
    userId: null,
    type: "new_task",
    taskId: task.id,
    message: `Nová úloha v pobočke ${branch?.name ?? branchId}: "${task.title}"`,
  });

  if (task.assigneeId) {
    addNotification({
      branchId,
      userId: task.assigneeId,
      type: "assigned",
      taskId: task.id,
      message: `Bola vám priradená úloha: "${task.title}"`,
    });
  }

  return NextResponse.json({ task }, { status: 201 });
}
