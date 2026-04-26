import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="font-bold text-slate-900">NetaProfile</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Tracking every Indian politician&apos;s complete political
              journey. Transparent. Sourced. Independent.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/politicians", label: "All Politicians" },
                { href: "/roadmap", label: "Roadmap" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Data Sources
            </h3>
            <ul className="space-y-2">
              {[
                { href: "https://en.wikipedia.org", label: "Wikipedia" },
                { href: "https://www.myneta.info", label: "MyNeta" },
                { href: "https://prsindia.org", label: "PRS Legislative" },
                {
                  href: "https://eci.gov.in",
                  label: "Election Commission of India",
                },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-500">Disclaimer:</strong>{" "}
            NetaProfile is an independent platform documenting publicly
            available information about Indian politicians. We are not
            affiliated with any political party or government entity. All data
            is sourced from public records including Wikipedia, MyNeta.info,
            PRS Legislative Research, Election Commission affidavits, and
            credible news sources. Sources are cited for every claim. While we
            strive for accuracy, errors may occur. This platform is for
            informational and educational purposes only. NetaProfile does not
            endorse or oppose any political party or politician.
          </p>
          <p className="text-xs text-slate-400 mt-3">
            © {new Date().getFullYear()} NetaProfile. Built for transparency.
          </p>
        </div>
      </div>
    </footer>
  );
}
