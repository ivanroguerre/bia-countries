import type { Country } from "@/types/country";

export const getNativeName = (country: Country): string => {
  const nativeNameMap = country.name?.nativeName;

  if (
    nativeNameMap &&
    typeof nativeNameMap === "object" &&
    Object.keys(nativeNameMap).length > 0
  ) {
    const firstKey = Object.keys(nativeNameMap)[0];
    const nativeEntry = nativeNameMap[firstKey];

    return nativeEntry?.official ?? country.name?.common ?? "Unknown";
  }

  return country.name?.common || "Unknown";
};

export const getCurrencies = (country: Country): string => {
  if (country.currencies) {
    return Object.values(country.currencies)
      .map((c) => `${c.name} (${c.symbol})`)
      .join(", ");
  }
  return "N/A";
};

export const getLanguages = (country: Country): string => {
  if (country.languages) {
    return Object.values(country.languages).join(", ");
  }
  return "N/A";
};

export const getBorderCountryName = (code: string, allCountries?: Country[]): string => {
  if (!allCountries) return code;
  const match = allCountries.find((c) => c.cca3 === code);
  return match?.name?.common || code;
}; 