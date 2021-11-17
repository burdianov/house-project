import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { createSignature } from './../../../src/utils/createSignature';

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
    const { signature, timestamp } = await createSignature();

    return res.status(200).json({ signature, timestamp });
  } catch (err) {
    return res.status(500).json({ msg: 'server error' });
  }
});

export default handler;
