import { getT } from "@/lib/translations";
import type { Lang } from "@/lib/translations";
import TopBar from "@/components/TopBar";
import GalleryClient from "@/components/GalleryClient";

interface Props {
  params: Promise<{ lang: string }>;
}

const galleryItems = [
  {
    category: "accommodation",
    src: "/photos/izba-1.jpg",
    alt: "Izba / Room",
  },
  {
    category: "accommodation",
    src: "/photos/izba-2.jpg",
    alt: "Izba / Room",
  },
  {
    category: "kitchen",
    src: "/photos/kuchyna-1.jpg",
    alt: "Kuchyňa / Kitchen",
  },
  {
    category: "kitchen",
    src: "/photos/kuchyna-2.jpg",
    alt: "Kuchyňa / Kitchen",
  },
  {
    category: "bathrooms",
    src: "/photos/kupelka-1.jpg",
    alt: "Kúpeľka / Bathroom",
  },
  {
    category: "garden",
    src: "/photos/zahrada-1.jpg",
    alt: "Záhrada / Garden",
  },
  {
    category: "common",
    src: "/photos/spolocne-1.jpg",
    alt: "Spoločné priestory / Common areas",
  },
];

export default async function GalleryPage({ params }: Props) {
  const { lang } = await params;
  const t = getT(lang as Lang);

  return (
    <>
      <TopBar
        title={t.gallery.title}
        lang={lang as Lang}
        otherLang={t.otherLang as Lang}
        otherLangName={t.otherLangName}
      />

      <div className="max-w-md mx-auto px-4 py-6">
        <GalleryClient items={galleryItems} categories={t.gallery.categories} noPhotos={t.gallery.noPhotos} />
      </div>
    </>
  );
}
