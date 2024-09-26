import {FormEvent, useState} from "react";
import {supabase} from "../../supabase.ts";

async function signUpWithEmailPassword(email: string, password: string) {
    const dashboardURL = import.meta.env.VITE_BASE_URL + '/dashboard';
    const {error} = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: dashboardURL,
        }
    });
    if (error) {
        console.error('Error signing in:', error.message);
    }
}

export default function EmailPasswordSignUpForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signUpWithEmailPassword(email, password);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label className="font-medium">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <div>
                <label className="font-medium">
                    Password
                </label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
            <button
                className="w-full px-4 py-2 text-white font-medium bg-primary hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
                Sign up
            </button>
        </form>
    )


}