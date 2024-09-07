import {Button} from "./components/ui/button.tsx";
//todo lav alerten om til en toast
export default function CopyConnectPageButton({userid}: {userid: string}) {
    const baseurl = import.meta.env.VITE_BASE_URL;
    const url = `${baseurl}/hub/${userid}`;
    return (
        <Button
            className="ml-auto"
            size="sm"
            onClick={() => {
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard " + url);
            }}
        >
            Copy link
        </Button>
    )
}
