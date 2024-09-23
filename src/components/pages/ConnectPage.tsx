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

interface settings {
    title: string;
    bg_url: string;
    subtitle: string;
}
enum specialEffects {
    retroGrid,

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
    //https://themes.ionevolve.com/
    //https://github.com/saadeghi/daisyui/blob/master/src/theming/themes.js

    //de her themes skal være i supabase på en eller anden måde
    const themes = {
        cyberpunk: {
            'title-color': '#000000',
            'handle-color': '#ad55e7',
            'page-background': '#ffee00',
            'subtitle-color': '#090901',
            'link-color': '#d6c800',
            'link-hover-color': '#b8ab00',
            'fontFamily': "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
            specialEffects: specialEffects.retroGrid
        },
        nordic: {
            "title-color": "#2b3a42",         // A muted, icy blue-gray for titles
            "handle-color": "#5e81ac",        // Cold yet vibrant arctic blue
            "page-background": "#d8dee9",     // Soft, snow-like white with a hint of gray
            "subtitle-color": "#4c566a",      // Darker, cooler gray for subtitles
            "link-color": "#88c0d0",          // Frosty, bright blue for links
            "link-hover-color": "#81a1c1",    // Slightly deeper blue for hover effects
            "fontFamily": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            specialEffects: null
        }
    }
    const theme = themes['cyberpunk'];
    return (
        <div
            className="relative flex flex-col items-center min-h-screen text-white"
            style={{backgroundColor: theme["page-background"]}}
        >
            {theme.specialEffects === specialEffects.retroGrid ? <RetroGrid /> : null}
            <div className="max-w-md w-full px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="flex flex-col items-center space-y-6">
                    <div className="rounded-full w-32 h-32 overflow-hidden">
                        <img src="https://placehold.co/128x128" alt="Profile" className="w-full h-full object-cover"/>
                    </div>
                    <div className="text-center space-y-1">
                        <h1
                            className="text-3xl font-bold"
                            style={{
                                color: theme['title-color'],
                                fontFamily: theme['fontFamily'],
                            }}
                        >
                            {settings?.title}
                        </h1>
                        {settings?.subtitle ? (
                            <p
                                className="text-gray-300 font-semibold"
                                style={{
                                    color: theme['subtitle-color'],
                                    fontFamily: theme["fontFamily"],
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
                                handleColor={theme["handle-color"]}
                                linkColor={theme['link-color']}
                                linkTitle={theme['title-color']}
                                onHoverColor={theme['link-hover-color']}
                                fontFamily={theme['fontFamily']}
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