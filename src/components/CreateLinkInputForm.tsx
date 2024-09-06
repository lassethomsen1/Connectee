/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I0Nzh7naVO4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function CreateLinkInputForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className={"ml-auto"}>Create Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Link</DialogTitle>
                    <DialogDescription>Fill out the form to create a new link.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="url" className="text-left">
                            URL
                        </Label>
                        <Input id="url" placeholder="https://example.com" className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="handle" className="text-left">
                            Handle
                        </Label>
                        <Input id="handle" placeholder="mylink" className="col-span-3" />
                    </div>
                    <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="image-url" className="text-left">
                            Image URL
                        </Label>
                        <Input id="image-url" placeholder="https://example.com/image.jpg" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <div>
                        <Button variant="ghost">Close</Button>
                    </div>
                    <Button type="submit">Create Link</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}