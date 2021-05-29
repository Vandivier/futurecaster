import { supabase } from '@lib/init-supabase';
import { NextApiRequest, NextApiResponse } from 'next';

import isAllowedMethod from '../../utils/is-allowed-method';

const METHODS = ['GET'];

// TODO: maybe need config/options?
const getSignup = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
        const { email } = req.body;
        const { error } = await supabase.auth.signIn({ email });
        if (error) throw error;
        // otherwise intentionally void; client is now authorized.
        console.log('auth sucess - delete this message after confirming plz...');
        res.json({ successMsg: 'auth sucess - delete this message after confirming plz...' });
    } catch (error) {
        const message = 'An unexpected error ocurred';
        console.error({ error, message });
        res.status(500).json({ data: null, errors: [{ message }] });
    }
};

// TODO: maybe make this a hook
export default getSignup;
