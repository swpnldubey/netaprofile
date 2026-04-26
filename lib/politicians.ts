import data from "@/data/politicians.json";

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

const politicians: Politician[] = data.politicians as Politician[];

export function getAllPoliticians(): Politician[] {
  return politicians;
}

export function getPoliticianBySlug(slug: string): Politician | undefined {
  return politicians.find((p) => p.slug === slug);
}

export function getFeaturedPoliticians(): Politician[] {
  return politicians.filter((p) => p.metadata.is_featured);
}

export function getTrendingPoliticians(): Politician[] {
  return politicians.filter((p) => p.metadata.is_trending);
}

export function getPoliticiansByParty(party: string): Politician[] {
  return politicians.filter(
    (p) => p.current_info.party.toLowerCase() === party.toLowerCase()
  );
}

export function getPoliticiansByState(state: string): Politician[] {
  return politicians.filter(
    (p) => p.current_info.state.toLowerCase() === state.toLowerCase()
  );
}

export function getPlatformStats() {
  return {
    total_politicians: data.platform_metadata.total_politicians,
    total_party_switches: data.platform_metadata.total_party_switches_tracked,
    last_updated: data.platform_metadata.last_platform_update,
    next_additions: data.platform_metadata.next_additions,
  };
}
