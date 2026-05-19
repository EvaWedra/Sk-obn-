import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

const IDEAS_FILE = join(process.cwd(), "data", "ideas.json");

function readIdeas() {
  try {
    return JSON.parse(readFileSync(IDEAS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  const { text, context } = await req.json();

  if (!text?.trim()) {
    return NextResponse.json({ error: "Prázdny text" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `Si hodnotiteľ biznis nápadov pre malú firmu pôsobiacu v oblasti ubytovania, kurzov, poradenstva a osobného rozvoja.

${context ? `Kontext firmy: ${context}\n\n` : ""}Majiteľ nahrával hlasovú poznámku s napadom a text prepisu je:
"${text}"

Vyhodnoť tento nápad podľa nasledujúcich kritérií a odpovedz VÝHRADNE v JSON formáte (žiadny iný text):

{
  "relevant": true/false,
  "score": číslo 1-10,
  "category": jedna z: "ubytovanie" | "kurzy" | "marketing" | "operativa" | "financie" | "iné",
  "priority": "vysoká" | "stredná" | "nízka" | "žiadna",
  "summary": "Jedno veta zhrnutie nápadu",
  "evaluation": "2-3 vety hodnotenie: prečo je relevantný/nerelevantný, čo prináša firme",
  "action": "Konkrétny ďalší krok ak je nápad relevantný, inak null"
}

Kritériá relevantnosti:
- Relevantný (score 6-10): priamo zlepšuje biznis, zákaznícku skúsenosť, procesy, kurzy alebo príjmy
- Stredne relevantný (score 3-5): má potenciál ale potrebuje prepracovanie
- Nerelevantný (score 1-2): nesúvisí s firmou, príliš vágne alebo nerealistické`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Neplatná odpoveď od AI");

    const evaluation = JSON.parse(jsonMatch[0]);

    const idea = {
      id: randomUUID(),
      text,
      timestamp: new Date().toISOString(),
      evaluation,
    };

    const ideas = readIdeas();
    ideas.unshift(idea);
    writeFileSync(IDEAS_FILE, JSON.stringify(ideas, null, 2));

    return NextResponse.json(idea);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chyba pri vyhodnocovaní" }, { status: 500 });
  }
}
