import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Politician } from "@/lib/politicians";
import PoliticianPhoto from "@/components/PoliticianPhoto";
import PartyLogo from "@/components/PartyLogo";

type Props = {
  politician: Politician;
  variant?: "default" | "trending";
};

export default function PoliticianCard({
  politician,
  variant = "default",
}: Props) {
  const isTrending = variant === "trending";
  const prev =
    politician.political_timeline.length > 1
      ? politician.political_timeline[politician.political_timeline.length - 2]
      : null;
  const current =
    politician.political_timeline[politician.political_timeline.length - 1];

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow ${isTrending ? "ring-2 ring-orange-200" : ""}`}
    >
      {isTrending && (
        <div className="bg-orange-50 border-b border-orange-100 px-4 py-1.5">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
            Trending Now
          </span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            <PoliticianPhoto
              src={politician.photo_url}
              name={politician.name}
              fill
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 text-lg leading-tight">
              {politician.name}
            </h3>
            <p className="text-slate-500 text-sm mt-0.5">
              {politician.name_hindi}
            </p>
            <p className="text-slate-600 text-sm mt-1">
              {politician.current_info.position} · {politician.current_info.state}
            </p>
          </div>
        </div>

        {prev && (
          <div className="mt-4 flex items-center gap-2">
            <PartyLogo party={prev.party} partyColor={prev.party_color} size="sm" />
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <PartyLogo party={current.party} partyColor={current.party_color} size="sm" />
          </div>
        )}

        {!prev && (
          <div className="mt-4">
            <PartyLogo party={current.party} partyColor={current.party_color} size="sm" />
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4 text-xs text-slate-500">
            <span>
              <span className="font-semibold text-slate-700">
                {politician.stats.years_in_politics}
              </span>{" "}
              yrs in politics
            </span>
            <span>
              <span className="font-semibold text-slate-700">
                {politician.stats.total_party_switches}
              </span>{" "}
              {politician.stats.total_party_switches === 1
                ? "switch"
                : "switches"}
            </span>
          </div>

          <Link
            href={`/politician/${politician.slug}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
