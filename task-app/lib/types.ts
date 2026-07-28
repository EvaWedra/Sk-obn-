export type Role = "admin" | "employee";

export interface Branch {
  id: string;
  name: string;
}

export interface Section {
  id: string;
  label: string;
  icon: string;
  adminOnly: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branches: string[];
  color: string;
}

export type Priority = "nizka" | "normalna" | "dolezita" | "urgentna";
export type Status = "nove" | "riesi_sa" | "hotove";
export type Recurrence = "none" | "daily" | "weekly" | "monthly";

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  sectionId: string;
  branchId: string;
  title: string;
  description: string;
  priority: Priority;
  tags: string[];
  assigneeId: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  recurrence: Recurrence;
  photos: string[];
  comments: Comment[];
}

export type NotificationType =
  | "new_task"
  | "assigned"
  | "comment"
  | "completed"
  | "status_changed"
  | "priority_changed";

export interface Notification {
  id: string;
  branchId: string;
  userId: string | null;
  type: NotificationType;
  taskId: string | null;
  message: string;
  createdAt: string;
  readBy: string[];
}
