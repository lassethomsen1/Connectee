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
export default function Link({imgurl, handle, url}: LinkProps) {

    //const iconURL = icons[website];

    return (
        <a href={url}
           className={"inline-flex mt-3 items-center bg-amber-50 bg-opacity-35 rounded-2xl w-[300px] hover:bg-opacity-80"}>
            <img className={"my-1 ml-1 max-w-[48px] max-h-[48px] "} src={imgurl} alt={"icon"}/>
            <span className={"ml-2.5 truncate"}>@{handle}</span>
        </a>
    )
}