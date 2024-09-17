import {Link} from "react-router-dom";

type LinkProps = {
    key: number,
    handle: string,
    url: string,
    imgurl: string
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
export default function ConnectPageLink({imgurl, handle, url}: LinkProps) {

    //const iconURL = icons[website];

    return (<Link
            to={url}
            className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors rounded-lg p-4"
            prefetch={false}
        >
            <div className="rounded-full p-2">
                {/*her skal der være icon */}
                {/*<InstagramIcon className="w-5 h-5 text-primary-foreground" /> */}
                <img className={"max-w-6 max-h-6 "} src={imgurl} alt={"icon"}/>
            </div>
            <div className="flex-1">
                <h3 className="font-semibold">Instagram</h3>
                <p className="text-gray-300 text-sm">{handle}</p>
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