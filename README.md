# NetaProfile

**Track every Indian politician's complete political journey — party switches, career history, and public statements, all sourced and timestamped.**

**Status:** 🟢 Active (early stage)

## What it is

NetaProfile is a political-transparency platform that documents the full career history of Indian politicians in one place: every party they've belonged to, every position they've held, and — the core feature — a **side-by-side comparison of what they said before vs. after switching parties**.

It's built to be independent and non-partisan. Every data point cites its source (Wikipedia, MyNeta, PRS Legislative Research, the Election Commission, and verified news outlets) and carries an explicit confidence level (high / medium / low).

## Why I built it

Indian politics moves fast — MPs switch parties, change positions, and contradict their own earlier statements, often within months. That record is normally scattered across news archives and hard to reconstruct. NetaProfile is an attempt at a single, permanent, sourced record of who stood for what, and when.

## Features

- **Political timeline** — every party stint and position over a politician's career, color-coded by party.
- **Statement comparison** — before/after-switch quotes placed side by side, each with source link, date, and confidence level.
- **Rich profiles** — education, pre-politics career, committees, social media, and external reference links.
- **Search & filter** — fuzzy search (fuse.js) across all profiles, filterable by party and state.
- **Static-first** — profiles are statically generated for speed.
- **File-per-politician data model** — adding a politician is just dropping one JSON file into `data/politicians/`; no code changes needed.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- `lucide-react` (icons), `fuse.js` (search), `date-fns`
- Google Analytics via `@next/third-parties` (optional)

## Getting started

```bash
# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in values. All current variables are optional — the app runs without them.

```bash
cp .env.example .env.local
```

## Adding a politician

1. Create `data/politicians/<slug>.json` following the shape of an existing file (the `Politician` type in `lib/politicians.ts` is the source of truth).
2. Optionally run the photo fetcher to pull a headshot from Wikipedia:
   ```bash
   node scripts/fetch-photos.mjs
   ```
3. That's it — the file is picked up automatically.

## Project structure

```
app/                       Next.js App Router pages (home, /politicians, /politician/[slug], /about, /roadmap)
components/                UI components (Timeline, StatementComparison, cards, search, etc.)
lib/                       Data loading (politicians.ts), party config (parties.ts), utils
data/politicians/          One JSON file per politician
data/platform.json         Platform-wide metadata (e.g. "coming next" queue)
public/politicians/        Politician photos
scripts/fetch-photos.mjs   One-time Wikipedia photo downloader
```

## Known limitations

- Small dataset so far (a few dozen high-profile MPs); the roadmap is to expand to all Lok Sabha, then Rajya Sabha, then state MLAs.
- Data is entered and maintained manually — accuracy depends on the cited sources.
- No backend or database; all data is static JSON committed to the repo.
- No automated tests yet.

## Contributing

Corrections, source improvements, and new politician profiles are welcome. Open an issue or a PR.

## License

MIT — see [LICENSE](./LICENSE).
