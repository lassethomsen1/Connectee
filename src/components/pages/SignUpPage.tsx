/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Nk4rRKyJtdb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {GoogleIcon, GithubIcon} from "../Icons.tsx";
import {LinkIcon} from "@/components/Icons"
import {supabase} from "../../supabase.ts";
import EmailPasswordSignUpForm from "../signUpComponents/emailPasswordSignUpForm.tsx";
const dashboardURL = import.meta.env.VITE_BASE_URL + '/dashboard';

// burde nok være i en fil for sig selv
async function signInWithGithub() {
    const {error} = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: dashboardURL,
            scopes: 'read:user',
        },
    });

    if (error) {
        console.error('Error during GitHub login:', error.message); // Log any errors
    }

}
export default function SignUpPage() {

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="text-center">
                    <LinkIcon className="mx-auto w-64 h-16"/>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                        <p> Already have an account? <a href="/login" className="font-medium text-primary hover:text-indigo-500">Login</a>
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                    <div className="grid grid-cols-3 gap-x-3">
                        <button
                            className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <GoogleIcon/>
                        </button>
                        {/* Twitter TODO LAV OM TIL FKN INSTAGRAM ELLER SÅDAN NOGET */}
                        <button
                            className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937"
                                    fill="#1DA1F2"/>
                            </svg>
                        </button>
                        <button
                            className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100"
                            onClick={signInWithGithub}>
                            <GithubIcon/>
                        </button>
                    </div>
                    {/*<div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
                            Or continue with</p>
                    </div>}
                    {/* <EmailPasswordSignUpForm/> */}
                </div>
            </div>
        </main>
    )
}
/*
export default function SignUpPage() {
    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md space-y-6 text-center">
                <div className="flex justify-center">
                    <LinkIcon className="h-12 w-12"/>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a new account</h1>
                    <p className="mt-2 text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:underline" prefetch={false}>
                            Sign in
                        </Link>
                    </p>
                </div>
                <Card className={"pt-6"}>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" className="flex items-center justify-center gap-2">
                                <ChromeIcon className="h-5 w-5" />
                                Sign up with Google
                            </Button>
                            <Button variant="outline" className="flex items-center justify-center gap-2"
                                    onClick={signInWithGithub}>
                                <GithubIcon className="h-5 w-5" />
                                Sign up with GitHub
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function ChromeIcon(props) {
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
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" x2="12" y1="8" y2="8" />
            <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
            <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    )
}
*/