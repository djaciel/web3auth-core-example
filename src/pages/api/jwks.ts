import { NextApiRequest, NextApiResponse } from 'next';
import keys from "./Keys.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const publicKeys = keys.keys.map((element) => {
      return {
        kty: element.kty,
        kid: element.kid,
        use: element.use,
        alg: element.alg,
        e: element.e,
        n: element.n,
      };
    });

    const value = { keys: publicKeys };
    res.status(200).json(value);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
