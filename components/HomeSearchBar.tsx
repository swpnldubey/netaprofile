"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";
import PoliticianPhoto from "@/components/PoliticianPhoto";
import type { Politician } from "@/lib/politicians";

type Props = {
  politicians: Politician[];
};

const FUSE_OPTIONS = {
  keys: [
    { name: "name", weight: 0.6 },
    { name: "name_hindi", weight: 0.25 },
    { name: "current_info.state", weight: 0.15 },
  ],
  threshold: 0.38,
  includeScore: true,
};

export default function HomeSearchBar({ politicians }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => new Fuse(politicians, FUSE_OPTIONS), [politicians]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 6).map((r) => r.item);
  }, [query, fuse]);

  // Open/close dropdown based on results
  useEffect(() => {
    setOpen(results.length > 0);
    setActiveIndex(-1);
  }, [results]);

  // Close on outside click
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const selected = results[activeIndex];
        setOpen(false);
        setQuery("");
        router.push(`/politician/${selected.slug}`);
      }
    },
    [open, activeIndex, results, router]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    if (query.trim()) {
      router.push(`/politicians?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/politicians");
    }
  }

  return (
    <div ref={containerRef} className="relative max-w-xl w-full">
      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search for any Indian politician…"
          className="block w-full pl-10 pr-28 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 m-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Search
        </button>
      </form>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 overflow-hidden">
          {results.map((p, i) => {
            const currentParty =
              p.political_timeline[p.political_timeline.length - 1];
            const isActive = i === activeIndex;

            return (
              <Link
                key={p.slug}
                href={`/politician/${p.slug}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className={`flex items-center gap-3 px-4 py-3 transition-colors border-b border-slate-100 last:border-0 ${
                  isActive ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                {/* Photo */}
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 ring-2 ring-slate-100">
                  <PoliticianPhoto src={p.photo_url} name={p.name} fill />
                </div>

                {/* Name + position */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {p.current_info.position} &middot; {p.current_info.state}
                  </p>
                </div>

                {/* Party pill */}
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white flex-shrink-0"
                  style={{ backgroundColor: currentParty.party_color }}
                >
                  {currentParty.party}
                </span>
              </Link>
            );
          })}

          {/* See all results */}
          <Link
            href={`/politicians?q=${encodeURIComponent(query)}`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs text-blue-600 hover:text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            See all results for &ldquo;{query}&rdquo;
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}
