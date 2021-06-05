// import fetchJson from '../../lib/fetchJson'
// import withSession from '../../lib/session'

import { supabase } from '@lib/init-supabase';
import { NextApiRequest, NextApiResponse } from 'next';

import isAllowedMethod from '../../utils/is-allowed-method';

const METHODS = ['POST'];

export const getSignin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
        const { email, password } = req.body;

        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) throw error;
        // otherwise intentionally void; client is now authorized.
        res.json({ email, password, user, session, error });
    } catch (error) {
        const message = 'An unexpected error ocurred';
        console.error({ error, message });
        res.status(500).json({ data: null, errors: [{ message }] });
    }
};
