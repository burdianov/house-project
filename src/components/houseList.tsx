import Link from 'next/link';
import Image from 'next/image';

import { HouseType } from './../../pages/houses/[id]/index';

interface IProps {
  houses: HouseType[];
}

export default function HouseList({ houses }: IProps) {
  return (
    <>
      {houses.map((house) => (
        <Link key={house.id} href={`/houses/${house.id}`}>
          <a className="px-6 pt-4 cursor-pointer flex flex-wrap">
            <div className="sm:w-full md:w-1/2">
              <Image
                src={house.image}
                priority
                width={350}
                height={Math.floor((9 / 16) * 350)}
                layout="responsive"
                alt={house.address}
              />
            </div>
            <div className="sm:w-full md:w-1/2 sm:pl-0 md:pl-4">
              <h2 className="text-lg">{house.address}</h2>
              <p>{house.bedrooms} bedroom house</p>
            </div>
          </a>
        </Link>
      ))}
    </>
  );
}
