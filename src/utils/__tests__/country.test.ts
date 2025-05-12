import type { Country } from "@/types/country";
import {
  getNativeName,
  getCurrencies,
  getLanguages,
  getBorderCountryName,
} from "@/utils/country";

describe("Country Utils", () => {
  describe("getNativeName", () => {
    it("should return native name when available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {
            deu: {
              official: "Bundesrepublik Deutschland",
              common: "Deutschland",
            },
          },
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getNativeName(country)).toBe("Bundesrepublik Deutschland");
    });

    it("should return common name when native name is not available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getNativeName(country)).toBe("Germany");
    });

    it("should return common name when native name exists but official field is empty", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {
            deu: {
              official: "",
              common: "Deutschland",
            },
          },
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getNativeName(country)).toBe("Germany");
    });

    it("should return 'Unknown' when no name is available", () => {
      const country = {
        name: {
          common: "",
          official: "",
          nativeName: {},
        },
        tld: [],
        cca2: "",
        ccn3: "",
        independent: false,
        status: "",
        unMember: false,
        currencies: {},
        idd: { root: "", suffixes: [] },
        capital: [],
        altSpellings: [],
        region: "",
        subregion: "",
        languages: {},
        latlng: [0, 0],
        landlocked: false,
        area: 0,
        demonyms: {},
        cca3: "",
        translations: {},
        flag: "",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 0,
        car: { signs: [], side: "" },
        timezones: [],
        continents: [],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "",
        capitalInfo: { latlng: [0, 0] },
        postalCode: { format: null, regex: null },
      } as Country;

      expect(getNativeName(country)).toBe("Unknown");
    });

    it("should return 'Unknown' when both official and common names are falsy", () => {
      const country = {
        name: {
          common: "",
          official: "",
          nativeName: {
            deu: {
              official: "",
              common: "",
            },
          },
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getNativeName(country)).toBe("Unknown");
    });
  });

  describe("getCurrencies", () => {
    it("should return formatted currencies when available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        currencies: {
          EUR: {
            name: "Euro",
            symbol: "€",
          },
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getCurrencies(country)).toBe("Euro (€)");
    });

    it("should handle multiple currencies", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        currencies: {
          EUR: {
            name: "Euro",
            symbol: "€",
          },
          USD: {
            name: "US Dollar",
            symbol: "$",
          },
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getCurrencies(country)).toBe("Euro (€), US Dollar ($)");
    });

    it("should return 'N/A' when no currencies are available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        currencies: {},
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        languages: {},
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getCurrencies(country)).toBe("N/A");
    });
  });

  describe("getLanguages", () => {
    it("should return languages when available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        languages: {
          eng: "English",
          fra: "French",
        },
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getLanguages(country)).toBe("English, French");
    });

    it("should return 'N/A' when no languages are available", () => {
      const country = {
        name: {
          common: "Germany",
          official: "Federal Republic of Germany",
          nativeName: {},
        },
        languages: {},
        tld: [".de"],
        cca2: "DE",
        ccn3: "276",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+4", suffixes: ["9"] },
        capital: ["Berlin"],
        altSpellings: ["DE", "Federal Republic of Germany"],
        region: "Europe",
        subregion: "Western Europe",
        latlng: [51, 9],
        landlocked: false,
        area: 357114,
        demonyms: {},
        cca3: "DEU",
        translations: {},
        flag: "🇩🇪",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 83240525,
        car: { signs: ["DEU"], side: "right" },
        timezones: ["UTC+01:00"],
        continents: ["Europe"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [52.52, 13.4] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      } as Country;

      expect(getLanguages(country)).toBe("N/A");
    });
  });

  describe("getBorderCountryName", () => {
    const mockCountries: Country[] = [
      {
        name: {
          common: "United States",
          official: "United States of America",
          nativeName: {},
        },
        cca3: "USA",
        tld: [".us"],
        cca2: "US",
        ccn3: "840",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+1", suffixes: [] },
        capital: ["Washington, D.C."],
        altSpellings: ["US", "USA", "United States of America"],
        region: "Americas",
        subregion: "North America",
        languages: {},
        latlng: [38, -97],
        landlocked: false,
        area: 9833517,
        demonyms: {},
        translations: {},
        flag: "🇺🇸",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 329484123,
        car: { signs: ["USA"], side: "right" },
        timezones: ["UTC-12:00"],
        continents: ["North America"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [38.89, -77.05] },
        postalCode: { format: "#####-####", regex: "^\\d{5}(-\\d{4})?$" },
      },
      {
        name: {
          common: "Mexico",
          official: "United Mexican States",
          nativeName: {},
        },
        cca3: "MEX",
        tld: [".mx"],
        cca2: "MX",
        ccn3: "484",
        independent: true,
        status: "officially-assigned",
        unMember: true,
        currencies: {},
        idd: { root: "+5", suffixes: ["2"] },
        capital: ["Mexico City"],
        altSpellings: ["MX", "Mexicanos", "United Mexican States"],
        region: "Americas",
        subregion: "North America",
        languages: {},
        latlng: [23, -102],
        landlocked: false,
        area: 1964375,
        demonyms: {},
        translations: {},
        flag: "🇲🇽",
        maps: { googleMaps: "", openStreetMaps: "" },
        population: 128932753,
        car: { signs: ["MEX"], side: "right" },
        timezones: ["UTC-08:00"],
        continents: ["North America"],
        flags: { png: "", svg: "", alt: "" },
        coatOfArms: {},
        startOfWeek: "monday",
        capitalInfo: { latlng: [19.43, -99.13] },
        postalCode: { format: "#####", regex: "^(\\d{5})$" },
      },
    ] as Country[];

    it("should return country name when found", () => {
      expect(getBorderCountryName("USA", mockCountries)).toBe("United States");
    });

    it("should return code when country is not found", () => {
      expect(getBorderCountryName("CAN", mockCountries)).toBe("CAN");
    });

    it("should return code when no countries are provided", () => {
      expect(getBorderCountryName("USA")).toBe("USA");
    });
  });
});
