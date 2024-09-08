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
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserSession() {
            const { data: { session }} = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        }

        getUserSession(); // Only fetch user session here
    }, []); // Empty dependency array, runs only once when the component mounts

    useEffect(() => {
        async function fetchLinks() {
            if (user?.id) { // Check if user.id is available
                const { data, error } = await supabase
                    .from("url")
                    .select("*")
                    .eq("user_id", user.id);

                if (error) {
                    console.error("Error fetching links:", error.message);
                    return;
                } else {
                    setLinks(data);
                }
            }
        }

        fetchLinks(); // Fetch links once user.id is available
    }, [user]); // Depend on `user`, run this effect whenever `user` changes


    useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleNewLink = async (newLink) => {
        setLinks([...links, newLink]);
    }

    const handleDeleteLink = (deletedId: number) => {
        setLinks((prevLinks) => prevLinks.filter(link => link.id !== deletedId));
    };
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar user={user}/>
            <div className="flex flex-col">
                <Header userid={user.id} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">Links</h1>
                        <CreateLinkInputForm onNewLink={handleNewLink} user_id={user.id} />
                    </div>
                    <LinksTable onDelete={handleDeleteLink} links={links}/>
                </main>
            </div>
        </div>
    );
}
