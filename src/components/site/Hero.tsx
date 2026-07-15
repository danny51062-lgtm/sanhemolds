import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import factoryHero from "@/assets/factory-hero.jpg.asset.json";

export function Hero() {
  return (
    <section
      id="home"
      className="section-dark relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Factory image, softly blurred */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: `url(${factoryHero.url})`,
          filter: "blur(2px)",
          transform: "scale(1.05)",
          opacity: 0.35,
        }}
      />
      {/* Navy grade */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#0F172A]/85 via-[#0F172A]/80 to-[#0F172A]" />
      {/* Subtle engineering grid */}
      <div className="grid-lines-dark pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Precision Mold Manufacturing · Since 1998
          </div>
          <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-white">
            Precision Mold Manufacturing
            <br />
            for <span className="text-primary">Global Industries</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Wenzhou Sanhe Mold Co., Ltd. engineers injection, plastic, rubber, die-casting,
            and automotive molds to exacting tolerances — trusted by OEMs across 30+ countries.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a Quote
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["27+", "Years of Experience"],
              ["30+", "Countries Served"],
              ["100K+", "Molds Delivered"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold text-white sm:text-3xl">{n}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#experience"
        className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] uppercase tracking-[0.3em] text-slate-400 transition-colors hover:text-white"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
