"use client";

import { useQuery } from "@tanstack/react-query";

import type { Country } from "@/types/country";
import { CountryCard } from "@/components/country-card";
import { fetchAllCountries } from "@/lib/api";

export default function CountriesPage() {
  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading countries...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error fetching countries: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">All Countries</h1>
      {countries && countries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No countries found.</p>
        </div>
      )}
    </div>
  );
}
