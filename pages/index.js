import Head from 'next/head';
import FamousPlaces from '../components/FamousPlaces';
import SearchBox from '../components/SearchBox';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className="home">
        <div className="container">
          <SearchBox placeholder="search" />

          <FamousPlaces />
        </div>
      </main>
    </div>
  );
}
