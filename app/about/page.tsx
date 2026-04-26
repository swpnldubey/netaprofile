import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About NetaProfile",
  description:
    "Learn about NetaProfile — an independent platform documenting every Indian politician's complete political career.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-slate-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">About NetaProfile</h1>
            <p className="text-slate-300 text-lg">
              An independent platform for political transparency in India.
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Why We Built This
            </h2>
            <div className="prose prose-slate text-slate-600 space-y-4">
              <p>
                Indian politics moves fast. MPs switch parties, change
                positions, and contradict their own earlier statements — often
                within months. Voters deserve a single, reliable place to track
                this.
              </p>
              <p>
                NetaProfile is building the most comprehensive public database
                of Indian political careers. Think of it as a permanent,
                sourced record: what every politician stood for, where they
                served, and what they said — at every stage of their career.
              </p>
              <p>
                We are not affiliated with any political party, government
                entity, or media house. We have no editorial agenda. We simply
                document what is publicly verifiable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Our Data Sources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "Wikipedia",
                  desc: "Biographical and career information",
                },
                {
                  name: "MyNeta.info",
                  desc: "Election Commission affidavit data",
                },
                {
                  name: "PRS Legislative Research",
                  desc: "Parliamentary attendance and debates",
                },
                {
                  name: "Election Commission of India",
                  desc: "Candidate and election data",
                },
                {
                  name: "Verified News Sources",
                  desc: "TOI, Indian Express, The Hindu, NDTV",
                },
                {
                  name: "Official Parliament Records",
                  desc: "Rajya Sabha and Lok Sabha debates",
                },
              ].map((source) => (
                <div
                  key={source.name}
                  className="p-4 bg-white rounded-xl border border-slate-200"
                >
                  <p className="font-semibold text-slate-900">{source.name}</p>
                  <p className="text-sm text-slate-500 mt-1">{source.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Our Verification Standard
            </h2>
            <div className="space-y-4">
              {[
                {
                  level: "High Confidence",
                  color: "bg-green-100 text-green-700",
                  desc: "Verified by 3+ independent credible sources. Treated as established fact.",
                },
                {
                  level: "Medium Confidence",
                  color: "bg-yellow-100 text-yellow-700",
                  desc: "Verified by 2 sources. Published with the confidence level marked.",
                },
                {
                  level: "Low Confidence",
                  color: "bg-red-100 text-red-700",
                  desc: "Only 1 source found. Flagged for review. Not published until verified.",
                },
              ].map((item) => (
                <div
                  key={item.level}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200"
                >
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${item.color}`}
                  >
                    {item.level}
                  </span>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Roadmap</h2>
            <div className="space-y-3">
              {[
                {
                  phase: "Phase 1 (Now)",
                  desc: "High-profile MPs — starting with Raghav Chadha",
                  status: "active",
                },
                {
                  phase: "Phase 2 (Month 1–2)",
                  desc: "All Lok Sabha MPs (543 members)",
                  status: "upcoming",
                },
                {
                  phase: "Phase 3 (Month 3–6)",
                  desc: "All Rajya Sabha MPs (245 members)",
                  status: "upcoming",
                },
                {
                  phase: "Phase 4 (Month 6+)",
                  desc: "State MLAs across all states (4000+ members)",
                  status: "upcoming",
                },
                {
                  phase: "Phase 5 (Future)",
                  desc: "Historical data — retired and deceased politicians",
                  status: "future",
                },
              ].map((item) => (
                <div
                  key={item.phase}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      item.status === "active"
                        ? "bg-green-500"
                        : item.status === "upcoming"
                          ? "bg-blue-300"
                          : "bg-slate-200"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {item.phase}
                    </p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              Found an error? Want to contribute data? Have a suggestion?
            </p>
            <a
              href="mailto:netaprofile@gmail.com"
              className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Email Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
