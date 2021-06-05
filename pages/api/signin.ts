import { NextApiRequest, NextApiResponse } from 'next';
import { getSignin } from '../../framework/futurecaster/auth/use-signin';

export default (req: NextApiRequest, res: NextApiResponse) => getSignin(req, res);
