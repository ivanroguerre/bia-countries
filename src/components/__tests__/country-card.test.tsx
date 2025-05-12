import { render, screen } from "@testing-library/react";

import type { Country } from "@/types/country";
import { CountryCard } from "@/components/country-card";

const mockCountry: Country = {
  name: {
    common: "Estonia",
    official: "Republic of Estonia",
    nativeName: {
      est: {
        official: "Eesti Vabariik",
        common: "Eesti",
      },
    },
  },
  tld: [".ee"],
  cca2: "EE",
  ccn3: "233",
  independent: true,
  status: "officially-assigned",
  unMember: true,
  currencies: {
    EUR: {
      name: "Euro",
      symbol: "€",
    },
  },
  idd: {
    root: "+3",
    suffixes: ["72"],
  },
  capital: ["Tallinn"],
  altSpellings: ["EE", "Eesti", "Republic of Estonia"],
  region: "Europe",
  subregion: "Northern Europe",
  languages: {
    est: "Estonian",
  },
  latlng: [59, 26],
  landlocked: false,
  borders: ["LVA", "RUS"],
  area: 45227,
  demonyms: {
    eng: {
      f: "Estonian",
      m: "Estonian",
    },
  },
  cca3: "EST",
  translations: {},
  flag: "🇪🇪",
  maps: {
    googleMaps: "https://goo.gl/maps/6SsynwGUodL1sDvq8",
    openStreetMaps: "https://www.openstreetmap.org/relation/79510",
  },
  population: 1331057,
  car: {
    signs: ["EST"],
    side: "right",
  },
  timezones: ["UTC+02:00"],
  continents: ["Europe"],
  flags: {
    png: "https://flagcdn.com/w320/ee.png",
    svg: "https://flagcdn.com/ee.svg",
    alt: "The flag of Estonia is composed of three equal horizontal bands of blue, black and white.",
  },
  coatOfArms: {},
  startOfWeek: "monday",
  capitalInfo: {
    latlng: [59.43, 24.72],
  },
  postalCode: {
    format: "#####",
    regex: "^(\\d{5})$",
  },
};

