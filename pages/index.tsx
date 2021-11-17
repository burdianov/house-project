import { useState, useEffect } from 'react';

import Layout from '../src/components/layout';
import Map from './../src/components/map';
import useAxios from '../hooks/useAxios';

export default function Home() {
  const [houses, setHouses] = useState();

  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/api/houses'
  });

  useEffect(() => {
    if (response) {
      setHouses(response);
    }
  }, [response]);

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/2 pb-4 screen-max-height-full-less-nav">
          HouseList
          {loading ? (
            'Loading...'
          ) : (
            <pre>{JSON.stringify(houses, null, 2)}</pre>
          )}
        </div>
        <div className="w-1/2">
          <Map />
        </div>
      </div>
    </Layout>
  );
}
