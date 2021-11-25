import { useDebounce } from 'use-debounce';
import axios from 'axios';

import Layout from '../src/components/layout';
import Map from './../src/components/map';
import { useLocalState } from './../src/utils/useLocalState';
import { useEffect, useState } from 'react';
import { HouseType } from './houses/[id]/index';
import { useLastData } from './../src/utils/useLastData';
import HouseList from './../src/components/houseList';

type BoundsArray = [[number, number], [number, number]];

const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0]
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0]
    }
  };
};

export default function Home() {
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [houses, setHouses] = useState<HouseType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [dataBounds, setDataBounds] = useLocalState<string>(
    'bounds',
    '[[0, 0], [0, 0]]'
  );
  const [debouncedDataBounds] = useDebounce(dataBounds, 200);
  const lastData = useLastData(houses);

  useEffect(() => {
    const getHouse = async () => {
      setLoading(true);
      const response = await axios.get(`/api/houses`, {
        params: { bounds: parseBounds(debouncedDataBounds) }
      });
      if (!response.data.houses) {
        setError(true);
        setLoading(false);
      } else {
        setHouses(response.data.houses);
        setLoading(false);
      }
    };
    getHouse();
  }, [debouncedDataBounds]);

  if (error) {
    return (
      <Layout>
        <div>Error loading houses</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/2 pb-4 screen-max-height-full-less-nav">
          <HouseList
            houses={lastData || []}
            setHighlightedId={setHighlightedId}
          />
        </div>
        <div className="w-1/2">
          <Map
            setDataBounds={setDataBounds}
            houses={lastData || []}
            highlightedId={highlightedId}
          />
        </div>
      </div>
    </Layout>
  );
}
