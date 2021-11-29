import Image from 'next/image';
import Link from 'next/link';

const places = [
  {
    name: 'London',
    image: '/images/london.jpg',
    url: '/location/london-2643743',
  },
  {
    name: 'Paris',
    image: '/images/paris.jpg',
    url: '/location/parista-1694660',
  },
  {
    name: 'New York',
    image: '/images/new-york.jpg',
    url: '/location/new-york-city-5128581',
  },
  {
    name: 'Tokyo',
    image: '/images/tokyo.jpg',
    url: '/location/tokyo-prefecture-1850144',
  },
];

const FamousPlaces = () => {
  return (
    <div className="places">
      <div className="places__row">
        {places.length > 0 &&
          places.map((place, index) => {
            return (
              <div className="places__box" key={index}>
                <Link href={place.url}>
                  <a>
                    <div className="places__image-wrapper">
                      <Image
                        src={place.image}
                        alt={place.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <span>{place.name}</span>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FamousPlaces;
