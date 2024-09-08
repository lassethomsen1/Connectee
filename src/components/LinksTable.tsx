// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import LinkTableRow from "./LinkTableRow.tsx";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.ts";
interface LinkTableProps {
    user: any;
}

export function LinksTable({ user }: LinkTableProps) {
    const [links, setLinks] = useState<any[]>([]);

    useEffect(() => {
        async function fetchLinks() {
            const { data, error } = await supabase
                .from("url")
                .select("*")
                .eq("user_id", user.id);

            if (error) {
                console.error("Error fetching links:", error.message);
                return;
            }
            setLinks(data);
        }

        if (user) {
            fetchLinks();
        }
    }, [user]);
    return (
        <div className="border shadow-sm rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>Handle</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {links.length=== 0 ? <TableRow><td colSpan={4} className="text-center font-medium">No links found</td></TableRow> : null}
                    {links.map((link) => (
                        <LinkTableRow
                            key={link.id}
                            id={link.id}
                            imgUrl={link.img_url}
                            url={link.url}
                            handle={link.handle}
                        />
                    ))}
                    {/* Repeat for other rows */}
                </TableBody>
            </Table>
        </div>
    );
}
