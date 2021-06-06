import { supabase } from '@lib/init-supabase';
import { Session } from '@supabase/supabase-js';

import { NextIronHandler, withSession } from '../../utils/with-session';

const handler: NextIronHandler = async (req, res) => {
    const supabaseSession: Session | undefined = req?.session?.get('supabase');
    const user = supabaseSession?.user;

    if (supabaseSession && user) {
        const { aud, email, id, role, user_metadata } = user;
        const { access_token } = supabaseSession;

        supabase.auth.setAuth(access_token);

        const { data, error } = await supabase.from('app_users').select().match({ fk_auth_id: id });
        if (error) throw error;

        res.json({
            isLoggedIn: true,
            isLoggedInToSupabase: aud,
            ...{ data, email, id, role, user_metadata },
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
};

export const getUser = withSession(handler);

// import { supabase } from '@lib/init-supabase';
// import { NextApiRequest, NextApiResponse } from 'next';

// import isAllowedMethod from '../../utils/is-allowed-method';

// const METHODS = ['GET'];

// const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
//     if (!isAllowedMethod(req, res, METHODS)) return;

//     try {
//         const user = await supabase.auth.api.getUserByCookie(req); // TODO: get name from other table
//         res.json(user);
//     } catch (error) {
//         const message = 'An unexpected error ocurred';
//         console.error({ error, message });
//         res.status(500).json({ data: null, errors: [{ message }] });
//     }
// };

// export getUser;
