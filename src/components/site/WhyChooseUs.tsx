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
    <section id="why" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Why Choose Us"
          title={<>Built for the demands of <span className="text-metallic">modern manufacturing</span>.</>}
          description="Six reasons why leading OEMs trust Sanhe with their most critical tooling programs."
        />

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_50px_-10px_rgba(212,0,23,0.5)]">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />
                <div className="relative">
                  <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-transparent ring-1 ring-white/10">
                    <it.icon size={22} strokeWidth={1.5} className="text-silver transition-colors group-hover:text-primary" />
                  </div>
                  <div className="mb-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
