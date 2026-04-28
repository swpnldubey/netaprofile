"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import SearchBar from "@/components/SearchBar";
import PoliticianCard from "@/components/PoliticianCard";
import type { Politician } from "@/lib/politicians";

type Props = {
  politicians: Politician[];
};

const FUSE_OPTIONS = {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "name_hindi", weight: 0.3 },
    { name: "current_info.state", weight: 0.15 },
    { name: "current_info.party", weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
};

export default function PoliticiansClient({ politicians }: Props) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [selectedParty, setSelectedParty] = useState("All");

  // Sync if URL param changes (e.g. browser back/forward)
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Derive unique parties from data dynamically
  const parties = useMemo(() => {
    const seen = new Set<string>();
    politicians.forEach((p) => {
      const party = p.political_timeline[p.political_timeline.length - 1].party;
      seen.add(party);
    });
    return ["All", ...Array.from(seen).sort()];
  }, [politicians]);

  // Fuse instance — only recreated if politician list changes
  const fuse = useMemo(() => new Fuse(politicians, FUSE_OPTIONS), [politicians]);

  // Apply search + party filter
  const results = useMemo(() => {
    let filtered = politicians;

    // Party filter first (fast)
    if (selectedParty !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.political_timeline[p.political_timeline.length - 1].party ===
          selectedParty
      );
    }

    // Then fuzzy search within filtered set
    if (query.trim().length > 0) {
      const fuseOnFiltered = new Fuse(filtered, FUSE_OPTIONS);
      filtered = fuseOnFiltered.search(query).map((r) => r.item);
    }

    return filtered;
  }, [query, selectedParty, politicians, fuse]);

  const hasActiveFilter = query.trim().length > 0 || selectedParty !== "All";

  return (
    <>
      {/* Search + Filters */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            All Politicians
          </h1>
          <p className="text-slate-500 mb-6">
            {politicians.length} politician{politicians.length !== 1 ? "s" : ""}{" "}
            tracked. More added weekly.
          </p>
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>

      {/* Party filter pills */}
      <section className="bg-white border-b border-slate-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-slate-500 mr-1">
            Party:
          </span>
          {parties.map((party) => (
            <button
              key={party}
              onClick={() => setSelectedParty(party)}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                selectedParty === party
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "border-slate-200 text-slate-600 bg-white hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {party}
            </button>
          ))}
          {hasActiveFilter && (
            <button
              onClick={() => {
                setQuery("");
                setSelectedParty("All");
              }}
              className="ml-2 text-xs text-red-500 hover:text-red-700 font-medium underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {hasActiveFilter && (
            <p className="text-sm text-slate-500 mb-6">
              {results.length === 0
                ? "No results found"
                : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query || selectedParty}"`}
            </p>
          )}

          {results.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No politicians found.</p>
              <p className="text-slate-400 text-sm mt-2">
                Try a different name, party, or state.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setSelectedParty("All");
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((p) => (
                <PoliticianCard key={p.slug} politician={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
