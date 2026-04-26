export type PartyConfig = {
  abbreviation: string;
  full_name: string;
  color: string;
  logo_type: "svg" | "text";
};

export const PARTY_CONFIG: Record<string, PartyConfig> = {
  BJP: {
    abbreviation: "BJP",
    full_name: "Bharatiya Janata Party",
    color: "#FF9933",
    logo_type: "svg",
  },
  AAP: {
    abbreviation: "AAP",
    full_name: "Aam Aadmi Party",
    color: "#0066CC",
    logo_type: "svg",
  },
  INC: {
    abbreviation: "INC",
    full_name: "Indian National Congress",
    color: "#138808",
    logo_type: "svg",
  },
  SP: {
    abbreviation: "SP",
    full_name: "Samajwadi Party",
    color: "#E31837",
    logo_type: "text",
  },
  TMC: {
    abbreviation: "TMC",
    full_name: "Trinamool Congress",
    color: "#2ECC71",
    logo_type: "text",
  },
  BSP: {
    abbreviation: "BSP",
    full_name: "Bahujan Samaj Party",
    color: "#1a1a6e",
    logo_type: "text",
  },
};

export function getPartyConfig(party: string): PartyConfig {
  return (
    PARTY_CONFIG[party.toUpperCase()] ?? {
      abbreviation: party.slice(0, 3).toUpperCase(),
      full_name: party,
      color: "#64748b",
      logo_type: "text",
    }
  );
}
