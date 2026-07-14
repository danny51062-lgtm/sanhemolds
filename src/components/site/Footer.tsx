import logoAsset from "@/assets/sanhe-logo.png.asset.json";

const links = [
  { href: "#about", label: "About" },
  { href: "#why", label: "Why Choose Us" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Sanhe Mold" className="h-12 w-12 object-contain" />
              <div>
                <div className="font-display text-lg font-semibold text-foreground">SANHE MOLD</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Quality First · Pursue Excellence
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Wenzhou Sanhe Mold Co., Ltd. — precision mold manufacturing for injection, plastic,
              rubber, die-casting, automotive and appliance industries worldwide.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Explore</div>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact</div>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li>
                <a href="mailto:wenzhousanhemolds@gmail.com" className="hover:text-primary">
                  wenzhousanhemolds@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8613625774243" className="hover:text-primary">
                  +86 136 2577 4243
                </a>
              </li>
              <li className="text-muted-foreground">WeChat · wxid_2la3g5ov9c8b22</li>
              <li className="text-muted-foreground">Wenzhou, Zhejiang, China</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Wenzhou Sanhe Mold Co., Ltd. All rights reserved.</div>
          <div className="tracking-[0.25em] uppercase">Precision · Trust · Innovation</div>
        </div>
      </div>
    </footer>
  );
}
