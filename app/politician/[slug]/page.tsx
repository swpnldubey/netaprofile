import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PoliticianPhoto from "@/components/PoliticianPhoto";
import {
  ExternalLink,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Share2,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import StatementComparison from "@/components/StatementComparison";
import { getPoliticianBySlug, getAllPoliticians } from "@/lib/politicians";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const politicians = getAllPoliticians();
  return politicians.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const politician = getPoliticianBySlug(slug);
  if (!politician) return {};
  return {
    title: `${politician.name} - Political Journey | NetaProfile`,
    description: `Complete political career of ${politician.name}. ${politician.stats.total_party_switches} party switch(es), ${politician.stats.years_in_politics} years in politics. Sourced and verified.`,
  };
}

export default async function PoliticianProfilePage({ params }: Props) {
  const { slug } = await params;
  const politician = getPoliticianBySlug(slug);

  if (!politician) notFound();

  const currentParty =
    politician.political_timeline[politician.political_timeline.length - 1];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero header */}
        <section
          className="border-b border-slate-200 py-10 px-4"
          style={{
            background: `linear-gradient(135deg, ${currentParty.party_color}15 0%, white 60%)`,
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-slate-100 shadow-md flex-shrink-0">
                <PoliticianPhoto
                  src={politician.photo_url}
                  name={politician.name}
                  fill
                  priority
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: currentParty.party_color }}
                  >
                    {currentParty.party}
                  </span>
                  {politician.metadata.is_trending && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                      Trending
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {politician.name}
                </h1>
                <p className="text-slate-500 text-lg mt-1">
                  {politician.name_hindi}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {politician.current_info.position}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {politician.current_info.state}
                  </span>
                  {politician.date_of_birth && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Born {formatDate(politician.date_of_birth)} · Age{" "}
                      {politician.age}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  {politician.social_media.twitter && (
                    <a
                      href={`https://twitter.com/${politician.social_media.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
                    >
                      𝕏 {politician.social_media.twitter}
                    </a>
                  )}
                  {politician.social_media.instagram && (
                    <a
                      href={`https://instagram.com/${politician.social_media.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900"
                    >
                      IG {politician.social_media.instagram}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "Years in Politics",
                  value: politician.stats.years_in_politics,
                },
                {
                  label: "Party Switches",
                  value: politician.stats.total_party_switches,
                },
                {
                  label: "Positions Held",
                  value: politician.stats.total_positions_held,
                },
                {
                  label: "Parliaments Served",
                  value: politician.stats.parliaments_served,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
          {/* Section 1: Timeline */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Political Career Timeline
            </h2>
            <Timeline timeline={politician.political_timeline} />
          </section>

          {/* Section 2: Before & After Statements */}
          {politician.statements.has_contradictions && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-2 pb-3 border-b border-slate-200">
                Before &amp; After — Statements
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                What {politician.name} said about BJP before the switch vs.
                what they said after.
              </p>
              <StatementComparison
                before={politician.statements.before_switch}
                after={politician.statements.after_switch}
                politicianName={politician.name}
              />
            </section>
          )}

          {/* Section 3: Education */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-slate-400" />
              Education
            </h2>
            {politician.education.has_data ? (
              <div className="space-y-4">
                {politician.education.institutions.map((inst, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{inst.degree}</p>
                      <p className="text-sm text-slate-600">{inst.name}</p>
                      {inst.location && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {inst.location}
                          {inst.year_end ? ` · ${inst.year_end}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">
                Education history — coming soon.
              </p>
            )}
          </section>

          {/* Section 4: Career Before Politics */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-400" />
              Career Before Politics
            </h2>
            {politician.career_before_politics.has_data ? (
              <div className="space-y-4">
                {politician.career_before_politics.positions.map((pos, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200"
                  >
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{pos.role}</p>
                      <p className="text-sm text-slate-600">{pos.company}</p>
                      {(pos.year_start || pos.year_end) && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {pos.year_start}
                          {pos.year_end ? ` – ${pos.year_end}` : ""}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">
                Pre-politics career — coming soon.
              </p>
            )}
          </section>

          {/* Section 5: Sources */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
              Data Sources &amp; Verification
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Wikipedia",
                  url: politician.external_sources.wikipedia,
                },
                {
                  label: "MyNeta (Affidavit Data)",
                  url: politician.external_sources.myneta,
                },
                {
                  label: "PRS Legislative Research",
                  url: politician.external_sources.prs_legislative,
                },
              ]
                .filter((s) => s.url)
                .map((source) => (
                  <a
                    key={source.label}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                      {source.label}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                  </a>
                ))}

              {politician.external_sources.news_articles.map((article, i) => (
                <a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                      {article.title}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatDate(article.date)}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 flex-shrink-0 ml-3" />
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
              <p className="text-xs text-slate-400">
                Last updated: {formatDate(politician.metadata.last_updated)} ·
                Data completeness: {politician.metadata.data_completeness}%
              </p>
              <a
                href={`mailto:netaprofile@gmail.com?subject=Report Error: ${politician.name}`}
                className="flex items-center gap-2 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                <AlertCircle className="w-4 h-4" />
                Report an Error
              </a>
            </div>
          </section>

          {/* Share */}
          <section className="bg-slate-900 rounded-2xl p-8 text-center text-white">
            <Share2 className="w-8 h-8 mx-auto mb-3 text-slate-400" />
            <h3 className="text-lg font-bold mb-2">Share this Profile</h3>
            <p className="text-slate-400 text-sm mb-6">
              Help spread political transparency
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a
                href={`https://twitter.com/intent/tweet?text=Check out ${politician.name}'s complete political journey on NetaProfile — ${politician.stats.total_party_switches} party switch(es) in ${politician.stats.years_in_politics} years&url=${encodeURIComponent(`https://netaprofile.in/politician/${politician.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Share on 𝕏
              </a>
              <a
                href={`https://wa.me/?text=Check out ${politician.name}'s complete political journey — https://netaprofile.in/politician/${politician.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Share on WhatsApp
              </a>
            </div>
          </section>

          {/* Back to all */}
          <div className="text-center">
            <Link
              href="/politicians"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to All Politicians
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
