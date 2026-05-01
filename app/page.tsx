import Link from "next/link";
import { ArrowRight, Users, GitBranch, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PoliticianCard from "@/components/PoliticianCard";
import HomeSearchBar from "@/components/HomeSearchBar";
import {
  getTrendingPoliticians,
  getAllPoliticians,
  getPlatformStats,
} from "@/lib/politicians";

export default function HomePage() {
  const trending = getTrendingPoliticians();
  const all = getAllPoliticians();
  const stats = getPlatformStats();
  const recentlyAdded = stats.recently_added;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Breaking: Raghav Chadha switches AAP → BJP
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Track Every Indian Politician&apos;s Political Journey
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Complete career histories. Party switches. Public statements.
              Transparent sources. From MPs to MLAs — full accountability.
            </p>
            <div className="flex justify-center mb-8">
              <HomeSearchBar politicians={all} />
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
              <span>
                <span className="text-white font-bold text-xl mr-1">
                  {stats.total_politicians}
                </span>
                politician tracked
              </span>
              <span>
                <span className="text-white font-bold text-xl mr-1">
                  {stats.total_party_switches}
                </span>
                party switch documented
              </span>
              <span>
                <span className="text-white font-bold text-xl mr-1">
                  {stats.years_of_history}+
                </span>
                years of history
              </span>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">
                  {stats.total_politicians}
                </span>
                <span className="text-xs text-slate-500">Politicians Tracked</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">
                  {stats.total_party_switches}
                </span>
                <span className="text-xs text-slate-500">Party Switches Documented</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-slate-900">
                  {stats.years_of_history}+
                </span>
                <span className="text-xs text-slate-500">Years of History</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Now */}
        {trending.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Trending Now</h2>
                  <p className="text-slate-500 text-sm mt-1">Politicians in the news right now</p>
                </div>
                <Link
                  href="/politicians"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trending.map((p) => (
                  <PoliticianCard key={p.slug} politician={p} variant="trending" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recently Added */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>
                <p className="text-slate-500 text-sm mt-1">Latest politician profiles</p>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {stats.total_politicians} total
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyAdded.map((p) => (
                <PoliticianCard key={p.slug} politician={p} />
              ))}
            </div>
            {/* View All button */}
            <div className="mt-10 flex justify-center">
              <Link
                href="/politicians"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-700 transition-colors shadow-sm"
              >
                View all {stats.total_politicians} politicians
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">How NetaProfile Works</h2>
            <p className="text-slate-500 mb-12">Every data point is sourced, verified, and timestamped.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Research",
                  desc: "We collect data from Wikipedia, MyNeta, PRS Legislative Research, and verified news sources.",
                },
                {
                  step: "2",
                  title: "Verify",
                  desc: "Every claim is cross-referenced with at least two independent credible sources before publishing.",
                },
                {
                  step: "3",
                  title: "Publish",
                  desc: "Profiles go live with every source cited, confidence levels marked, and a report error button.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming soon teaser */}
        <section className="py-12 px-4 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Coming Soon</h2>
              <Link href="/roadmap" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                See full roadmap →
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.next_additions.map((name) => (
                <div
                  key={name}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
