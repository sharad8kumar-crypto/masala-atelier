"use client";

import { SafeImage as Image } from "@/components/ui/SafeImage";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/data/gallery";
import { ScriptHeading } from "@/components/ui/ScriptHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const total = gallery.length;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  function go(delta: number) {
    setIndex((i) => (i === null ? i : (i + delta + total) % total));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  }

  const current = index !== null ? gallery[index] : null;

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
      aria-labelledby="gallery-heading"
    >
      <ScriptHeading
        script="Gallery"
        title="A Look Inside"
        id="gallery-heading"
      />

      <ul className="mt-10 columns-2 gap-4 md:columns-3">
        {gallery.map((item, i) => (
          <li key={item.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              aria-label={`View photo: ${item.alt}`}
              className={`group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface ${item.aspect}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={ref}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        aria-label="Photo viewer"
        className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-black/90"
      >
        {current && (
          <div
            className="relative flex h-full w-full items-center justify-center px-4 py-16"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIndex(null);
            }}
          >
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90"
            >
              <ChevronRight size={22} />
            </button>
            <p
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80"
              aria-live="polite"
            >
              {(index ?? 0) + 1} / {total}
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}