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
    const themes = {
        cyberpunk: {
            'primary': '#ff7094',
            'title-color': '#000000',
            'accent': '#c07eec',
            'handle-color': '#ad55e7',
            'secondary': '#1c92f2',
            'secondary-focus': '#5bbedc', // hardcoded hex value
            'page-background': '#ffee00',
            'subtitle-color': '#090901',
            'link-color': '#d6c800',
            'link-hover-color': '#b8ab00',
            'fontFamily': "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
        },
        retroMoney: {
            'primary': '#E5D9B6',
            'primary-content': '#A4BE7B',
            'secondary': '#5F8D4E',
            'secondary-content': '#3A5A40',
            'accent': '#344E41'
        }
    }
    const theme = themes['cyberpunk'];
    return (
        <div
            className="relative flex flex-col items-center min-h-screen text-white"
            style={{backgroundColor: theme["page-background"]}}
        >
            <RetroGrid/>
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