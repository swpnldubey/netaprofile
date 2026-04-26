"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative max-w-xl w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search for any Indian politician…"
        className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
        disabled
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
          Coming soon
        </span>
      </div>
    </div>
  );
}
