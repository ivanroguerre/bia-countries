import Image from "next/image";
import { Country } from "@/types/country";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const formattedPopulation = 
    typeof country.population === 'number'
      ? country.population.toLocaleString()
      : 'N/A';

  return (
    <Card className="shadow-(--card-shadow) rounded-sm overflow-hidden p-0 gap-0 border-0 dark:bg-dark-blue">
      <CardHeader className="p-0">
        {country.flags?.svg && (
          <AspectRatio ratio={11 / 7} className="w-full">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name?.common || 'Unknown Country'}`}
              fill
              className="object-cover"
            />
          </AspectRatio>
        )}
      </CardHeader>
      <CardContent className="p-6 pb-12">
        <CardTitle
          className="text-md font-bold mb-4 truncate"
          title={country.name?.common || 'Unknown Country'}
        >
          {country.name?.common || 'Unknown Country'}
        </CardTitle>
        <div className="space-y-2 text-[14px] text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-semibold">Population:</span>{" "}
            {formattedPopulation}
          </p>
          <p>
            <span className="font-semibold">Region:</span>{" "}
            {country.region || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital && country.capital.length > 0
              ? country.capital[0]
              : "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
