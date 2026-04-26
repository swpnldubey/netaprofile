import Image from "next/image";
import { getPartyConfig } from "@/lib/parties";

type Props = {
  party: string;
  partyColor: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP = {
  sm: { cls: "w-8 h-8", px: 32 },
  md: { cls: "w-12 h-12", px: 48 },
  lg: { cls: "w-16 h-16", px: 64 },
};

const LOGO_FILES: Record<string, string> = {
  BJP: "/images/parties/BJP.png",
  AAP: "/images/parties/AAP.png",
  INC: "/images/parties/INC.png",
  SP: "/images/parties/SP.png",
};

export default function PartyLogo({ party, partyColor, size = "md" }: Props) {
  const config = getPartyConfig(party);
  const { cls, px } = SIZE_MAP[size];
  const logoSrc = LOGO_FILES[party.toUpperCase()];

  return (
    <div
      className={`${cls} rounded-full flex items-center justify-center shadow-md flex-shrink-0 overflow-hidden bg-white`}
      style={{ border: `2px solid ${partyColor}` }}
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={config.full_name}
          width={px}
          height={px}
          className="w-full h-full object-contain p-0.5"
        />
      ) : (
        <span
          className="font-bold text-white leading-none"
          style={{ fontSize: size === "lg" ? 16 : size === "md" ? 12 : 10 }}
        >
          {config.abbreviation}
        </span>
      )}
    </div>
  );
}
