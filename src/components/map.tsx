import { useRef, useState } from 'react';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import ReactMapGL, { Marker, Popup, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// import { SearchBox } from "./searchBox";
import { useLocalState } from './../utils/useLocalState';

interface IProps {
  setDataBounds: (bounds: string) => void;
}

const Map = ({ setDataBounds }: IProps) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useLocalState<ViewState>('viewport', {
    latitude: 47.01,
    longitude: 28.86,
    zoom: 10
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
      ></ReactMapGL>
    </div>
  );
};

export default Map;
