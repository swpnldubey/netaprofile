import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoliticianCard from "@/components/PoliticianCard";
import SearchBar from "@/components/SearchBar";
import { getAllPoliticians, getPlatformStats } from "@/lib/politicians";

export const metadata: Metadata = {
  title: "All Politicians | NetaProfile",
  description:
    "Browse all Indian politicians tracked on NetaProfile. Filter by party, state, and career history.",
};

export default function PoliticiansPage() {
  const politicians = getAllPoliticians();
  const stats = getPlatformStats();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-white border-b border-slate-200 py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              All Politicians
            </h1>
            <p className="text-slate-500 mb-6">
              {stats.total_politicians} politician
              {stats.total_politicians !== 1 ? "s" : ""} tracked. More added
              weekly.
            </p>
            <SearchBar />
          </div>
        </section>

        {/* Filters — UI only for now */}
        <section className="bg-white border-b border-slate-200 px-4 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-slate-700">Filter:</span>
            {["BJP", "AAP", "INC", "All Parties"].map((party) => (
              <button
                key={party}
                disabled
                className="px-3 py-1.5 text-xs rounded-full border border-slate-200 text-slate-500 bg-slate-50 cursor-not-allowed"
              >
                {party}
              </button>
            ))}
            <span className="text-xs text-slate-400 ml-2">
              Filters coming soon
            </span>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {politicians.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-500">
                  No politicians in the database yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {politicians.map((p) => (
                  <PoliticianCard key={p.slug} politician={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
