import { Reveal, SectionHeader } from "./Reveal";
import {
  Boxes,
  Layers,
  Circle,
  Flame,
  Car,
  Bike,
  Plug,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: Boxes, title: "Injection Molds", text: "High-precision thermoplastic injection molds for consumer and industrial products." },
  { icon: Layers, title: "Plastic Molds", text: "Multi-cavity, family and stack molds for large-volume plastic parts." },
  { icon: Circle, title: "Rubber Molds", text: "Compression and transfer rubber molds for seals, gaskets and elastomer parts." },
  { icon: Flame, title: "Die-Casting Molds", text: "Aluminum and zinc die-casting tooling with exceptional thermal life." },
  { icon: Car, title: "Automotive Molds", text: "Under-hood, interior and structural molds meeting automotive PPAP standards." },
  { icon: Bike, title: "Motorcycle Molds", text: "Housings, panels and functional components for two-wheeler manufacturers." },
  { icon: Plug, title: "Electrical Appliance Molds", text: "Complex enclosures and thin-wall parts for white goods and small appliances." },
  { icon: KeyRound, title: "Lock & Commodity Molds", text: "Precision lock components and everyday commodity tooling at scale." },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Services"
          title={<>End-to-end mold solutions, from <span className="text-accent">concept to production</span>.</>}
          description="Eight specialized capabilities under one roof, engineered for reliability and long tool life."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.05}>
              <a
                href="#contact"
                className="group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)]"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-surface text-steel ring-1 ring-border transition-colors group-hover:bg-primary/5 group-hover:text-primary">
                    <s.icon size={22} strokeWidth={1.6} />
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <div className="mt-6 border-t border-border pt-4 text-[11px] uppercase tracking-[0.2em] text-primary">
                  Request Quote
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
