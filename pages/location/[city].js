import Head from 'next/head';
import Link from 'next/link';
import cities from '../../lib/city.list.json';
import moment from 'moment-timezone';
import TodaysWeather from '../../components/TodaysWeather';
import HourlyWeather from '../../components/HourlyWeather';
import WeeklyWeather from '../../components/WeeklyWeather';
import SearchBox from '../../components/SearchBox';

const City = ({
  city,
  timezone,
  hourlyWeather,
  currentWeather,
  dailyWeather,
}) => {
  return (
    <div>
      <Head>
        <title>{city.name} Weather</title>
      </Head>

      <main className="page-wrapper">
        <div className="container">
          <Link href="/">
            <a className="back-link">&larr; Home</a>
          </Link>

          <SearchBox placeholder="search for another place" />

          <TodaysWeather
            city={city}
            timezone={timezone}
            weather={dailyWeather[0]}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </main>
    </div>
  );
};

export default City;

const getCity = (param) => {
  const cityParam = param.trim();
  // get the id the city
  const splitCity = cityParam.split('-');
  const cityId = splitCity[splitCity.length - 1];

  if (!cityId) {
    return null;
  }

  const city = cities.find((c) => c.id.toString() === cityId);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf('day').valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

export async function getServerSideProps(ctx) {
  const city = getCity(ctx.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
  );
  const data = await res.json();

  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  if (!data) {
    return {
      notFound: true,
    };
  }

  const slug = ctx.params.city;

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: hourlyWeather,
    },
  };
}
