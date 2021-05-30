import { NextApiRequest, NextApiResponse } from 'next';
import { getSignup } from '../../framework/futurecaster/auth/use-signup';

export default (req: NextApiRequest, res: NextApiResponse) => getSignup(req, res);