describe("CountryCard", () => {
  it("renders country information correctly", () => {
    render(<CountryCard country={mockCountry} />);

    // Check if country name is rendered
    expect(screen.getByText("Estonia")).toBeInTheDocument();

    // Check if population is formatted and rendered
    const populationElement = screen.getByText((content, element) => {
      return element?.textContent === "Population: 1,331,057";
    });
    expect(populationElement).toBeInTheDocument();

    // Check if region is rendered
    const regionElement = screen.getByText((content, element) => {
      return element?.textContent === "Region: Europe";
    });
    expect(regionElement).toBeInTheDocument();

    // Check if capital is rendered
    const capitalElement = screen.getByText((content, element) => {
      return element?.textContent === "Capital: Tallinn";
    });
    expect(capitalElement).toBeInTheDocument();
  });

  it("renders flag image with correct attributes", () => {
    render(<CountryCard country={mockCountry} />);

    const flagImage = screen.getByRole("img");
    expect(flagImage).toHaveAttribute("src", mockCountry.flags.svg);
    expect(flagImage).toHaveAttribute("alt", mockCountry.flags.alt);
  });

  it("handles missing country data gracefully", () => {
    const incompleteCountry: Country = {
      ...mockCountry,
      name: {
        common: "",
        official: "",
        nativeName: {},
      },
      population: 0,
      region: "",
      capital: [],
      flags: {
        png: "",
        svg: "",
      },
    };

    render(<CountryCard country={incompleteCountry} />);

    // Check if fallback text is shown for missing data
    expect(screen.getByText("Unknown Country")).toBeInTheDocument();

    const populationElement = screen.getByText((content, element) => {
      return element?.textContent === "Population: 0";
    });
    expect(populationElement).toBeInTheDocument();

    const regionElement = screen.getByText((content, element) => {
      return element?.textContent === "Region: N/A";
    });
    expect(regionElement).toBeInTheDocument();

    const capitalElement = screen.getByText((content, element) => {
      return element?.textContent === "Capital: N/A";
    });
    expect(capitalElement).toBeInTheDocument();
  });

  it("handles non-number population value", () => {
    const countryWithInvalidPopulation: Country = {
      ...mockCountry,
      population: "unknown" as unknown as number,
    };

    render(<CountryCard country={countryWithInvalidPopulation} />);

    const populationElement = screen.getByText((content, element) => {
      return element?.textContent === "Population: N/A";
    });
    expect(populationElement).toBeInTheDocument();
  });

  it("handles undefined population value", () => {
    const countryWithUndefinedPopulation: Country = {
      ...mockCountry,
      population: undefined as unknown as number,
    };

    render(<CountryCard country={countryWithUndefinedPopulation} />);

    const populationElement = screen.getByText((content, element) => {
      return element?.textContent === "Population: N/A";
    });
    expect(populationElement).toBeInTheDocument();
  });

  it("uses country name as fallback for flag alt text", () => {
    const countryWithoutAltText: Country = {
      ...mockCountry,
      flags: {
        ...mockCountry.flags,
        alt: undefined,
      },
    };

    render(<CountryCard country={countryWithoutAltText} />);

    const flagImage = screen.getByRole("img");
    expect(flagImage).toHaveAttribute(
      "alt",
      `Flag of ${mockCountry.name.common}`
    );
  });

  it("uses 'Unknown Country' as fallback when both alt text and country name are missing", () => {
    const countryWithoutNameOrAltText: Country = {
      ...mockCountry,
      name: {
        common: "",
        official: "",
        nativeName: {},
      },
      flags: {
        ...mockCountry.flags,
        alt: undefined,
      },
    };

    render(<CountryCard country={countryWithoutNameOrAltText} />);

    const flagImage = screen.getByRole("img");
    expect(flagImage).toHaveAttribute("alt", "Flag of Unknown Country");
  });

  it("handles undefined capital", () => {
    const countryWithUndefinedCapital: Country = {
      ...mockCountry,
      capital: undefined as unknown as string[],
    };

    render(<CountryCard country={countryWithUndefinedCapital} />);

    const capitalElement = screen.getByText((content, element) => {
      return element?.textContent === "Capital: N/A";
    });
    expect(capitalElement).toBeInTheDocument();
  });

  it("handles null capital", () => {
    const countryWithNullCapital: Country = {
      ...mockCountry,
      capital: null as unknown as string[],
    };

    render(<CountryCard country={countryWithNullCapital} />);

    const capitalElement = screen.getByText((content, element) => {
      return element?.textContent === "Capital: N/A";
    });
    expect(capitalElement).toBeInTheDocument();
  });

  it("does not render flag when svg is missing", () => {
    const countryWithoutFlag: Country = {
      ...mockCountry,
      flags: {
        ...mockCountry.flags,
        svg: "" as string,
      },
    };

    render(<CountryCard country={countryWithoutFlag} />);

    const flagImage = screen.queryByRole("img");
    expect(flagImage).not.toBeInTheDocument();
  });

  it("handles undefined flags object", () => {
    const countryWithoutFlags: Country = {
      ...mockCountry,
      flags: undefined as unknown as Country["flags"],
    };

    render(<CountryCard country={countryWithoutFlags} />);

    const flagImage = screen.queryByRole("img");
    expect(flagImage).not.toBeInTheDocument();
  });

  it("handles null flags object", () => {
    const countryWithNullFlags: Country = {
      ...mockCountry,
      flags: null as unknown as Country["flags"],
    };

    render(<CountryCard country={countryWithNullFlags} />);

    const flagImage = screen.queryByRole("img");
    expect(flagImage).not.toBeInTheDocument();
  });

  it("handles undefined name object", () => {
    const countryWithoutName: Country = {
      ...mockCountry,
      name: undefined as unknown as Country["name"],
    };

    render(<CountryCard country={countryWithoutName} />);

    expect(screen.getByText("Unknown Country")).toBeInTheDocument();
  });

  it("handles null name object", () => {
    const countryWithNullName: Country = {
      ...mockCountry,
      name: null as unknown as Country["name"],
    };

    render(<CountryCard country={countryWithNullName} />);

    expect(screen.getByText("Unknown Country")).toBeInTheDocument();
  });

  it("renders CardTitle with fallback title when name is missing", () => {
    const countryWithoutName: Country = {
      ...mockCountry,
      name: {
        common: "",
        official: "",
        nativeName: {},
      },
    };

    const { container } = render(<CountryCard country={countryWithoutName} />);
    const cardTitle = container.querySelector('[data-slot="card-title"]');

    // Check that the CardTitle has the fallback title attribute
    expect(cardTitle).toHaveAttribute("title", "Unknown Country");
  });
});
