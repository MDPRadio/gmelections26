# Gaumee Majlis 2026

Public website for MDP's nationwide Gaumee Majlis internal election. Fully Dhivehi (RTL), voter lookup by ID card, seat allocation by atoll and island, candidate profiles, scroll animations.

Stack: Next.js 14 (App Router), TypeScript, Tailwind 3, GSAP ScrollTrigger, Shaders (hero background).

## Run it

```bash
rm -rf node_modules .next   # first time only, see note below
npm install
cp .env.example .env.local  # fill in the values
npm run dev
```

Without `MDP_API_KEY` the site still runs: atoll names show with empty seat counts, candidates show placeholder cards, and the voter lookup answers "service unavailable".

> `node_modules` and `.next` in this folder were created on a Linux machine while the project was scaffolded. Delete them and run `npm install` on your Mac.

## Where things live

| Path | What |
| --- | --- |
| `lib/copy.ts` | Every Dhivehi string, in one file for proofreading |
| `lib/mdp-api.ts` | MDP API adapter. Server only, ISR 5 min. **Endpoint paths and response mappers are assumptions**, replace with the real ones |
| `app/api/voter/route.ts` | Voter lookup proxy: validates the ID, keeps the API key server-side, no-store, rate limited per instance |
| `components/ScrollEffects.tsx` | All GSAP ScrollTrigger animation, driven by `data-*` attributes |
| `components/HeroBackdrop.tsx`, `ShaderLayer.tsx` | CSS gradient fallback + Shaders `MeshGradient` on WebGPU devices |
| `components/SeatSpine.tsx` | North-to-south seat spine with expandable atolls |
| `tailwind.config.ts` | Palette (yellow 60 / black 20 / white 10 / blue 5 / grey 5) and font stacks |

## Still needed

- Real yellow and blue hex values (`tailwind.config.ts`)
- `DemocratsAkuru.woff2` and `Baabu.woff2` in `public/fonts/` (falls back to Noto Sans Thaana)
- API docs or sample JSON for dhaairaa, candidates, voter lookup, then update `PATHS` and the `map*` functions in `lib/mdp-api.ts`
- `NEXT_PUBLIC_ELECTION_DATE` (ISO with `+05:00`) for the countdown
- Native proofread of `lib/copy.ts`
- Timeline dates and final stage names

## Push to GitHub later

```bash
git remote add origin git@github.com:<org>/<repo>.git
git push -u origin main
```

Deploy on Vercel with the env vars from `.env.example`. For a shared voter-lookup rate limit across instances, swap the in-memory limiter in `app/api/voter/route.ts` for Upstash/Vercel KV.
