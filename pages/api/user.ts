import { NextApiRequest, NextApiResponse } from 'next';
import getUser from '../../framework/futurecaster/api/user';

export default (req: NextApiRequest, res: NextApiResponse) => getUser(req, res);
