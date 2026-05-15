"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  category: string;
  src: string;
  alt: string;
}

interface Categories {
  all: string;
  accommodation: string;
  kitchen: string;
  bathrooms: string;
  garden: string;
  common: string;
}

interface Props {
  items: GalleryItem[];
  categories: Categories;
  noPhotos: string;
}

export default function GalleryClient({ items, categories, noPhotos }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const catKeys = Object.keys(categories) as Array<keyof typeof categories>;

  const filtered =
    activeCategory === "all"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div>
      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
        {catKeys.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-forest-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-forest-300"
            }`}
          >
            {categories[cat]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">📷</div>
          <p className="text-sm">{noPhotos}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {filtered.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setLightboxSrc(item.src)}
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity active:scale-95"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add("flex", "items-center", "justify-center");
                    parent.innerHTML = '<span class="text-3xl">🖼️</span>';
                  }
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-light"
            onClick={() => setLightboxSrc(null)}
          >
            ×
          </button>
          <div className="relative w-full max-w-sm aspect-square">
            <Image
              src={lightboxSrc}
              alt="Gallery photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
