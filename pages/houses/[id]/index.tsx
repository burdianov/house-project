import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../../src/components/layout';
// import HouseNav from "src/components/houseNav";
// import SingleMap from "src/components/singleMap";

interface HouseType {
  id: number;
  address: string;
  userId: string;
  image: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  // createdAt DateTime @default(now())
  // updatedAt DateTime @updatedAt
}

export default function ShowHouse() {
  const {
    query: { id }
  } = useRouter();
  if (!id) return null;

  return <HouseData id={id as string} />;
}

function HouseData({ id }: { id: string }) {
  const [house, setHouse] = useState<HouseType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getHouse = async () => {
      setLoading(true);
      const response = await axios.get(`/api/houses/${id}`, {
        params: { id }
      });
      setHouse(response.data);
      setLoading(false);
    };
    getHouse();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );

  if (!house)
    return (
      <Layout>
        <div>Unable to load house</div>
      </Layout>
    );
  console.log({ house });
  return (
    <Layout>
      <div className="sm:block md:flex">
        <div className="sm:w-full md:w-1/2 p-4">
          <h1 className="text-3xl my-2">{house.address}</h1>
          <div className="pb-2">
            <Image
              src={house.image}
              priority
              width={900}
              height={Math.floor((9 / 16) * 900)}
              className=""
              layout="responsive"
              alt={house.address}
            />
          </div>
          <p>{house.bedrooms} bedroom houses</p>
        </div>
        <div className="sm:w-full md:w-1/2">SingleMap</div>
      </div>
    </Layout>
  );
}
