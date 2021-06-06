import { supabase } from '@lib/init-supabase';

import isAllowedMethod from '../../utils/is-allowed-method';
import { NextIronHandler, withSession } from '../../utils/with-session';

const METHODS = ['POST'];

const handler: NextIronHandler = async (req, res) => {
    let message;

    if (!req.session || !isAllowedMethod(req, res, METHODS)) return;

    try {
        const { email, password } = req.body;
        const { session, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) throw error;
        req.session.set('supabase', { ...session });
        await req.session.save();

        message = 'success';
        res.json({ message });
    } catch (error) {
        message = 'An unexpected error ocurred';
        console.error({ error, message });
        res.status(500).json({ data: null, errors: [{ message }] });
    }
};

export const getSignin = withSession(handler);
