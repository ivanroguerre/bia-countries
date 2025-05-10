export interface NativeNameDetail {
  official: string;
  common: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: Record<string, NativeNameDetail>;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Demonym {
  f: string;
  m: string;
}

export interface Translation {
  official: string;
  common: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface PostalCode {
  format: string | null;
  regex: string | null;
}

export interface Country {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, Currency>;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms: Record<string, Demonym>;
  cca3: string;
  translations: Record<string, Translation>;
  flag: string;
  maps: Maps;
  population: number;
  gini?: Record<string, number>;
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
}
