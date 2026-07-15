import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg.asset.json";
import g2 from "@/assets/gallery-2.jpg.asset.json";
import g3 from "@/assets/gallery-3.jpg.asset.json";
import g4 from "@/assets/gallery-4.jpg.asset.json";
import g5 from "@/assets/gallery-5.jpg.asset.json";
import g6 from "@/assets/gallery-6.jpg.asset.json";
import g7 from "@/assets/gallery-7.jpg.asset.json";
import g8 from "@/assets/gallery-8.jpg.asset.json";

const images = [
  { src: g1.url, alt: "Precision-machined injection mold assemblies", label: "Injection Molds" },
  { src: g2.url, alt: "EDM wire-cutting machine in Sanhe workshop", label: "EDM Machining" },
  { src: g3.url, alt: "Row of finished mold bases ready for assembly", label: "Finished Molds" },
  { src: g4.url, alt: "Two-cavity plastic mold with molded parts", label: "Mold Trial" },
  { src: g5.url, alt: "Dual CNC wire EDM machines in production", label: "Facility" },
  { src: g6.url, alt: "CNC drilling with coolant on mold block", label: "CNC Machining" },
  { src: g7.url, alt: "Copper EDM electrodes on precision machine", label: "Electrodes" },
  { src: g8.url, alt: "JIATIE CNC engraving and milling center", label: "CNC Center" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((v) => (v === null ? v : (v + 1) % images.length)),
    [],
  );
  const prev = useCallback(
    () => setActive((v) => (v === null ? v : (v - 1 + images.length) % images.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, next, prev]);

  return (
    <section id="gallery" className="relative bg-white py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Gallery"
          title={<>Craftsmanship you can <span className="text-accent">see and touch</span>.</>}
          description="A look inside our workshop — precision molds, CNC machining, EDM and quality control."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.05}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className={`group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] ${
                  i === 0 || i === 5 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent p-5 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-primary">0{i + 1}</div>
                  <div className="mt-1 font-display text-base font-semibold text-white">{img.label}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight size={22} />
          </button>
          <figure
            className="relative max-h-[85vh] max-w-6xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[active].src}
              alt={images[active].alt}
              className="max-h-[85vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-slate-300">
              {images[active].label}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
