import {Link} from "react-router-dom";
import {useState} from "react";
import {ensureUrlFormat} from "../lib/utils.ts";

type LinkProps = {
    key: number,
    handle: string,
    url: string,
    imgurl: string
    handleColor: string
    linkColor: string
    onHoverColor: string
    linkTitle: string
    fontFamily: string
};
/* det her skal være i supabase
const icons = {
    "github": "https://cdn-icons-png.flaticon.com/128/733/733553.png",
    "instagram": "https://cdn-icons-png.flaticon.com/128/2111/2111463.png",
    "discord": "https://cdn-icons-png.flaticon.com/128/3670/3670157.png",
    "linkedin": "https://cdn-icons-png.flaticon.com/128/174/174857.png",
    "twitter": "https://cdn-icons-png.flaticon.com/128/733/733579.png",
    "facebook": "https://cdn-icons-png.flaticon.com/128/733/733547.png",
    "x": "https://cdn-icons-png.flaticon.com/512/5968/5968958.png"
}
*/
export default function ConnectPageLink({imgurl, handle, url, handleColor,linkTitle, linkColor, onHoverColor, fontFamily}: LinkProps) {
    url = ensureUrlFormat(url);
    const [isHovered, setIsHovered] = useState(false); //det her virker
    return (<Link
            to={url}
            className="flex items-center gap-4 transition-colors rounded-lg p-4 bg-opacity-30 bg-white/30 backdrop-blur-md border border-white/10 shadow-lg"
            style={{backgroundColor: isHovered ? onHoverColor : linkColor}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div className="rounded-full p-2">
                {/*her skal der være icon */}
                {/*<InstagramIcon className="w-5 h-5 text-primary-foreground" /> */}
                <img className={"max-w-6 max-h-6 "} src={imgurl} alt={"icon"}/>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold" style={{color: linkTitle, fontFamily: fontFamily}}>Instagram</h3>
                <p className="text-sm" style={{color: handleColor, fontFamily: fontFamily}}>{handle}</p>
            </div>
        </Link>
    )
}

/*

            <a href={url}
           className={"inline-flex mt-3 items-center bg-amber-50 bg-opacity-35 rounded-2xl w-[300px] hover:bg-opacity-80"}>
            <img className={"my-1 ml-1 max-w-[48px] max-h-[48px] "} src={imgurl} alt={"icon"}/>
            <span className={"ml-2.5 truncate"}>@{handle}</span>
        </a>
            */