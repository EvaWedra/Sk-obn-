import { NextRequest, NextResponse } from "next/server";
import { canSeeBranch, getCurrentUser } from "@/lib/auth";
import { addNotification, deleteTask, getTask, updateTask } from "@/lib/storage";
import { priorityLabels, statusLabels } from "@/lib/config";
import type { Priority, Recurrence, Status } from "@/lib/types";

const ALLOWED_PRIORITIES: Priority[] = ["nizka", "normalna", "dolezita", "urgentna"];
const ALLOWED_STATUSES: Status[] = ["nove", "riesi_sa", "hotove"];
const ALLOWED_RECURRENCE: Recurrence[] = ["none", "daily", "weekly", "monthly"];

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const task = getTask(params.id);
  if (!task || !canSeeBranch(user, task.branchId)) {
    return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });
  }
  return NextResponse.json({ task });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });

  const existing = getTask(params.id);
  if (!existing || !canSeeBranch(user, existing.branchId)) {
    return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });
  }

  const body = await req.json();
  const patch: Record<string, unknown> = {};

  if (typeof body.title === "string" && body.title.trim()) patch.title = body.title.trim();
  if (typeof body.description === "string") patch.description = body.description.trim();
  if (Array.isArray(body.tags)) patch.tags = body.tags;
  if (Array.isArray(body.photos)) patch.photos = body.photos;
  if ("assigneeId" in body) patch.assigneeId = body.assigneeId || null;
  if (body.priority && ALLOWED_PRIORITIES.includes(body.priority)) patch.priority = body.priority;
  if (body.status && ALLOWED_STATUSES.includes(body.status)) patch.status = body.status;
  if (body.recurrence && ALLOWED_RECURRENCE.includes(body.recurrence)) patch.recurrence = body.recurrence;

  const updated = updateTask(params.id, patch);
  if (!updated) return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });

  if (patch.status && patch.status !== existing.status) {
    if (patch.status === "hotove") {
      addNotification({
        branchId: updated.branchId,
        userId: null,
        type: "completed",
        taskId: updated.id,
        message: `Úloha "${updated.title}" bola označená ako hotová`,
      });
    } else {
      addNotification({
        branchId: updated.branchId,
        userId: null,
        type: "status_changed",
        taskId: updated.id,
        message: `Stav úlohy "${updated.title}" zmenený na "${statusLabels[patch.status as string]}"`,
      });
    }
  }

  if (patch.priority && patch.priority !== existing.priority) {
    addNotification({
      branchId: updated.branchId,
      userId: null,
      type: "priority_changed",
      taskId: updated.id,
      message: `Priorita úlohy "${updated.title}" zmenená na "${priorityLabels[patch.priority as string]}"`,
    });
  }

  if ("assigneeId" in patch && patch.assigneeId && patch.assigneeId !== existing.assigneeId) {
    addNotification({
      branchId: updated.branchId,
      userId: patch.assigneeId as string,
      type: "assigned",
      taskId: updated.id,
      message: `Bola vám priradená úloha: "${updated.title}"`,
    });
  }

  return NextResponse.json({ task: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = getCurrentUser();
  if (!user) return NextResponse.json({ error: "Neprihlásený" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Len admin môže mazať úlohy" }, { status: 403 });
  }
  const task = getTask(params.id);
  if (!task) return NextResponse.json({ error: "Úloha nenájdená" }, { status: 404 });

  deleteTask(params.id);
  return NextResponse.json({ ok: true });
}
