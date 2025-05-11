"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";

import type { Country } from "@/types/country";
import { CountryCard } from "@/components/country-card";
import {
  fetchAllCountries,
  fetchCountriesByName,
  fetchCountriesByRegion,
} from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: allCountries,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", "all"],
    queryFn: fetchAllCountries,
    enabled: !debouncedSearchTerm && !selectedRegion,
  });

  const {
    data: searchedCountries,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", "name", debouncedSearchTerm],
    queryFn: () => fetchCountriesByName(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  const {
    data: regionalCountries,
    isLoading: isLoadingRegion,
    isError: isErrorRegion,
    error: errorRegion,
  } = useQuery<Country[], Error>({
    queryKey: ["countries", "region", selectedRegion],
    queryFn: () => fetchCountriesByRegion(selectedRegion),
    enabled: !!selectedRegion && !debouncedSearchTerm,
  });

  let countriesToDisplay: Country[] | undefined = [];
  let isLoading = false;
  let isError = false;
  let errorMessage: string | undefined = "";

  if (debouncedSearchTerm) {
    countriesToDisplay = searchedCountries;
    isLoading = isLoadingSearch;
    isError = isErrorSearch;
    errorMessage = errorSearch?.message;
  } else if (selectedRegion) {
    countriesToDisplay = regionalCountries;
    isLoading = isLoadingRegion;
    isError = isErrorRegion;
    errorMessage = errorRegion?.message;
  } else {
    countriesToDisplay = allCountries;
    isLoading = isLoadingAll;
    isError = isErrorAll;
    errorMessage = errorAll?.message;
  }

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
        <p>Error fetching countries: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
        <div className="relative max-w-sm">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedRegion}
          onValueChange={(value: string) => {
            setSelectedRegion(value === "all" ? "" : value);
            // Clear search term when region changes, or decide on interaction
            // setSearchTerm(""); 
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {countriesToDisplay && countriesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-16">
          {countriesToDisplay.map((country) => (
            <Link key={country.cca3} href={`/country/${country.cca3}`}>
              <CountryCard country={country} />
            </Link>
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
