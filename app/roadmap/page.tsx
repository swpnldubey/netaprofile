import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPlatformStats } from "@/lib/politicians";

export const metadata: Metadata = {
  title: "Roadmap | NetaProfile",
  description:
    "See which politicians are being added next to NetaProfile. Request a politician and track our progress.",
};

export default function RoadmapPage() {
  const stats = getPlatformStats();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Roadmap</h1>
            <p className="text-slate-300 text-lg">
              We&apos;re adding politicians systematically. Here&apos;s
              what&apos;s next.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
          {/* Next up */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Next Politicians Being Added
            </h2>
            <div className="space-y-3">
              {stats.next_additions.map((name, i) => (
                <div
                  key={name}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200"
                >
                  <span className="text-sm font-bold text-slate-400 w-6">
                    #{i + 2}
                  </span>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                    Coming soon
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Phase progress */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Coverage Progress
            </h2>
            <div className="space-y-6">
              {[
                {
                  phase: "Week 1",
                  title: "AAP Defectors (7 MPs)",
                  total: 7,
                  done: 1,
                },
                {
                  phase: "Month 1–2",
                  title: "PM, CMs, Party Leaders (top 50)",
                  total: 50,
                  done: 0,
                },
                {
                  phase: "Month 3–6",
                  title: "All Lok Sabha MPs (543)",
                  total: 543,
                  done: 0,
                },
                {
                  phase: "Month 6–12",
                  title: "All Rajya Sabha MPs (245)",
                  total: 245,
                  done: 0,
                },
              ].map((item) => {
                const pct = Math.round((item.done / item.total) * 100);
                return (
                  <div key={item.phase}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          {item.phase}
                        </span>
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                        {item.done}/{item.total}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-900 rounded-full transition-all"
                        style={{ width: `${Math.max(pct, item.done > 0 ? 2 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Request */}
          <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Request a Politician
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Don&apos;t see a politician you need? Let us know and we&apos;ll
              prioritize them.
            </p>
            <a
              href="mailto:netaprofile@gmail.com?subject=Request: Add [Politician Name] to NetaProfile"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Request via Email
            </a>
          </section>

          {/* Last updated */}
          <p className="text-xs text-slate-400 text-center">
            Last updated: {stats.last_updated}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
