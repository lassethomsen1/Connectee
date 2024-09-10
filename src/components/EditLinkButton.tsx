import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.ts";

export default function EditLinkButton({id, onEdit}: { id: number, onEdit: (id: number) => void }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        url: "",
        handle: "",
        img_url: "",
    });

    useEffect(() => {
        async function fetchLink() {
            if (open) {
                const {data, error} = await supabase
                    .from("url")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    console.error("Error fetching link:", error.message);
                } else {
                    // Populate form with existing data
                    setFormData({
                        url: data.url || "",
                        handle: data.handle || "",
                        img_url: data.img_url || "",
                    });
                }
            }
        }

        fetchLink();
    }, [open, id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting form with data:", formData);

        const { data, error } = await supabase
            .from("url")
            .update({
                url: formData.url,
                handle: formData.handle,
                img_url: formData.img_url,
            })
            .eq("id", id)
            .select("*");

        if (error) {
            console.error("Error updating link:", error.message);
        } else {
            console.log("Update response data:", data);
            if (data.length > 0) {
                onEdit(data[0]);
                setOpen(false);
            } else {
                console.error("No data returned from update");
            }
        }
        setOpen(false)
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit your Link</DialogTitle>
                    <DialogDescription>Fill out the form to edit your link.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="url" className="text-left">
                                URL
                            </Label>
                            <Input
                                required
                                id="url"
                                name="url"
                                onChange={handleChange}
                                value={formData.url}
                                placeholder="https://example.com"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="handle" className="text-left">
                                Handle
                            </Label>
                            <Input
                                required
                                id="handle"
                                name="handle"
                                onChange={handleChange}
                                value={formData.handle}
                                placeholder="mylink"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid items-center grid-cols-4 gap-4">
                            <Label htmlFor="image-url" className="text-left">
                                Image URL
                            </Label>
                            <Input
                                required
                                id="image-url"
                                name="imageUrl"
                                onChange={handleChange}
                                value={formData.img_url}
                                placeholder="example.com/image.jpg"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Close</Button>
                        <Button type="submit">Edit Link</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}