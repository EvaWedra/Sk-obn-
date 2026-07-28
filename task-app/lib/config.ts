import type { Branch, Section } from "./types";

export const appConfig = {
  appName: "Tímové Úlohy",
  companyName: "Demo Firma",
  tagline: "Jedno miesto pre úlohy, zadania a notifikácie tímu",
  primaryColor: "#4DBBA8",
  secondaryColor: "#F5A623",
  language: "sk",
  adminEmail: "admin@demofirma.sk",
};

export const branches: Branch[] = [
  { id: "ba", name: "Bratislava" },
  { id: "ke", name: "Košice" },
];

export const sections: Section[] = [
  { id: "weekly", label: "Čo treba spraviť tento týždeň", icon: "📅", adminOnly: true },
  { id: "buy", label: "Čo treba kúpiť", icon: "🛒", adminOnly: false },
  { id: "fix", label: "Čo treba opraviť", icon: "🔧", adminOnly: false },
  { id: "do", label: "Čo treba urobiť", icon: "✅", adminOnly: false },
  { id: "notes", label: "Poznámky", icon: "📝", adminOnly: false },
];

export const priorityOrder = ["nizka", "normalna", "dolezita", "urgentna"] as const;

export const priorityLabels: Record<string, string> = {
  nizka: "Nízka",
  normalna: "Normálna",
  dolezita: "Dôležitá",
  urgentna: "Urgentná",
};

export const statusOrder = ["nove", "riesi_sa", "hotove"] as const;

export const statusLabels: Record<string, string> = {
  nove: "Nové",
  riesi_sa: "Rieši sa",
  hotove: "Hotové",
};

export const recurrenceLabels: Record<string, string> = {
  none: "Bez opakovania",
  daily: "Denne",
  weekly: "Týždenne",
  monthly: "Mesačne",
};

export const defaultTags = ["kancelária", "nákup", "oprava", "dokumenty", "klienti"];

export function getSection(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}

export function getBranch(id: string): Branch | undefined {
  return branches.find((b) => b.id === id);
}
