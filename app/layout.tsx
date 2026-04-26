import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NetaProfile - Track Every Indian Politician's Political Journey",
  description:
    "Complete political career tracking for Indian MPs and MLAs. Party switches, statements, education, and voting records. Transparent sourcing.",
  openGraph: {
    title: "NetaProfile - Track Every Indian Politician's Political Journey",
    description:
      "Complete political career tracking for Indian MPs and MLAs. Party switches, statements, and transparent sourcing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
