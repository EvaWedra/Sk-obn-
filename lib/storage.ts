import fs from "fs";
import path from "path";

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

export interface Message {
  id: string;
  name: string;
  contact: string;
  topic: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  createdAt: string;
}

export function getMessages(): Message[] {
  return readJSON<Message[]>("messages.json", []);
}

export function addMessage(data: Omit<Message, "id" | "createdAt" | "read">): Message {
  const messages = getMessages();
  const msg: Message = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(msg);
  writeJSON("messages.json", messages);
  return msg;
}

export function markMessageRead(id: string): void {
  const messages = getMessages();
  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) {
    messages[idx].read = true;
    writeJSON("messages.json", messages);
  }
}

export function deleteMessage(id: string): void {
  const messages = getMessages().filter((m) => m.id !== id);
  writeJSON("messages.json", messages);
}

export function getAnnouncements(): Announcement[] {
  return readJSON<Announcement[]>("announcements.json", []);
}

export function addAnnouncement(text: string): Announcement {
  const announcements = getAnnouncements();
  const ann: Announcement = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
  };
  announcements.unshift(ann);
  writeJSON("announcements.json", announcements);
  return ann;
}

export function deleteAnnouncement(id: string): void {
  const announcements = getAnnouncements().filter((a) => a.id !== id);
  writeJSON("announcements.json", announcements);
}
