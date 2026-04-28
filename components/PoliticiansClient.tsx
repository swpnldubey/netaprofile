"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import PoliticianCard from "@/components/PoliticianCard";
import PoliticianPhoto from "@/components/PoliticianPhoto";
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
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [selectedParty, setSelectedParty] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Unique parties from data
  const parties = useMemo(() => {
    const seen = new Set<string>();
    politicians.forEach((p) => {
      const party = p.political_timeline[p.political_timeline.length - 1].party;
      seen.add(party);
    });
    return ["All", ...Array.from(seen).sort()];
  }, [politicians]);

  const fuse = useMemo(() => new Fuse(politicians, FUSE_OPTIONS), [politicians]);

  // Dropdown suggestions (unfiltered by party — shows everything matching the name)
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 6).map((r) => r.item);
  }, [query, fuse]);

  // Grid results (filtered by party AND search)
  const gridResults = useMemo(() => {
    let filtered = politicians;
    if (selectedParty !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.political_timeline[p.political_timeline.length - 1].party ===
          selectedParty
      );
    }
    if (query.trim()) {
      const fuseOnFiltered = new Fuse(filtered, FUSE_OPTIONS);
      filtered = fuseOnFiltered.search(query).map((r) => r.item);
    }
    return filtered;
  }, [query, selectedParty, politicians, fuse]);

  // Open dropdown when there are suggestions
  useEffect(() => {
    setDropdownOpen(suggestions.length > 0);
    setActiveIndex(-1);
  }, [suggestions]);

  // Close dropdown on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!dropdownOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Escape") {
        setDropdownOpen(false);
        inputRef.current?.blur();
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const selected = suggestions[activeIndex];
        setDropdownOpen(false);
        router.push(`/politician/${selected.slug}`);
      }
    },
    [dropdownOpen, activeIndex, suggestions, router]
  );

  const hasActiveFilter = query.trim().length > 0 || selectedParty !== "All";

  return (
    <>
      {/* Search bar section */}
      <section className="bg-white border-b border-slate-200 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            All Politicians
          </h1>
          <p className="text-slate-500 mb-6">
            {politicians.length} politician{politicians.length !== 1 ? "s" : ""}{" "}
            tracked. More added weekly.
          </p>

          {/* Autocomplete search */}
          <div ref={containerRef} className="relative max-w-xl w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => suggestions.length > 0 && setDropdownOpen(true)}
                placeholder="Search by name, party, or state…"
                className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                autoComplete="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    setDropdownOpen(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {dropdownOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
                {suggestions.map((p, i) => {
                  const currentParty =
                    p.political_timeline[p.political_timeline.length - 1];
                  const isActive = i === activeIndex;
                  return (
                    <Link
                      key={p.slug}
                      href={`/politician/${p.slug}`}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors border-b border-slate-100 last:border-0 ${
                        isActive ? "bg-blue-50" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 ring-2 ring-slate-100">
                        <PoliticianPhoto
                          src={p.photo_url}
                          name={p.name}
                          fill
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {p.current_info.position} &middot;{" "}
                          {p.current_info.state}
                        </p>
                      </div>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white flex-shrink-0"
                        style={{ backgroundColor: currentParty.party_color }}
                      >
                        {currentParty.party}
                      </span>
                    </Link>
                  );
                })}
                <div className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-blue-600 font-semibold bg-blue-50">
                  <ArrowRight className="w-3 h-3" />
                  Results updating below as you type
                </div>
              </div>
            )}
          </div>
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

      {/* Results grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {hasActiveFilter && (
            <p className="text-sm text-slate-500 mb-6">
              {gridResults.length === 0
                ? "No results found"
                : `${gridResults.length} result${gridResults.length !== 1 ? "s" : ""}${query ? ` for "${query}"` : ""}${selectedParty !== "All" ? ` in ${selectedParty}` : ""}`}
            </p>
          )}

          {gridResults.length === 0 ? (
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
              {gridResults.map((p) => (
                <PoliticianCard key={p.slug} politician={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
