import { ExternalLink, PlayCircle } from "lucide-react";
import type { Statement } from "@/lib/politicians";
import { formatDate, getConfidenceBadge } from "@/lib/utils";

type Props = {
  before: Statement[];
  after: Statement[];
  politicianName: string;
};

function StatementCard({
  statement,
  side,
}: {
  statement: Statement;
  side: "before" | "after";
}) {
  const isBefore = side === "before";
  const badgeLabel = getConfidenceBadge(statement.confidence);

  return (
    <div
      className={`p-4 rounded-lg border ${isBefore ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}
    >
      <blockquote
        className={`text-sm leading-relaxed font-medium italic ${isBefore ? "text-red-900" : "text-green-900"}`}
      >
        &ldquo;{statement.quote}&rdquo;
      </blockquote>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-slate-500">
          {formatDate(statement.date)} · {statement.context}
        </p>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {statement.source_url && (
            <a
              href={statement.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="w-3 h-3" />
              {statement.source_title?.slice(0, 40) || "Source"}
              {(statement.source_title?.length ?? 0) > 40 ? "…" : ""}
            </a>
          )}

          {statement.video_url && (
            <a
              href={statement.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
            >
              <PlayCircle className="w-3 h-3" />
              Watch Video
            </a>
          )}

          {badgeLabel && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                statement.confidence === "high"
                  ? "bg-green-100 text-green-700"
                  : statement.confidence === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {badgeLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StatementComparison({
  before,
  after,
  politicianName,
}: Props) {
  if (!before.length && !after.length) return null;

  return (
    <div>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> {politicianName} deleted all anti-BJP posts
          from X (Twitter) before announcing the switch. The statements below
          are from verified news sources and Parliament records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {before.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <h3 className="font-semibold text-slate-900">
                Before Switch — While in AAP
              </h3>
            </div>
            <div className="space-y-3">
              {before.map((s, i) => (
                <StatementCard key={i} statement={s} side="before" />
              ))}
            </div>
          </div>
        )}

        {after.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <h3 className="font-semibold text-slate-900">
                After Switch — Joining BJP
              </h3>
            </div>
            <div className="space-y-3">
              {after.map((s, i) => (
                <StatementCard key={i} statement={s} side="after" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
