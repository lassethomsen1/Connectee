import ConnectPageLink from "../ConnectPageLink.tsx";
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
    subtitle: string;
}

export default function ConnectPage() {
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
                .select("title, bg_url, subtitle")
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
        <div
            className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] text-white">
            <div className="max-w-md w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-6">
                    <div className="rounded-full w-32 h-32 overflow-hidden">
                        <img src="https://placehold.co/128x128" alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <div className="text-center space-y-1">
                        <h1 className="text-3xl font-bold">{settings?.title}</h1>
                        {settings?.subtitle ? <p className="text-gray-300">{settings.subtitle}</p> : null}
                    </div>
                    <div className="w-full space-y-4">
                        {links.map((link: link) => (
                            <ConnectPageLink key={link.id} handle={link.handle} url={link.url} imgurl={link.img_url}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )


}
/*<div className={"absolute bg-center bg-cover h-screen w-screen"} style={{backgroundImage: `url(${settings?.bg_url})`}}>
            <Title title={settings?.title}></Title>
            <div className={"flex flex-col items-center"}>
                {links.map((link: link) => (
                    <ConnectPageLink key={link.id} handle={link.handle} url={link.url} imgurl={link.img_url} />
                ))}
            </div>
        </div> */