import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SVGProps, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { LinkIcon } from '@/components/Icons';
import { supabase } from '../../supabase';
interface user{
    id: string
}

export default function LoginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<user>(null); // Initialize user state correctly
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is already logged in
        async function checkUser() {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error.message);
                setLoading(false);
                return;
            }

            if (session?.user) {
                // If user is logged in, redirect to dashboard
                setUser(session.user);
                navigate('/dashboard'); // No need for user ID in URL
            }

            setLoading(false);
        }

        checkUser();
    }, [navigate]);

    async function signInWithGithub() {
        const redirectUrl = import.meta.env.VITE_BASE_URL + '/dashboard';
        //const redirectUrl = import.meta.env.VITE_CALLBACK_URL;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: redirectUrl,
            },
        });

        if (error) {
            console.error('Error during GitHub login:', error.message); // Log any errors
        }
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null); // Clear user state after sign-out
            navigate('/login'); // Optionally redirect to login page
        } else {
            console.error('Error during sign out:', error.message);
        }
    }

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-6 text-center">
                <div className="flex justify-center">
                    <LinkIcon className="h-12 w-12"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Or{" "}
                        <Link to="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
                            create a new account
                        </Link>
                    </p>
                </div>
                <Card className="pt-6">
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" className="flex items-center justify-center gap-2">
                                <ChromeIcon className="h-5 w-5"/>
                                Sign in with Google
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center gap-2"
                                    onClick={signInWithGithub}>
                                <GitlabIcon className="h-5 w-5"/>
                                Sign in with GitHub
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <button onClick={signOut}>Sign out</button>
            </div>
        </div>
    );
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="21.17" x2="12" y1="8" y2="8"/>
            <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
            <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
        </svg>
    );
}

function GitlabIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z"/>
        </svg>
    );
}
