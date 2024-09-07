// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LinksTable } from "@/components/LinksTable";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.ts";
import {useNavigate} from "react-router-dom";
import CreateLinkInputForm from "../CreateLinkInputForm.tsx";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserSession() {
            const { data: {session}} = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        }

        getUserSession();
    }, []);
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar user={user}/>
            <div className="flex flex-col">
                <Header userid={user.id} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">Links</h1>
                        <CreateLinkInputForm user={user} />
                    </div>
                    <LinksTable user={user}/>
                </main>
            </div>
        </div>
    );
}
