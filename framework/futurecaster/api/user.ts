import { supabase } from '@lib/init-supabase';
import { NextApiRequest, NextApiResponse } from 'next';

import isAllowedMethod from '../../utils/is-allowed-method';

const METHODS = ['GET'];

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
        const user = await supabase.auth.api.getUserByCookie(req); // TODO: get name from other table
        res.json(user);
    } catch (error) {
        const message = 'An unexpected error ocurred';
        console.error({ error, message });
        res.status(500).json({ data: null, errors: [{ message }] });
    }
};

export default getUser;
