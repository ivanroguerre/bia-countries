import type { Country } from "@/types/country";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAllCountries(): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,region,capital,population,cca2,cca3`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
}

export async function fetchCountriesByName(name: string): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/name/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries by name: ${name}`);
  }
  return response.json();
}

export async function fetchCountriesByRegion(region: string): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/region/${region}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch countries by region: ${region}`);
  }
  return response.json();
}

export async function fetchCountryByCode(code: string): Promise<Country[]> {
  const response = await fetch(`${API_BASE_URL}/alpha/${code}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch country by code: ${code}`);
  }
  return response.json();
}
