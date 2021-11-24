import { useDebounce } from 'use-debounce';

import Layout from '../src/components/layout';
import Map from './../src/components/map';
import { useLocalState } from './../src/utils/useLocalState';

type BoundsArray = [[number, number], [number, number]];

export default function Home() {
  const [dataBounds, setDataBounds] = useLocalState<string>(
    'bounds',
    '[[0, 0], [0, 0]]'
  );
  const [debouncedDataBounds] = useDebounce(dataBounds, 200);

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/2 pb-4 screen-max-height-full-less-nav">
          HouseList
        </div>
        <div className="w-1/2">
          <Map setDataBounds={setDataBounds} />
        </div>
      </div>
    </Layout>
  );
}
