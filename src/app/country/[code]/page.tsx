"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import type { Country } from "@/types/country";
import { fetchCountryByCode, fetchAllCountries } from "@/lib/api";

export default function CountryPage() {
  const params = useParams();
  const countryCode = params.code as string;

  const {
    data: countryData,
    isLoading: isLoadingCountry,
    isError: isErrorCountry,
    error: errorCountry,
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

  const isLoading = isLoadingCountry || isLoadingAll;
  const isError = isErrorCountry || isErrorAll;
  const error = errorCountry || errorAll;

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data: {error?.message}</div>;

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
    <div className="px-4 py-7 sm:px-16 sm:pt-16 mx-auto max-w-[1368px]">
      <div className="mb-14">
        <Link href="/countries">
          <Button
            size="sm"
            variant="outline"
            className="border-0 shadow-(--button-shadow) rounded-xs px-5! pl-6! dark:bg-dark-blue"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-start md:items-center">
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
              className="w-full h-auto object-contain shadow-md"
            />
          )}
        </div>

        <div>
          <h1 className="font-bold mb-6 !text-2xl">
            {country.name?.common || "Unknown Country"}
          </h1>

          <div className="flex flex-col space-y-12 mb-12 md:flex-row md:space-x-20">
            <div className="flex flex-col space-y-4 text-base">
              <p className="text-base">
                <strong className="font-semibold">Native Name:</strong>{" "}
                {getNativeName(country)}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Population:</strong>{" "}
                {country.population?.toLocaleString() || "N/A"}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Region:</strong>{" "}
                {country.region || "N/A"}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Sub Region:</strong>{" "}
                {country.subregion || "N/A"}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Capital:</strong>{" "}
                {country.capital?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="flex flex-col space-y-4 text-base">
              <p className="text-base">
                <strong className="font-semibold">Top Level Domain:</strong>{" "}
                {country.tld?.join(", ") || "N/A"}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Currencies:</strong>{" "}
                {getCurrencies(country)}
              </p>
              <p className="text-base">
                <strong className="font-semibold">Languages:</strong>{" "}
                {getLanguages(country)}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="flex flex-col items-start md:flex-row md:space-x-2 md:items-center">
              <h2 className="font-semibold text-base">
                Border Countries:
              </h2>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((borderCode) => (
                  <Link
                    key={borderCode}
                    href={`/country/${borderCode.toLowerCase()}`}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-0 shadow-(--button-shadow) rounded-xs px-5! dark:bg-dark-blue"
                    >
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
