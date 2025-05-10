'use client';

import { useParams } from 'next/navigation';

export default function CountryPage() {
  const params = useParams();
  const countryCode = params.code;

  // TODO: Fetch country data using the countryCode
  // TODO: Display country details

  return (
    <div>
      <h1>Country Details</h1>
      <p>Country Code: {countryCode}</p>
    </div>
  );
} 