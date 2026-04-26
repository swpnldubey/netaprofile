import { formatDate } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/politicians";
import PartyLogo from "@/components/PartyLogo";

type Props = {
  timeline: TimelineEntry[];
};

export default function Timeline({ timeline }: Props) {
  return (
    <div className="relative">
      {/* Desktop: horizontal */}
      <div className="hidden md:block">
        <div className="flex items-start gap-0 overflow-x-auto pb-4">
          {timeline.map((entry, i) => (
            <div key={i} className="flex items-start flex-shrink-0">
              <div className="flex flex-col items-center">
                <PartyLogo party={entry.party} partyColor={entry.party_color} size="md" />
                <div className="mt-3 text-center max-w-44">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: entry.party_color }}
                  >
                    {entry.party}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {formatDate(entry.start_date)} –{" "}
                    {entry.end_date === "Present"
                      ? "Present"
                      : formatDate(entry.end_date)}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {entry.positions.map((pos, j) => (
                      <li key={j} className="text-xs text-slate-600">
                        {pos.title}
                      </li>
                    ))}
                  </ul>
                  {entry.notes && (
                    <p className="mt-2 text-xs text-slate-400 italic">
                      {entry.notes}
                    </p>
                  )}
                </div>
              </div>

              {i < timeline.length - 1 && (
                <div className="flex items-center mt-5 mx-2 flex-shrink-0">
                  <div className="h-0.5 w-12 bg-slate-300" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="relative pl-8">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
          {timeline.map((entry, i) => (
            <div key={i} className="relative mb-8 last:mb-0">
              <div className="absolute -left-4">
                <PartyLogo party={entry.party} partyColor={entry.party_color} size="sm" />
              </div>
              <div className="bg-white border border-slate-100 rounded-lg p-4">
                <p
                  className="font-semibold text-sm"
                  style={{ color: entry.party_color }}
                >
                  {entry.party_full_name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatDate(entry.start_date)} –{" "}
                  {entry.end_date === "Present"
                    ? "Present"
                    : formatDate(entry.end_date)}
                </p>
                <ul className="mt-2 space-y-1">
                  {entry.positions.map((pos, j) => (
                    <li key={j} className="text-xs text-slate-600">
                      • {pos.title}
                    </li>
                  ))}
                </ul>
                {entry.notes && (
                  <p className="mt-2 text-xs text-slate-400 italic">
                    {entry.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
