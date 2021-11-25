/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// import { SearchBox } from "./searchBox";
import { useLocalState } from './../utils/useLocalState';
import { HouseType } from './../../pages/houses/[id]/index';

interface IProps {
  setDataBounds: (bounds: string) => void;
  houses: HouseType[];
  highlightedId: number | null;
}

const Map = ({ setDataBounds, houses, highlightedId }: IProps) => {
  const [selected, setSelected] = useState<HouseType | null>(null);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useLocalState<ViewState>('viewport', {
    latitude: 47.03,
    longitude: 28.83,
    zoom: 12
  });

  return (
    <div className="text-black relative">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        ref={mapRef}
        minZoom={5}
        maxZoom={15}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
        onInteractionStateChange={(extra) => {
          if (!extra.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
      >
        {houses.map((house) => (
          <Marker
            key={house.id}
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-15}
            offsetTop={-15}
            className={highlightedId === house.id ? 'marker-active' : ''}
          >
            <button
              className="w-[30px] h-[30px] text-[30px]"
              type="button"
              onClick={() => setSelected(house)}
            >
              <img
                src={
                  highlightedId === house.id
                    ? '/home-color.svg'
                    : '/home-solid.svg'
                }
                alt="house"
                className="w-8"
              />
            </button>
          </Marker>
        ))}
        {selected && (
          <Popup
            latitude={selected.latitude}
            longitude={selected.longitude}
            onClose={() => setSelected(null)}
            closeOnClick={false}
          >
            <div className="text-center">
              <h3 className="px-4">{selected.address.substr(0, 30)}</h3>
              <div className="mx-auto my-2">
                <Image
                  src={selected.image}
                  priority
                  width={200}
                  height={Math.floor((9 / 16) * 200)}
                  layout="responsive"
                  alt={selected.address}
                />
              </div>
              <Link href={`/houses/${selected.id}`}>
                <a>View House</a>
              </Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
