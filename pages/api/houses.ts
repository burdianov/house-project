import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const ncOptions = {
  onError(err, _: NextApiRequest, res: NextApiResponse) {
    console.error(err);
    res.statusCode =
      err.status && err.status >= 100 && err.status < 600 ? err.status : 500;
    res.json({ message: err.message });
  }
};

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = nc(ncOptions);

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(200).json({ name: 'Volodea' });
  } catch (err) {
    return res.status(500).json({ msg: 'server error' });
  }
});

export default handler;
