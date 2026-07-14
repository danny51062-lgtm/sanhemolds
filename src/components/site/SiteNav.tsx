import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/sanhe-logo.png.asset.json";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Choose Us" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:flex sm:justify-between lg:px-10">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Wenzhou Sanhe Mold"
            className="h-10 w-10 shrink-0 object-contain drop-shadow-[0_0_12px_rgba(212,0,23,0.35)]"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-sm font-semibold tracking-wide text-foreground">
              SANHE MOLD
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Precision Since 1998
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group relative hidden overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-8px_rgba(212,0,23,0.6)] transition-all hover:shadow-[0_0_40px_-4px_rgba(212,0,23,0.8)] sm:inline-flex"
          >
            <span className="relative z-10">Request a Quote</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Request a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
