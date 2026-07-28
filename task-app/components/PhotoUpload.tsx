"use client";

import { useRef } from "react";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB per photo, base64-encoded in JSON storage

export default function PhotoUpload({
  photos,
  onChange,
}: {
  photos: string[];
  onChange: (photos: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > MAX_BYTES) {
        alert(`Fotka "${file.name}" je príliš veľká (max 2MB).`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange([...photos, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    if (inputRef.current) inputRef.current.value = "";
  }

  function removePhoto(idx: number) {
    onChange(photos.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {photos.map((src, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div key={idx} className="relative w-16 h-16">
            <img src={src} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600" />
            <button
              type="button"
              onClick={() => removePhoto(idx)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center"
              aria-label="Odstrániť fotku"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center text-2xl"
          aria-label="Pridať fotku"
        >
          +
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
