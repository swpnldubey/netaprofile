"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

type Props = {
  name: string;
  slug: string;
  partySwitches: number;
  yearsInPolitics: number;
};

export default function ShareButtons({
  name,
  slug,
  partySwitches,
  yearsInPolitics,
}: Props) {
  const [copied, setCopied] = useState(false);
  const url = `https://netaprofile.vercel.app/politician/${slug}`;

  const tweetText = `Check out ${name}'s complete political journey on NetaProfile — ${partySwitches} party switch(es) in ${yearsInPolitics} years`;

  async function handleCopy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Share on 𝕏
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`Check out ${name}'s complete political journey — ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Share on WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="w-4 h-4" />
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}
