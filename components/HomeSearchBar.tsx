"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/politicians?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/politicians");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
  );
}
