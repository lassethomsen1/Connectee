import ConnectPageLink from "../ConnectPageLink.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../../supabase.ts";
import RetroGrid from "../magicui/retro-grid.tsx";

interface link {
    id: number;
    handle: string;
    url: string;
    img_url: string;
}
interface theme{
    id: number;
    title_color: string;
    handle_color: string;
    page_background: string;
    subtitle_color: string;
    link_color: string;
    link_hover_color: string;
    fontFamily: string;
    specialEffects: specialEffects;
}
interface settings {
    title: string;
    bg_url: string;
    subtitle: string;
    theme: theme;
}
enum specialEffects {
    retroGrid = "retroGrid",

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
                .select(`
                title,
                subtitle,
                theme_id,
                themes (
                    id,
                    title_color,
                    handle_color,
                    page_background,
                    subtitle_color,
                    link_color,
                    link_hover_color,
                    fontFamily,
                    specialEffects
                )
            `)
                .eq("user_id", userid)
                .single();

            if (error) {
                console.error("Error fetching settings:", error.message);
                return;
            }

            // Ensure the fetched theme data is nested correctly
            setSettings({
                ...data,
                theme: data.themes // Explicitly assign the nested 'themes' data to 'theme'
            });
        }

        fetchSettings();
    }, [userid]);

    //https://themes.ionevolve.com/
    //https://github.com/saadeghi/daisyui/blob/master/src/theming/themes.js

    //de her themes skal være i supabase på en eller anden måde
    const themes = {
        oldMoney: {
            "title-color": "#2e3b32",         // Deep, muted green for a sophisticated look
            "handle-color": "#786850",        // Darker, muted gold-brown for handles
            "page-background": "#f5f2eb",     // Soft, off-white or cream for an elegant background
            "subtitle-color": "#4a4a48",      // Dark neutral gray for a refined feel
            "link-color": "#a7895e",          // Rich, antique gold for links
            "link-hover-color": "#8c7249",    // Slightly darker, vintage gold for hover effects
            "fontFamily": "'Georgia', 'Times New Roman', Times, serif",  // Classic serif fonts for an old-world feel
            specialEffects: null
        },
    }
    const theme = settings?.theme;
    return (
        <div
            className="relative flex flex-col items-center min-h-screen text-white"
            style={{backgroundColor: theme?.page_background}}
        >
            {theme?.specialEffects.includes("retroGrid") ? <RetroGrid /> : null}
            <div className="max-w-md w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="flex flex-col items-center space-y-6">
                    <div className="rounded-full w-32 h-32 overflow-hidden">
                        <img src="https://placehold.co/128x128" alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <div className="text-center space-y-1">
                        <h1
                            className="text-3xl font-bold"
                            style={{
                                color: theme?.title_color,
                                fontFamily: theme?.fontFamily,
                            }}
                        >
                            {settings?.title}
                        </h1>
                        {settings?.subtitle ? (
                            <p
                                className="text-gray-300 font-semibold"
                                style={{
                                    color: theme?.subtitle_color,
                                    fontFamily: theme?.fontFamily,
                                }}
                            >
                                {settings.subtitle}
                            </p>
                        ) : null}
                    </div>
                    <div className="w-full space-y-4">
                        {links.map((link: link) => (
                            <ConnectPageLink
                                key={link.id}
                                handle={link.handle}
                                url={link.url}
                                imgurl={link.img_url}
                                handleColor={theme?.handle_color}
                                linkColor={theme?.link_color}
                                linkTitle={theme?.title_color}
                                onHoverColor={theme?.link_hover_color}
                                fontFamily={theme?.fontFamily}
                            />
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