import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logoAsset from "@/assets/sanhe-logo.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setPos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const tiltX = (pos.y - 0.5) * -12;
  const tiltY = (pos.x - 0.5) * 12;

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark grade */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x * 100}% ${pos.y * 100}%, rgba(212,0,23,0.18), transparent 60%)`,
        }}
      />
      {/* Grid lines */}
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      {/* Particles */}
      <Particles />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(212,0,23,0.9)]" />
            Precision Mold Manufacturing
          </div>
          <h1 className="text-balance font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight text-foreground">
            Precision Mold Manufacturing
            <br />
            for{" "}
            <span className="text-metallic">Global Industries</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Delivering high-quality injection, plastic, rubber, and die-casting molds engineered
            for precision, durability, and performance.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-8px_rgba(212,0,23,0.7)] transition-all hover:shadow-[0_0_60px_-4px_rgba(212,0,23,0.9)]"
            >
              <span className="relative z-10">Request a Quote</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-white/[0.06]"
            >
              <Play size={14} />
              Explore Services
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
            {[
              ["27+", "Years"],
              ["30+", "Countries"],
              ["100K+", "Molds"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{n}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metallic centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-lg [perspective:1200px]"
        >
          <div
            className="relative h-full w-full transition-transform duration-300 [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-6 rounded-full border border-primary/40 shadow-[inset_0_0_60px_rgba(212,0,23,0.15)]" />

            {/* Rotating glow */}
            <div
              className="absolute inset-0 rounded-full opacity-70 [animation:spin_18s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(212,0,23,0.5) 60deg, transparent 120deg, transparent 240deg, rgba(255,255,255,0.15) 300deg, transparent 360deg)",
                mask: "radial-gradient(circle, transparent 55%, black 56%, black 62%, transparent 63%)",
                WebkitMask: "radial-gradient(circle, transparent 55%, black 56%, black 62%, transparent 63%)",
              }}
            />

            {/* Metallic hex/logo centerpiece */}
            <div className="absolute inset-16 grid place-items-center rounded-full bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm">
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
              <img
                src={logoAsset.url}
                alt=""
                className="relative h-[70%] w-[70%] object-contain [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.6))_drop-shadow(0_0_20px_rgba(212,0,23,0.3))] [animation:spin_40s_linear_infinite]"
              />
            </div>

            {/* Orbit dots */}
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <div
                key={a}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50"
                style={{
                  transform: `rotate(${a}deg) translateY(-49%) rotate(-${a}deg)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Scroll
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {dots.map((i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 1 + (i % 3);
        const delay = (i % 10) * 0.6;
        const dur = 8 + (i % 6);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animation: `floatY ${dur}s ease-in-out ${delay}s infinite alternate`,
              opacity: 0.15 + (i % 5) * 0.1,
            }}
          />
        );
      })}
      <style>{`
        @keyframes floatY {
          from { transform: translateY(0); }
          to { transform: translateY(-40px); }
        }
      `}</style>
    </div>
  );
}
