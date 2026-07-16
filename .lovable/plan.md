## Problem

Images in your GitHub repo appear "removed" because they were never committed as binaries. The repo only contains tiny `.asset.json` pointer files (e.g. `src/assets/gallery-1.jpg.asset.json`) whose URLs (`/__l5e/assets-v1/...`) only resolve on Lovable's hosting. Anywhere else — local dev, Vercel, Netlify — those URLs 404.

## Fix

Download every CDN-hosted asset back into the repo as a real file and rewire imports to use the file directly.

### Files to migrate (11 total)

- `src/assets/factory-hero.jpg`
- `src/assets/factory-about.jpg`
- `src/assets/gallery-1.jpg` … `src/assets/gallery-8.jpg`
- `src/assets/sanhe-logo.png`

### Steps

1. For each `*.asset.json`, download the binary from its CDN `url` field and save it as a real file at the corresponding path (`src/assets/gallery-1.jpg`, etc.).
2. Update all imports across the codebase to point at the real files instead of the `.asset.json` pointers:
   - `src/components/site/Hero.tsx` — `factory-hero.jpg`
   - `src/components/site/About.tsx` — `factory-about.jpg`
   - `src/components/site/Gallery.tsx` — `gallery-1..8.jpg`
   - Any component using `sanhe-logo.png` (SiteNav / Footer)
   - `src/routes/index.tsx` — hero preload link
   - Search the codebase for any other `.asset.json` references and rewrite them.
3. Rewrite pattern:
   ```ts
   // before
   import g1 from "@/assets/gallery-1.jpg.asset.json";
   <img src={g1.url} />

   // after
   import g1 from "@/assets/gallery-1.jpg";
   <img src={g1} />
   ```
4. Delete all 11 `.asset.json` pointer files.
5. Run `bun run build` to verify every import resolves and the site renders.

### Result

- Repo grows by ~3.3 MB (sum of the current CDN file sizes; the logo alone is 1.5 MB and could optionally be re-exported smaller later).
- Images are now committed to Git and work on any host — Lovable, Vercel, Netlify, self-hosted, cloned locally.
- No visual or layout change to the site.

### Note

Once migrated, new images you add via chat will still come in as `.asset.json` pointers by default. If you want to stay fully self-contained, tell me and I'll commit any new images as real files going forward.
