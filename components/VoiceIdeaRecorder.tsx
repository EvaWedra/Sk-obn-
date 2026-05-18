"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Evaluation {
  relevant: boolean;
  score: number;
  category: string;
  priority: string;
  summary: string;
  evaluation: string;
  action: string | null;
}

interface Idea {
  id: string;
  text: string;
  timestamp: string;
  evaluation: Evaluation;
}

const PRIORITY_COLOR: Record<string, string> = {
  "vysoká": "bg-red-100 text-red-700",
  "stredná": "bg-yellow-100 text-yellow-700",
  "nízka": "bg-blue-100 text-blue-700",
  "žiadna": "bg-gray-100 text-gray-500",
};

const CATEGORY_ICON: Record<string, string> = {
  ubytovanie: "🏠",
  kurzy: "📚",
  marketing: "📣",
  operativa: "⚙️",
  financie: "💰",
  iné: "💡",
};

interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor;
    webkitSpeechRecognition: ISpeechRecognitionConstructor;
  }
}

export default function VoiceIdeaRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);
  const [context, setContext] = useState("");

  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");
  const isRecordingRef = useRef(false);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = "sk-SK";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      let finalChunk = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalChunk += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (finalChunk) {
        finalTranscriptRef.current += " " + finalChunk;
        setTranscript(finalTranscriptRef.current.trim());
      }
      setInterimText(interim);
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        setError("Chyba mikrofónu: " + event.error);
        isRecordingRef.current = false;
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      if (isRecordingRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognitionRef.current = recognition;
  }, []);

  useEffect(() => {
    fetch("/api/ideas")
      .then((r) => r.json())
      .then(setIdeas)
      .catch(() => {})
      .finally(() => setLoadingIdeas(false));
  }, []);

  const startRecording = useCallback(() => {
    if (!recognitionRef.current) return;
    setError("");
    isRecordingRef.current = true;
    setIsRecording(true);
    try {
      recognitionRef.current.start();
    } catch {}
  }, []);

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    setInterimText("");
    try {
      recognitionRef.current?.stop();
    } catch {}
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearTranscript = () => {
    finalTranscriptRef.current = "";
    setTranscript("");
    setInterimText("");
    setError("");
  };

  const evaluate = async () => {
    const text = transcript.trim();
    if (!text) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ideas/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, context }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setIdeas((prev) => [data, ...prev]);
      clearTranscript();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chyba");
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async (id: string) => {
    await fetch("/api/ideas", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setIdeas((prev) => prev.filter((i) => i.id !== id));
  };

  const scoreColor = (score: number) => {
    if (score >= 7) return "text-green-600";
    if (score >= 4) return "text-yellow-600";
    return "text-red-500";
  };

  if (!supported) {
    return (
      <div className="p-4 bg-red-50 rounded-xl text-red-700 text-sm text-center space-y-2">
        <p className="font-semibold">Prehliadač nepodporuje rozpoznávanie reči.</p>
        <p>Použite Chrome alebo Safari na Android/iOS.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Context */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Kontext firmy <span className="text-gray-400">(voliteľné)</span>
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Napr: Máme ubytovanie v horách, vedieme online kurzy angličtiny, organizujeme retreaty..."
          rows={2}
          className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-700/20 bg-white"
        />
      </div>

      {/* Transcript display */}
      <div className="relative min-h-[88px] bg-white border border-gray-200 rounded-xl p-4 text-sm">
        {transcript || interimText ? (
          <>
            <span className="text-gray-800">{transcript}</span>
            {interimText && <span className="text-gray-400 italic"> {interimText}</span>}
            {!isRecording && (
              <button
                onClick={clearTranscript}
                className="absolute top-2 right-3 text-gray-300 hover:text-gray-500 text-base leading-none"
                aria-label="Vymazať"
              >
                ×
              </button>
            )}
          </>
        ) : (
          <span className="text-gray-400 select-none">
            {isRecording ? "Počúvam… hovorte" : "Stlačte tlačidlo a začnite hovoriť"}
          </span>
        )}
      </div>

      {/* Record button */}
      <div className="flex flex-col items-center gap-3 py-2">
        <button
          onClick={toggleRecording}
          className={`w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 select-none ${
            isRecording
              ? "ring-4 ring-red-300 bg-red-500"
              : "bg-[#2d6a5f] hover:bg-[#255c52]"
          }`}
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </button>
        <p className="text-xs text-gray-500">
          {isRecording ? (
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Nahráva sa — klepnite pre zastavenie
            </span>
          ) : (
            "Klepnite pre spustenie nahrávania"
          )}
        </p>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Evaluate */}
      {transcript && !isRecording && (
        <button
          onClick={evaluate}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all disabled:opacity-60 bg-[#2d6a5f] hover:bg-[#255c52] flex items-center justify-center gap-2"
        >
          {loading ? (
            <><SpinIcon /> Vyhodnocujem nápad…</>
          ) : (
            <>💡 Vyhodnotiť nápad</>
          )}
        </button>
      )}

      {/* Ideas list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-600">
            Archív nápadov
          </h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {ideas.length}
          </span>
        </div>

        {loadingIdeas ? (
          <div className="text-center text-gray-400 text-sm py-6">Načítavam…</div>
        ) : ideas.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-6">
            Zatiaľ žiadne nápady.<br />
            <span className="text-xs">Nahrajte prvý hlasom.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {ideas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onDelete={deleteIdea}
                scoreColor={scoreColor}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IdeaCard({
  idea,
  onDelete,
  scoreColor,
}: {
  idea: Idea;
  onDelete: (id: string) => void;
  scoreColor: (n: number) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const ev = idea.evaluation;

  return (
    <div
      className={`rounded-xl border p-4 bg-white transition-all ${
        ev.relevant ? "border-green-200" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base">{CATEGORY_ICON[ev.category] ?? "💡"}</span>
          <span className={`text-sm font-bold ${scoreColor(ev.score)}`}>
            {ev.score}/10
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              PRIORITY_COLOR[ev.priority] ?? "bg-gray-100 text-gray-500"
            }`}
          >
            {ev.priority}
          </span>
          {ev.relevant ? (
            <span className="text-xs text-green-600 font-medium">✓ Relevantný</span>
          ) : (
            <span className="text-xs text-gray-400">✗ Nerelevantný</span>
          )}
        </div>
        <button
          onClick={() => onDelete(idea.id)}
          className="text-gray-300 hover:text-red-400 text-lg leading-none shrink-0 mt-0.5"
          aria-label="Zmazať"
        >
          ×
        </button>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-800 leading-snug">
        {ev.summary}
      </p>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-xs text-gray-400 underline underline-offset-2"
      >
        {expanded ? "Skryť detail" : "Zobraziť detail"}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
          <p className="italic text-gray-400 leading-relaxed">"{idea.text}"</p>
          <p className="leading-relaxed">{ev.evaluation}</p>
          {ev.action && (
            <div className="bg-green-50 text-green-800 rounded-lg px-3 py-2 leading-relaxed">
              <strong>Ďalší krok:</strong> {ev.action}
            </div>
          )}
          <p className="text-gray-400">
            {new Date(idea.timestamp).toLocaleString("sk-SK")}
          </p>
        </div>
      )}
    </div>
  );
}

function MicIcon() {
  return (
    <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
