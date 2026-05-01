import fs from "fs";
import path from "path";
import platformData from "@/data/platform.json";

export type Position = {
  title: string;
  start: string;
  end: string;
};

export type TimelineEntry = {
  party: string;
  party_full_name: string;
  party_color: string;
  start_date: string;
  end_date: string;
  duration_years: number;
  positions: Position[];
  notes: string;
};

export type Statement = {
  quote: string;
  date: string;
  source_title: string;
  source_url: string;
  video_url: string;
  context: string;
  category: string;
  confidence: string;
};

export type EducationInstitution = {
  name: string;
  degree: string;
  location: string;
  year_start: string;
  year_end: string;
};

export type CareerPosition = {
  company: string;
  role: string;
  year_start: string;
  year_end: string;
};

export type Committee = {
  name: string;
  role: string;
  year_start: string;
  year_end: string;
};

export type NewsArticle = {
  title: string;
  url: string;
  date: string;
};

export type Politician = {
  id: string;
  slug: string;
  name: string;
  name_hindi: string;
  photo_url: string;
  date_of_birth: string;
  age: number;
  current_info: {
    party: string;
    party_full_name: string;
    party_color: string;
    position: string;
    state: string;
    constituency: string;
    status: string;
  };
  political_timeline: TimelineEntry[];
  statements: {
    has_contradictions: boolean;
    before_switch: Statement[];
    after_switch: Statement[];
  };
  education: {
    has_data: boolean;
    institutions: EducationInstitution[];
  };
  career_before_politics: {
    has_data: boolean;
    positions: CareerPosition[];
  };
  committees: Committee[];
  stats: {
    total_party_switches: number;
    years_in_politics: number;
    total_positions_held: number;
    parliaments_served: number;
  };
  social_media: {
    twitter: string;
    instagram: string;
    facebook: string;
  };
  external_sources: {
    wikipedia: string;
    myneta: string;
    prs_legislative: string;
    sansad_profile: string;
    news_articles: NewsArticle[];
  };
  metadata: {
    added_date: string;
    last_updated: string;
    is_featured: boolean;
    is_trending: boolean;
    data_completeness: number;
  };
};

// ─── Data loading ────────────────────────────────────────────────────────────
// Each politician lives in its own file: data/politicians/<slug>.json
// Adding a new MP = drop a new JSON file in that folder. No other change needed.

const POLITICIANS_DIR = path.join(process.cwd(), "data", "politicians");

let _cache: Politician[] | null = null;

function loadPoliticians(): Politician[] {
  if (_cache) return _cache;

  const files = fs
    .readdirSync(POLITICIANS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort(); // alphabetical = consistent ordering

  _cache = files.map((file) => {
    const raw = fs.readFileSync(path.join(POLITICIANS_DIR, file), "utf-8");
    return JSON.parse(raw) as Politician;
  });

  return _cache;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getAllPoliticians(): Politician[] {
  return loadPoliticians();
}

export function getPoliticianBySlug(slug: string): Politician | undefined {
  return loadPoliticians().find((p) => p.slug === slug);
}

export function getFeaturedPoliticians(): Politician[] {
  return loadPoliticians().filter((p) => p.metadata.is_featured);
}

export function getTrendingPoliticians(): Politician[] {
  return loadPoliticians().filter((p) => p.metadata.is_trending);
}

export function getPoliticiansByParty(party: string): Politician[] {
  return loadPoliticians().filter(
    (p) => p.current_info.party.toLowerCase() === party.toLowerCase()
  );
}

export function getPoliticiansByState(state: string): Politician[] {
  return loadPoliticians().filter(
    (p) => p.current_info.state.toLowerCase() === state.toLowerCase()
  );
}

export function getPlatformStats() {
  const all = loadPoliticians();

  // Find the earliest year any politician entered politics — drives "X+ years of history"
  const currentYear = new Date().getFullYear();
  let earliestYear = currentYear;
  for (const p of all) {
    for (const entry of p.political_timeline) {
      const year = parseInt(entry.start_date.substring(0, 4));
      if (!isNaN(year) && year > 1900 && year < earliestYear) {
        earliestYear = year;
      }
    }
  }
  const yearsOfHistory = currentYear - earliestYear;

  // Recently added: sort by added_date descending, take 6
  const recentlyAdded = [...all]
    .sort((a, b) =>
      b.metadata.added_date.localeCompare(a.metadata.added_date)
    )
    .slice(0, 6);

  return {
    total_politicians: all.length,
    total_party_switches: all.reduce(
      (sum, p) => sum + p.stats.total_party_switches,
      0
    ),
    years_of_history: yearsOfHistory,
    recently_added: recentlyAdded,
    last_updated: platformData.last_platform_update,
    next_additions: platformData.next_additions,
  };
}
