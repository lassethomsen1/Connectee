import background from "../../assets/background.jpg";
import Title from "../Title.tsx";
import Link from "../Link.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.ts";

interface links {
    id: number;
    handle: string;
    url: string;
    img_url: string;
}

export default function HubPage() {
    const {userid} = useParams();
    const [links, setLinks] = useState<any[]>([]);

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

    return (
        <div className={"absolute bg-cover h-screen w-screen"} style={{backgroundImage: `url(${background})`}}>
            <Title></Title>
            <div className={"flex flex-col items-center"}>
                {links.map((link: links) => (
                    <Link key={link.id} handle={link.handle} url={link.url} imgurl={link.img_url} />
                ))}
            </div>
        </div>
    )
}