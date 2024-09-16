import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LinksTable } from "@/components/LinksTable";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase.ts";
import { useNavigate } from "react-router-dom";
import CreateLinkInputForm from "../CreateLinkInputForm.tsx";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserSession() {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (error || !session?.user) {
                navigate("/login"); // Redirect to login if no session is found
            } else {
                setUser(session.user); // Set user from the session
            }
            setLoading(false); // Mark loading as false whether the user is found or not
        }

        getUserSession(); // Fetch user session when the component mounts
    }, [navigate]); // Only runs once when the component mounts

    useEffect(() => {
        async function fetchLinks() {
            if (user?.id) {
                const { data, error } = await supabase
                    .from("url")
                    .select("*")
                    .eq("user_id", user.id);

                if (error) {
                    console.error("Error fetching links:", error.message);
                } else {
                    setLinks(data);
                }
            }
        }

        fetchLinks(); // Fetch links whenever the `user` is updated
    }, [user]); // Runs whenever the user state changes

    const handleNewLink = async (newLink) => {
        setLinks([...links, newLink]);
    };

    const handleDeleteLink = (deletedId: number) => {
        setLinks((prevLinks) => prevLinks.filter(link => link.id !== deletedId));
    };

    const handleEditLink = (updatedLink) => {
        if (!updatedLink || !updatedLink.id) {
            console.error("Invalid updated link data:", updatedLink);
            return;
        }

        setLinks((prevLinks) =>
            prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link))
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar user={user} />
            <div className="flex flex-col">
                <Header userid={user.id} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">Links</h1>
                        <CreateLinkInputForm onNewLink={handleNewLink} user_id={user.id} />
                    </div>
                    <LinksTable onDelete={handleDeleteLink} onEdit={handleEditLink} links={links} />
                </main>
            </div>
        </div>
    );
}
