import { getPartyConfig } from "@/lib/parties";

type Props = {
  party: string;
  partyColor: string;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-base",
};

function BJPLotus() {
  return (
    <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-[65%] h-[65%]">
      {/* Center petal */}
      <ellipse cx="16" cy="17" rx="3.5" ry="6" />
      {/* Left petal */}
      <ellipse cx="9" cy="16" rx="3" ry="5.5" transform="rotate(-35 9 16)" />
      {/* Right petal */}
      <ellipse cx="23" cy="16" rx="3" ry="5.5" transform="rotate(35 23 16)" />
      {/* Far left petal */}
      <ellipse cx="5" cy="19" rx="2.2" ry="4.5" transform="rotate(-55 5 19)" />
      {/* Far right petal */}
      <ellipse cx="27" cy="19" rx="2.2" ry="4.5" transform="rotate(55 27 19)" />
      {/* Base stem */}
      <rect x="14.5" y="23" width="3" height="4" rx="1.5" />
    </svg>
  );
}

function AAPBroom() {
  return (
    <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-[65%] h-[65%]">
      {/* Handle */}
      <rect x="14.5" y="2" width="3" height="16" rx="1.5" />
      {/* Bristle head */}
      <path d="M6 18 Q16 23 26 18 L24 27 Q16 30 8 27 Z" />
      {/* Bristle lines */}
      <line x1="10" y1="22" x2="9" y2="27" stroke="rgba(0,102,204,0.4)" strokeWidth="1" />
      <line x1="14" y1="23" x2="13" y2="28" stroke="rgba(0,102,204,0.4)" strokeWidth="1" />
      <line x1="18" y1="23" x2="18" y2="28" stroke="rgba(0,102,204,0.4)" strokeWidth="1" />
      <line x1="22" y1="22" x2="23" y2="27" stroke="rgba(0,102,204,0.4)" strokeWidth="1" />
    </svg>
  );
}

function INCHand() {
  return (
    <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-[65%] h-[65%]">
      {/* Palm */}
      <rect x="9" y="16" width="14" height="12" rx="3" />
      {/* Fingers */}
      <rect x="9" y="8" width="3" height="10" rx="1.5" />
      <rect x="13" y="6" width="3" height="12" rx="1.5" />
      <rect x="17" y="6" width="3" height="12" rx="1.5" />
      <rect x="21" y="9" width="3" height="9" rx="1.5" />
      {/* Thumb */}
      <rect x="5" y="15" width="3" height="8" rx="1.5" transform="rotate(-15 5 15)" />
    </svg>
  );
}

export default function PartyLogo({ party, partyColor, size = "md" }: Props) {
  const config = getPartyConfig(party);
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}
      style={{ backgroundColor: partyColor }}
    >
      {party === "BJP" ? (
        <BJPLotus />
      ) : party === "AAP" ? (
        <AAPBroom />
      ) : party === "INC" ? (
        <INCHand />
      ) : (
        <span className="font-bold text-white leading-none">
          {config.abbreviation}
        </span>
      )}
    </div>
  );
}
