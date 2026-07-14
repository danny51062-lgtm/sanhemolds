import { Reveal, SectionHeader } from "./Reveal";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

const images = [
  { src: g1, alt: "Polished injection mold cavity", label: "Injection Mold" },
  { src: g2, alt: "CNC machining a mold block", label: "CNC Machining" },
  { src: g3, alt: "Two halves of an open mold", label: "Mold Assembly" },
  { src: g4, alt: "Die-cast automotive part", label: "Die-Casting" },
  { src: g5, alt: "Manufacturing facility interior", label: "Facility" },
  { src: g6, alt: "Quality control inspection", label: "Inspection" },
  { src: g7, alt: "Rubber mold detail", label: "Rubber Mold" },
  { src: g8, alt: "Robotic arm with molded part", label: "Automation" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Gallery"
          title={<>Craftsmanship you can <span className="text-metallic">see and touch.</span></>}
          description="A look inside our workshop — precision molds, machining, and quality control."
        />

        <div className="mt-20 columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.06}>
              <figure className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-surface">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-xs uppercase tracking-[0.2em]">
                  <span className="text-foreground">{img.label}</span>
                  <span className="text-primary">0{i + 1}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
