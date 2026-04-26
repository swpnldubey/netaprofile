import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  if (!dateStr || dateStr === "Present") return "Present";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

export function getConfidenceBadge(confidence: string): string {
  switch (confidence) {
    case "high":
      return "Verified";
    case "medium":
      return "Likely";
    case "low":
      return "Unverified";
    default:
      return "";
  }
}
