import { Session } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

import { NextIronHandler, withSession } from '../../utils/with-session';

const handler: NextIronHandler = async (req, res) => {
    const prisma = new PrismaClient();
    const supabaseSession: Session | undefined = req?.session?.get('supabase');
    const user = supabaseSession?.user;

    if (supabaseSession && user) {
        const { aud, id, role, user_metadata } = user;
        const appUser = await prisma.appUser.findUnique({ where: { fkAuthId: id } });
        const username = appUser?.username;

        req.session.set('appUser', { ...appUser });
        // TODO: if user isn't found, make them fill out more signup stuff they are like a partial sign up
        // or, we could just let them have these options empty in profile/settings page
        // ya, tbh we don't need to know these deets unless and when they are buying - could be scoped to store(s)

        res.json({
            isFoundInSupabase: !!appUser,
            isLoggedIn: true,
            isLoggedInToSupabase: aud,
            username,
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
