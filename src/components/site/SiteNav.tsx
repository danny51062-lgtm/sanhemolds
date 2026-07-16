import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/sanhe-logo.png";

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
          ? "border-b border-border bg-white/90 backdrop-blur-xl"
          : "border-b border-transparent bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 sm:flex sm:justify-between lg:px-10">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logoAsset}
            alt="Wenzhou Sanhe Mold"
            className="h-10 w-10 shrink-0 object-contain"
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
              className="group relative text-sm font-medium text-steel transition-colors hover:text-primary"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-flex"
          >
            Request a Quote
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-steel transition-colors hover:bg-surface hover:text-primary"
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
