import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { getBoundsOfDistance } from 'geolib';
import { GeolibInputCoordinates } from 'geolib/es/types';

import prisma from '../../../../src/prisma';
import { HouseType } from './../../../houses/[id]/index';

const ncOptions = {
  onError(err, _: NextApiRequest, res: NextApiResponse) {
    console.error(err);
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.json({ message: err.message });
  }
};

const handler = nc(ncOptions);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query?.id as string;

    if (id) {
      const house = await prisma.house.findFirst({
        where: { id: parseInt(id, 10) }
      });

      const bounds = getBoundsOfDistance(
        {
          latitude: house?.latitude,
          longitude: house?.longitude
        } as GeolibInputCoordinates,
        10000
      );

      const nearby = await prisma.house.findMany({
        where: {
          latitude: { gte: bounds[0].latitude, lte: bounds[1].latitude },
          longitude: { gte: bounds[0].longitude, lte: bounds[1].longitude },
          id: { not: { equals: house?.id } }
        },
        take: 25
      });

      return res.status(200).json({ house, nearby });
    }
    return res.status(404).json({ msg: 'Not found' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default handler;
