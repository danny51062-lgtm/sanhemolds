import { Reveal, SectionHeader } from "./Reveal";
import { Target, Award, Truck, Users, Wrench, Globe } from "lucide-react";

const items = [
  { icon: Target, title: "Precision Engineering", text: "Sub-micron tolerances backed by CMM inspection and full traceability." },
  { icon: Award, title: "Premium Quality", text: "Hardened tool steels, mirror polish, and rigorous multi-stage QC." },
  { icon: Truck, title: "Fast Delivery", text: "Streamlined production planning delivers projects on time, every time." },
  { icon: Users, title: "Experienced Team", text: "Seasoned mold designers, machinists and toolmakers with decades of craft." },
  { icon: Wrench, title: "Custom Mold Solutions", text: "From single-cavity prototypes to complex multi-cavity production tooling." },
  { icon: Globe, title: "Global Customer Support", text: "Direct English-speaking engineers serving clients across 30+ countries." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="section-light relative py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={<>Built for the demands of <span className="text-accent">modern manufacturing</span>.</>}
          description="Six reasons why leading OEMs trust Sanhe with their most critical tooling programs."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06}>
              <div className="group h-full rounded-2xl border border-border bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(15,23,42,0.2)]">
                <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl bg-navy/5 text-navy ring-1 ring-navy/10 transition-colors group-hover:bg-primary/5 group-hover:text-primary">
                  <it.icon size={24} strokeWidth={1.6} />
                </div>
                <div className="mb-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
