import {Button} from "./ui/button.tsx";
import {Copy} from "lucide-react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export default function CopyConnectPageButton({userid}: { userid: string }) {
    const baseurl = import.meta.env.VITE_BASE_URL;
    const url = `${baseurl}/hub/${userid}`;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"ml-auto"} size={"sm"}>Share Connectpage</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            defaultValue={url}
                            readOnly
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3"
                    onClick={() =>{
                        navigator.clipboard.writeText(url);
                        console.log("Copied to clipboard: ", url);
                    }}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
