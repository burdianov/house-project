import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import prisma from '../../../src/prisma';

const ncOptions = {
  onError(err, _: NextApiRequest, res: NextApiResponse) {
    console.error(err);
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.json({ message: err.message });
  }
};

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

const handler = nc(ncOptions);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({ name: 'Volodea' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

interface CoordinatesInput {
  latitude: number;
  longitude: number;
}

interface HouseInput {
  address: string;
  image: string;
  coordinates: CoordinatesInput;
  bedrooms: number;
}

interface House {
  id: number;
  userId: string;
  latitude: number;
  longitude: number;
  address: string;
  image: string;
  publicId: () => string;
  bedrooms: number;
}

async function createHouse(input: HouseInput) {
  return await prisma;
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const image: string = '';
    const parts = image.split('/');
    const result = parts[parts.length - 1];

    const input = req.body.data;

    const house = await prisma.house.create({
      data: {
        userId: input.uid,
        image: input.image,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        bedrooms: parseInt(input.bedrooms, 10)
      }
    });

    return res.status(200).json({ id: house.id });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default handler;
