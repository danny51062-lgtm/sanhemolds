import { Reveal } from "./Reveal";
import { ShieldCheck, Sparkles, HandshakeIcon } from "lucide-react";
import factoryAbout from "@/assets/factory-about.jpg.asset.json";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    text: "ISO-grade inspection at every stage — from steel selection to final polishing.",
  },
  {
    icon: Sparkles,
    title: "Pursue Excellence",
    text: "Engineered to sub-micron tolerances with modern CNC, EDM and CMM equipment.",
  },
  {
    icon: HandshakeIcon,
    title: "Trust & Reliability",
    text: "Two decades of long-term partnerships with OEMs across three continents.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-white py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left — copy */}
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" />
                About Sanhe
              </div>
              <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-navy">
                Engineering Excellence.<br />
                Built on <span className="text-accent">Precision.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-steel sm:text-lg">
                Wenzhou Sanhe Mold Co., Ltd. designs and manufactures precision molds for the
                world's most demanding industries. From concept and DFM through machining, trial
                and mass production, our team delivers molds that hold tolerances, run reliably,
                and last.
              </p>

              <div className="mt-10 grid gap-4">
                {pillars.map((p) => (
                  <div key={p.title} className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-surface text-primary ring-1 ring-border">
                      <p.icon size={20} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-navy">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — factory image */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]">
                <img
                  src={factoryAbout.url}
                  alt="Sanhe Mold precision manufacturing workshop"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-white p-5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)] sm:block">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Established</div>
                <div className="mt-1 font-display text-3xl font-semibold text-navy">1998</div>
                <div className="mt-1 text-xs text-steel">Wenzhou, Zhejiang · China</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
