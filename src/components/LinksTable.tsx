// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {Table, TableHeader, TableRow, TableHead, TableBody} from "@/components/ui/table";
import LinkTableRow from "./LinkTableRow.tsx";
import {useEffect, useState} from "react";
import {supabase} from "../supabase.ts";


interface Link {
    id: number;
    img_url: string;
    url: string;
    handle: string;
}
interface LinkTableProps {
    links: Link[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export function LinksTable({links, onDelete, onEdit}: LinkTableProps) {

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
                    {links.length === 0 ? <TableRow>
                        <td colSpan={4} className="text-center font-medium">No links found</td>
                    </TableRow> : null}
                    {links.map((link) => (
                        <LinkTableRow
                            key={link.id}
                            id={link.id}
                            img_url={link.img_url}
                            url={link.url}
                            handle={link.handle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
