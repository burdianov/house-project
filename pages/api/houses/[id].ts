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

const handler = nc(ncOptions);

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query?.id as string;

    if (id) {
      const house = await prisma.house.findFirst({
        where: { id: parseInt(id, 10) }
      });

      return res.status(200).json(house);
    }
    return res.status(404).json({ msg: 'Not found' });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

export default handler;
