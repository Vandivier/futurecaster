import { validate } from 'email-validator';
import { FC, useCallback, useEffect, useState } from 'react';

import { Button, Input, Logo } from '@components/ui';
import useLogin from '@framework/auth/use-login';
import { useUI } from '@components/ui/context';
import { supabase } from '@lib/init-supabase';
import { Auth } from '@supabase/ui';

interface Props {}

const LoginView: FC<Props> = () => {
    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [dirty, setDirty] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { setModalView, closeModal } = useUI();

    // const login = useLogin();

    const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (!dirty && !disabled) {
            setDirty(true);
            handleValidation();
        }

        try {
            setLoading(true);
            setMessage('');
            await login({
                email,
                password,
            });
            setLoading(false);
            closeModal();
        } catch ({ errors }) {
            setMessage(errors[0].message);
            setLoading(false);
        }
    };

    const handleValidation = useCallback(() => {
        // Test for Alphanumeric password
        const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);

        // Unable to send form unless fields are valid.
        if (dirty) {
            setDisabled(!validate(email) || password.length < 7 || !validPassword);
        }
    }, [email, password, dirty]);

    useEffect(() => {
        handleValidation();
    }, [handleValidation]);

    console.log({ supabase });

    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Auth providers={['github']} supabaseClient={supabase} />
            {/* <Auth providers={['github', 'google', 'twitter']} supabaseClient={supabase} /> */}
        </Auth.UserContextProvider>

        // <form onSubmit={handleLogin} className="w-80 flex flex-col justify-between p-3">
        //     <div className="flex justify-center pb-12 ">
        //         <Logo width="64px" height="64px" />
        //     </div>
        //     <div className="flex flex-col space-y-3">
        //         {message && (
        //             <div className="text-red border border-red p-3">
        //                 {message}. Did you {` `}
        //                 <a
        //                     className="text-accent-9 inline font-bold hover:underline cursor-pointer"
        //                     onClick={() => setModalView('FORGOT_VIEW')}
        //                 >
        //                     forgot your password?
        //                 </a>
        //             </div>
        //         )}
        //         <Input type="email" placeholder="Email" onChange={setEmail} />
        //         <Input type="password" placeholder="Password" onChange={setPassword} />

        //         <Button variant="slim" type="submit" loading={loading} disabled={disabled}>
        //             Log In
        //         </Button>
        //         <div className="pt-1 text-center text-sm">
        //             <span className="text-accents-7">Don't have an account?</span>
        //             {` `}
        //             <a className="text-accent-9 font-bold hover:underline cursor-pointer" onClick={() => setModalView('SIGNUP_VIEW')}>
        //                 Sign Up
        //             </a>
        //         </div>
        //     </div>
        // </form>
    );
};

export default LoginView;
