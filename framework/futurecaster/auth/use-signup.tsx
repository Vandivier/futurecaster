import { supabase } from '@lib/init-supabase';
import { NextApiRequest, NextApiResponse } from 'next';

import isAllowedMethod from '../../utils/is-allowed-method';

const METHODS = ['POST'];

// TODO: maybe make this a hook
// TODO: maybe need config/options?
export const getSignup = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
        const { email, password } = req.body;

        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        // otherwise intentionally void; client is now authorized.
        res.json({ email, password });
    } catch (error) {
        const message = 'An unexpected error ocurred';
        console.error({ error, message });
        res.status(500).json({ data: null, errors: [{ message }] });
    }
};
