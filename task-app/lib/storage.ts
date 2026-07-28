import fs from "fs";
import path from "path";
import type { Comment, Notification, Task, User } from "./types";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(filename: string, fallback: T): T {
  const filePath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// ---------- Users ----------

export function getUsers(): User[] {
  return readJSON<User[]>("users.json", []);
}

export function getUser(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function addUser(data: Omit<User, "id">): User {
  const users = getUsers();
  const user: User = { ...data, id: newId() };
  users.push(user);
  writeJSON("users.json", users);
  return user;
}

export function updateUser(id: string, patch: Partial<Omit<User, "id">>): User | null {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...patch };
  writeJSON("users.json", users);
  return users[idx];
}

export function deleteUser(id: string): void {
  const users = getUsers().filter((u) => u.id !== id);
  writeJSON("users.json", users);
}

// ---------- Tasks ----------

export function getTasks(): Task[] {
  return readJSON<Task[]>("tasks.json", []);
}

export function getTask(id: string): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

export function addTask(
  data: Omit<Task, "id" | "createdAt" | "updatedAt" | "comments">
): Task {
  const tasks = getTasks();
  const now = new Date().toISOString();
  const task: Task = {
    ...data,
    id: newId(),
    createdAt: now,
    updatedAt: now,
    comments: [],
  };
  tasks.unshift(task);
  writeJSON("tasks.json", tasks);
  return task;
}

export function updateTask(id: string, patch: Partial<Task>): Task | null {
  const tasks = getTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...patch, updatedAt: new Date().toISOString() };
  writeJSON("tasks.json", tasks);
  return tasks[idx];
}

export function addComment(taskId: string, authorId: string, text: string): Comment | null {
  const tasks = getTasks();
  const idx = tasks.findIndex((t) => t.id === taskId);
  if (idx === -1) return null;
  const comment: Comment = {
    id: newId(),
    authorId,
    text,
    createdAt: new Date().toISOString(),
  };
  tasks[idx].comments.push(comment);
  tasks[idx].updatedAt = new Date().toISOString();
  writeJSON("tasks.json", tasks);
  return comment;
}

export function deleteTask(id: string): void {
  const tasks = getTasks().filter((t) => t.id !== id);
  writeJSON("tasks.json", tasks);
}

// ---------- Notifications ----------

export function getNotifications(): Notification[] {
  return readJSON<Notification[]>("notifications.json", []);
}

export function addNotification(data: Omit<Notification, "id" | "createdAt" | "readBy">): Notification {
  const notifications = getNotifications();
  const notification: Notification = {
    ...data,
    id: newId(),
    createdAt: new Date().toISOString(),
    readBy: [],
  };
  notifications.unshift(notification);
  writeJSON("notifications.json", notifications);
  return notification;
}

export function markNotificationsRead(userId: string, ids: string[]): void {
  const notifications = getNotifications();
  for (const n of notifications) {
    if (ids.includes(n.id) && !n.readBy.includes(userId)) {
      n.readBy.push(userId);
    }
  }
  writeJSON("notifications.json", notifications);
}

export function notificationsForUser(user: User): Notification[] {
  const branchIds = new Set(user.role === "admin" ? undefined : user.branches);
  return getNotifications().filter((n) => {
    if (n.userId && n.userId !== user.id) return false;
    if (user.role === "admin") return true;
    return branchIds.has(n.branchId);
  });
}
