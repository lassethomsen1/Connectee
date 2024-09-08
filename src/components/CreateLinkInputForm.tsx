/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I0Nzh7naVO4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {useState} from "react"
import {supabase} from "../supabase.ts";

export default function CreateLinkInputForm({user_id}: string) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        url: "",
        handle: "",
        imageUrl: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
        const {error} = await supabase
            .from("url")
            .insert([{
                user_id: user_id,
                url: formData.url,
                handle: formData.handle,
                img_url: formData.imageUrl,
            }]);
        if (error) {
            console.error("Error creating link:", error.message);
        } else {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className={"ml-auto"}>Create Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Link</DialogTitle>
                    <DialogDescription>Fill out the form to create a new link.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="url" className="text-left">
                                URL
                            </Label>
                            <Input required id="url" name="url" onChange={handleChange} value={formData.url} placeholder="https://example.com"
                                   className="col-span-3"/>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="handle" className="text-left">
                                Handle
                            </Label>
                            <Input required id="handle" name="handle" onChange={handleChange} value={formData.handle} placeholder="mylink" className="col-span-3"/>
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="image-url" className="text-left">
                                Image URL
                            </Label>
                            <Input required id="image-url" name="imageUrl" onChange={handleChange} value={formData.imageUrl} placeholder="https://example.com/image.jpg"
                                   className="col-span-3"/>
                        </div>
                    </div>
                    <DialogFooter>
                        <div>
                            <Button onClick={() => {setOpen(false)}} type="button" variant="ghost">Close</Button>
                        </div>
                        <Button type="submit">Create Link</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}