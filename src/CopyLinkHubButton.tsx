import {Button} from "./components/ui/button.tsx";
//todo lav alerten om til en toast
export default function CopyLinkHubButton({userid}: {userid: string}) {
    const url = import.meta.env.VITE_BASE_URL + "/hub/" + userid;
    return (
        <Button
            className="ml-auto"
            size="sm"
            onClick={() => {
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!")
            }}
        >
            Copy link
        </Button>
    )
}
