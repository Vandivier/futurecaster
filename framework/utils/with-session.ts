// ref: https://github.com/vercel/next.js/blob/canary/examples/with-iron-session/lib/session.js
// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { withIronSession } from 'next-iron-session';

export default function withSession(handler: NextApiHandler) {
    return withIronSession(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD || '',
        cookieName: 'with-iron-session',
        cookieOptions: {
            // the next line allows to use the session in non-https environments like
            // Next.js dev mode (http://localhost:3000)
            secure: process.env.NODE_ENV === 'production' ? true : false,
        },
    });
}
