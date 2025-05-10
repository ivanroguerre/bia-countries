"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button"; // Assuming Shadcn Button path
import type { Country } from "@/types/country";
import { fetchCountryByCode, fetchAllCountries } from "@/lib/api";

export default function CountryPage() {
  const params = useParams();
  const countryCode = params.code as string;

  const {
    data: countryData,
    isLoading,
    isError,
    error,
  } = useQuery<Country[], Error>({
    queryKey: ["country", countryCode],
    queryFn: () => fetchCountryByCode(countryCode),
  });

  const {
    data: allCountries,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", "all"],
    queryFn: fetchAllCountries,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching country data: {error?.message}</div>;

  // The API returns an array, we expect a single country or for it to be empty/undefined
  const country = countryData?.[0];

  if (!country) {
    return <div>Country not found.</div>;
  }

  const getNativeName = (country: Country): string => {
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

  const getCurrencies = (country: Country) => {
    if (country.currencies) {
      return Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ");
    }
    return "N/A";
  };

  const getLanguages = (country: Country) => {
    if (country.languages) {
      return Object.values(country.languages).join(", ");
    }
    return "N/A";
  };

  // Helper to map border codes to country names
  const getBorderCountryName = (code: string) => {
    if (!allCountries) return code;
    const match = allCountries.find((c) => c.cca3 === code);
    return match?.name?.common || code;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/countries">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          {country.flags?.svg && (
            <Image
              src={country.flags.svg}
              alt={
                country.flags.alt ||
                `Flag of ${country.name?.common || "Unknown"}`
              }
              width={500}
              height={300}
              className="w-full h-auto object-contain rounded shadow-md mb-8"
            />
          )}
        </div>

        <div>
          <h1 className="font-bold mb-6 !text-2xl">
            {country.name?.common || "Unknown Country"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-base mb-6">
            <p className="text-base">
              <strong>Native Name:</strong> {getNativeName(country)}
            </p>
            <p className="text-base">
              <strong>Population:</strong>{" "}
              {country.population?.toLocaleString() || "N/A"}
            </p>
            <p className="text-base">
              <strong>Region:</strong> {country.region || "N/A"}
            </p>
            <p className="text-base">
              <strong>Sub Region:</strong> {country.subregion || "N/A"}
            </p>
            <p className="text-base">
              <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
            </p>
            <p className="text-base">
              <strong>Top Level Domain:</strong>{" "}
              {country.tld?.join(", ") || "N/A"}
            </p>
            <p className="text-base">
              <strong>Currencies:</strong> {getCurrencies(country)}
            </p>
            <p className="text-base">
              <strong>Languages:</strong> {getLanguages(country)}
            </p>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="mt-6">
              <h2 className="font-semibold mb-2 text-base">
                Border Countries:
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((borderCode) => (
                  <Link
                    key={borderCode}
                    href={`/country/${borderCode.toLowerCase()}`}
                  >
                    <Button variant="ghost" size="sm" className="text-base">
                      {getBorderCountryName(borderCode)}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
