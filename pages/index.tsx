// import { useState } from "react";
// import { useQuery, gql } from "@apollo/client";
// import { useDebounce } from "use-debounce";
// import HouseList from "src/components/houseList";
// import { useLastData } from "src/utils/useLastData";
// import { useLocalState } from "src/utils/useLocalState";
// import { HousesQuery, HousesQueryVariables } from "src/generated/HousesQuery";
import Layout from '../src/components/layout';
import Map from './../src/components/map';

export default function Home() {
  return (
    <Layout>
      <div className="flex">
        <div className="w-1/2 pb-4 screen-max-height-full-less-nav">
          HouseList
        </div>
        <div className="w-1/2">
          <Map />
        </div>
      </div>
    </Layout>
  );
}
