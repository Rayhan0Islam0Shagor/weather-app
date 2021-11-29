import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cities from '../lib/city.list.json';

const SearchBox = ({ placeholder }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const clearQuery = () => setQuery('');
    router.events.on('routeChangeComplete', clearQuery);

    return () => router.events.off('routeChangeComplete', clearQuery);
  }, [router]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];
    if (value.length > 1) {
      for (let city of cities) {
        if (matchingCities.length >= 5) break;

        const cityMatch = city.name
          .toLowerCase()
          .startsWith(value.toLowerCase());
        const countryMatch = city?.country
          .toLowerCase()
          .startsWith(value.toLowerCase());
        const stateMatch = city?.state
          .toLowerCase()
          .startsWith(value.toLowerCase());

        if (cityMatch || countryMatch || stateMatch) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`,
          };
          matchingCities.push(cityData);
        }
      }
    }

    setResults(matchingCities);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={query}
        onChange={handleOnChange}
        placeholder={placeholder}
      />

      {query.length > 3 && (
        <ul>
          {results.length > 0 ? (
            results.map((city) => (
              <li className="search__results" key={city.id}>
                <Link href={`/location/${city.slug}`}>
                  <a>
                    {city.name}
                    {city.state ? `, ${city.state}` : ''}
                    {city.country ? `, ${city.country}` : ''}
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
