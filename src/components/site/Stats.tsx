import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stats = [
  { value: 50000, suffix: "+", label: "Satisfied Industries" },
  { value: 30, suffix: "+", label: "Countries Served" },
  { value: 100000, suffix: "+", label: "Precision Molds Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return n;
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <div>
      <div className="font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-tight text-foreground">
        {n.toLocaleString()}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface via-surface-2/60 to-surface p-10 sm:p-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "radial-gradient(700px circle at 50% 0%, rgba(212,0,23,0.15), transparent 60%)" }}
            />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

            <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((s) => (
                <StatItem key={s.label} {...s} active={active} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
