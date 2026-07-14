import { Reveal, SectionHeader } from "./Reveal";
import { ShieldCheck, Sparkles, HandshakeIcon } from "lucide-react";
import logoAsset from "@/assets/sanhe-logo.png.asset.json";

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
    <section id="about" className="relative overflow-hidden py-32">
      {/* Subtle logo watermark */}
      <img
        src={logoAsset.url}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 hidden w-[720px] -translate-y-1/2 opacity-[0.04] lg:block"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(800px circle at 20% 30%, rgba(212,0,23,0.08), transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              Engineering Excellence.
              <br />
              Built on <span className="text-metallic">Precision.</span>
            </>
          }
          description="Wenzhou Sanhe Mold Co., Ltd. designs and manufactures precision molds for the world's most demanding industries. From concept and DFM through machining, trial and mass production, our team delivers molds that hold tolerances, run reliably, and last."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="glass group h-full rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-white/10 to-white/5 text-silver ring-1 ring-white/10 transition-colors group-hover:text-primary">
                  <p.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
