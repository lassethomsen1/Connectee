/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vaJxj53b4si
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {cn} from "../../lib/utils.ts";
import AnimatedGridPattern from "../magicui/animated-grid-pattern.tsx";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <a href="#" className="flex items-center justify-center">
                    <LinkIcon className="h-6 w-6" />
                    <span className="sr-only">Linktree Alternative</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
                        Features
                    </a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
                        About
                    </a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4" >
                        Contact
                    </a>
                    <a href="/login" className="text-sm font-medium hover:underline underline-offset-4" >
                        Login
                    </a>
                </nav>
            </header>
            <main className="flex-1">
                <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Simplify Your Online Presence
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Create a beautiful, customizable landing page to showcase all your links in one place. No coding
                                        required.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <a
                                        href="/signup"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        Sign Up for Free
                                    </a>
                                </div>
                            </div>
                            <img
                                src="https://placehold.co/550x550"
                                alt="Hero"
                                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                                width="550"
                                height="550"
                            />
                        </div>
                        <AnimatedGridPattern
                            numSquares={30}
                            maxOpacity={0.1}
                            duration={3}
                            repeatDelay={1}
                            className={cn(
                                "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                                "absolute inset-0 -z-10  h-[100%] skew-y-12 ",
                            )}
                        />
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Streamline your online presence with our powerful features.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Customizable Design</h3>
                                    <p className="text-muted-foreground">
                                        Personalize your landing page with your own branding and style.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Link Management</h3>
                                    <p className="text-muted-foreground">Easily add, edit, and reorder all your important links.</p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="grid gap-1">
                                    <h3 className="text-xl font-bold">Analytics</h3>
                                    <p className="text-muted-foreground">Track your link clicks and visitor engagement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Hear from real people who love using Connectee.
                                </p>
                            </div>
                            <div className="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3 mx-auto">
                                <Card className="space-y-4">
                                    <CardHeader>
                                        <CardTitle>Streamlined My Online Presence</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            "Connectee has been a game-changer for me. It's so easy to manage all my links
                                            in one place and customize the look to match my brand."
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">John Doe</p>
                                                <p className="text-xs text-muted-foreground">Influencer</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                                <Card className="space-y-4">
                                    <CardHeader>
                                        <CardTitle>Increased My Link Clicks</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            "I was hesitant to try a new Linktree alternative, but\n this one has been amazing. The analytics
                                            have helped me\n understand what content my audience engages with most."
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                                <AvatarFallback>SM</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">Sarah Miller</p>
                                                <p className="text-xs text-muted-foreground">Small Business Owner</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                                <Card className="space-y-4">
                                    <CardHeader>
                                        <CardTitle>Loved the Simplicity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            "As someone who's not very tech-savvy, I was worried\n about setting up a Linktree alternative.
                                            But this\n platform is so intuitive and easy to use. I was able to\n get my page up and running in
                                            no time."
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                                <AvatarFallback>AM</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">Alex Martinez</p>
                                                <p className="text-xs text-muted-foreground">Artist</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 Connectee All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a href="#" className="text-xs hover:underline underline-offset-4" >
                        Terms of Service
                    </a>
                    <a href="#" className="text-xs hover:underline underline-offset-4" >
                        Privacy
                    </a>
                </nav>
            </footer>
        </div>
    )
}

function LinkIcon(props) {
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
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    )
}