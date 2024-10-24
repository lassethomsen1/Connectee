import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button.tsx";
import { supabase } from "../supabase.ts";
import { useState } from "react";

interface DeleteLinkButtonProps {
    id: number;
    onDelete: (id: number) => void;
}

export default function DeleteLinkButton({ id, onDelete }: DeleteLinkButtonProps) {
    const [open, setOpen] = useState(false);

    async function handleDelete() {
        const { error } = await supabase
            .from("url")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Error deleting link:", error.message);
        } else {
            onDelete(id); // Call the onDelete function with the id
        }
        setOpen(false); // Close the dialog
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your Link.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
