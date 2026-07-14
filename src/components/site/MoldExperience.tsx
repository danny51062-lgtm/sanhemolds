import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MousePointer2, ChevronDown } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";

const MoldScene = lazy(() =>
  import("./MoldScene").then((m) => ({ default: m.MoldScene })),
);

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: unknown) { console.error("MoldScene error:", err); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export function MoldExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [scrollRot, setScrollRot] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0.75, 1], [1, 0.25]);

  useEffect(() => setMounted(true), []);

  // Lazy-mount the Canvas only when section approaches viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Track scroll progress → rotation
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // Map full section scroll to -1..1 rotation factor
      setScrollRot((v - 0.5) * 2);
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative isolate overflow-hidden bg-background"
    >
      {/* subtle blend gradient with hero above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-24 lg:px-10 lg:pt-28">
        <SectionHeader
          eyebrow="Interactive Showcase"
          title={
            <>
              Experience <span className="text-metallic">Precision Engineering</span>
            </>
          }
          description="Discover how our precision molds are crafted. Interact with a realistic 3D mold and explore our engineering quality."
          align="center"
        />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto mt-10 h-[70vh] w-full max-w-6xl px-4 sm:h-[75vh] lg:h-[80vh] lg:px-10"
      >
        {/* Ambient red glow */}
        <div className="pointer-events-none absolute inset-x-10 bottom-10 -z-10 h-40 rounded-full bg-primary/20 blur-3xl" />

        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
          {mounted && inView ? (
            <SceneErrorBoundary fallback={<SceneFallback />}>
              <Suspense fallback={<SceneFallback />}>
                <MoldScene
                  scrollProgress={scrollRot}
                  onFirstInteract={() => setInteracted(true)}
                />
              </Suspense>
            </SceneErrorBoundary>
          ) : (
            <SceneFallback />
          )}

          {/* Helper text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: interacted ? 0 : 1, y: interacted ? 10 : 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-muted-foreground"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] backdrop-blur">
              <MousePointer2 size={12} />
              Drag to Explore
            </div>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="opacity-60" />
            </motion.div>
          </motion.div>
        </div>

        <Reveal>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
            Brushed Steel · Studio Lighting · Real-Time
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-16 animate-pulse rounded-full border border-white/10 bg-white/5" />
    </div>
  );
}
