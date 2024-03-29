/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Link from 'next/link';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { HouseType } from './../../pages/houses/[id]/index';
import { ViewState } from 'react-map-gl';

interface IProps {
  house: HouseType;
  nearby: HouseType[] | undefined;
}

export const SingleMap = ({ house, nearby }: IProps) => {
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13
  });

  return (
    <div className="text-black">
      <ReactMapGL
        {...viewport}
        width="100%"
        height="calc(100vh - 64px)"
        onViewportChange={(nextViewport: ViewState) =>
          setViewport(nextViewport)
        }
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        scrollZoom={false}
        minZoom={8}
        mapStyle="mapbox://styles/leighhalliday/ckhjaksxg0x2v19s1ovps41ef"
      >
        <div className="absolute top-0 left-0">
          <NavigationControl showCompass={false} />
        </div>
        <Marker
          latitude={house.latitude}
          longitude={house.longitude}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button type="button" className="w-[30px] h-[30px] text-[30px]">
            <img src="/home-color.svg" className="w-8" alt="selected house" />
          </button>
        </Marker>

        {nearby?.map((near) => (
          <Marker
            key={near.id}
            latitude={near.latitude}
            longitude={near.longitude}
            offsetLeft={-15}
            offsetTop={-15}
          >
            <Link href={`/houses/${near.id}`}>
              <a className="w-[30px] h-[30px] text-[30px]">
                <img src="/home-solid.svg" className="w-8" alt="nearby house" />
              </a>
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};
