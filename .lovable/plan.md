## Wenzhou Sanhe Mold — Premium Corporate Site

A single-page dark, luxury industrial site inspired by TRIONN's smoothness, with the uploaded logo as the brand anchor and red (#D40017) as the sole accent.

### Design system (src/styles.css)
- Palette tokens: `--background #0A0A0A`, `--surface #1A1A1A`, `--foreground #F5F5F5`, `--muted-foreground` silver, `--accent #D40017`, `--border` subtle white/10.
- Gradients: metallic silver (`linear-gradient(135deg,#e8e8e8,#8a8a8a,#3a3a3a)`), red glow, radial spotlight for hero.
- Shadows: `--shadow-glow` (red), `--shadow-elevated` (deep black), `--shadow-glass`.
- Glass utility: `bg-white/[0.03] backdrop-blur-xl border border-white/10`.
- Fonts loaded via `<link>` in `__root.tsx`: Space Grotesk (headings) + Inter (body); registered as `--font-display` / `--font-sans` in `@theme`.
- Motion via `motion/react` for fade-up, stagger, and count-up.

### Route & structure
- Keep single home route `src/routes/index.tsx`. Update `__root.tsx` head with real title/description/OG for the company.
- Uploaded logo saved via `lovable-assets` and imported where the logo appears (nav, about background watermark, footer).
- Sections implemented as components in `src/components/site/`:
  - `SiteNav.tsx` — sticky, transparent → blurred glass on scroll, mobile sheet menu, right-side red "Request a Quote" CTA.
  - `Hero.tsx` — full-screen; animated particle canvas + radial spotlight that follows cursor; centerpiece is a CSS/SVG metallic hex mold (matches logo geometry) with slow rotation and mouse-parallax lighting; H1 + subhead + two CTAs.
  - `About.tsx` — big headline "Engineering Excellence. Built on Precision.", intro copy, three pillars (Quality First / Pursue Excellence / Trust & Reliability), faint centered logo watermark.
  - `WhyChooseUs.tsx` — six glass cards, metallic Lucide icons, hover lift + red glow ring.
  - `Services.tsx` — eight service cards with icon, title, short description, subtle 3D tilt on hover.
  - `Stats.tsx` — four counters (50,000+, 30+, 100,000+, 99%) animating on viewport enter via IntersectionObserver.
  - `Gallery.tsx` — masonry (CSS columns) of generated mold/factory images, rounded corners, dark overlay, zoom-on-hover.
  - `Contact.tsx` — glass form (Full Name, Company, Email, Phone, Project Details) + contact info column (email, phone, WeChat) with icons. Form is presentation-only: on submit shows a toast "Thanks — we'll get back to you"; no backend.
  - `Footer.tsx` — logo, tagline "Quality First • Pursue Excellence", nav links, copyright.

### Imagery
- Generate with `imagegen`, save to `src/assets/`:
  - Hero background (dark industrial shop floor, soft rim lighting) — used behind particles.
  - 6–8 gallery images: precision mold close-ups, CNC machining, injection mold halves, die-cast parts, factory interior, QC inspection.
- Uploaded logo → `src/assets/logo.png.asset.json` via `lovable-assets` and imported.

### Animations
- `motion/react` variants: fadeUp (y:24 → 0, opacity), stagger children 0.08s, `whileInView` with `once: true, margin: "-10% 0px"`.
- Count-up hook for stats.
- Nav scroll listener toggles a `scrolled` class → adds blur + border.
- Respect `prefers-reduced-motion`.

### Responsive
- Mobile-first: hero text scales via `clamp()`; nav collapses to sheet; services/why-us grids: 1 → 2 → 3 cols; gallery columns 1 → 2 → 3; stats 2 → 4.
- Follow the responsive header pattern (grid on mobile, flex on `sm:`, `min-w-0`, `truncate`, `shrink-0`) for nav rows.

### SEO / head
- Title: "Wenzhou Sanhe Mold Co., Ltd. — Precision Mold Manufacturing".
- Description: engineered injection, plastic, rubber, die-casting and automotive molds for global industries.
- Matching OG + Twitter tags; leaf `og:image` = hero render URL.

### Out of scope (confirm if desired later)
- Real form submission / email delivery (would require Lovable Cloud).
- Multi-page routing for individual services and gallery detail pages.
- CMS-backed gallery.
