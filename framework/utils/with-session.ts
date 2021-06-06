// ref: https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/session.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';

export type NextIronRequest = NextApiRequest & { session: Session };
export type NextIronHandler = (req: NextIronRequest, res: NextApiResponse) => void | Promise<void>;

export const withSession = (handler: NextIronHandler) =>
    withIronSession(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD as string,
        cookieName: 'with-iron-session',
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });
