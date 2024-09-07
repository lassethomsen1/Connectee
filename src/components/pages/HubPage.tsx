import background from "../../assets/background.jpg";
import Title from "../Title.tsx";
import Link from "../Link.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.ts";

interface link {
    id: number;
    handle: string;
    url: string;
    img_url: string;
}
interface settings {
    title: string;
    bg_url: string;
}

export default function HubPage() {
    const {userid} = useParams();
    const [links, setLinks] = useState<link[]>([]);
    const [settings, setSettings] = useState<settings | null>(null);

    useEffect(() => {
        async function fetchLinks() {
            const {data, error} = await supabase
                .from("url")
                .select("*")
                .eq("user_id", userid);
            
            if (error) {
                console.error("Error fetching links:", error.message);
                return;
            }
            setLinks(data);
        }
        fetchLinks();
        
    }, [userid]);

    useEffect(() => {
        async function fetchSettings() {
            const {data, error} = await supabase
                .from("connectpages")
                .select("title, bg_url")
                .eq("user_id", userid)
                .single();

            if (error) {
                console.error("Error fetching settings:", error.message);
                return;
            }
            setSettings(data);
        }
        fetchSettings();
    }, [userid]);

    return (
        <div className={"absolute bg-cover h-screen w-screen"} style={{backgroundImage: `url(${settings?.bg_url})`}}>
            <Title title={settings?.title}></Title>
            <div className={"flex flex-col items-center"}>
                {links.map((link: link) => (
                    <Link key={link.id} handle={link.handle} url={link.url} imgurl={link.img_url} />
                ))}
            </div>
        </div>
    )
}