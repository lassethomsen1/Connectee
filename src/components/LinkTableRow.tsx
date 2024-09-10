import {TableCell, TableRow } from "./ui/table";
import DeleteLinkButton from "./DeleteLinkButton.tsx";
import EditLinkButton from "./EditLinkButton.tsx";

interface LinkTableRowProps {
    id: number;
    img_url: string;
    url: string;
    handle: string;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

export default function LinkTableRow({id, img_url, url, handle, onDelete, onEdit}: LinkTableRowProps) {

    return (
        <TableRow>
            <TableCell>
                <a href={"https://" + url} className="font-medium text-primary hover:underline">
                    {url}
                </a>
            </TableCell>
            <TableCell>{"@" + handle}</TableCell>
            <TableCell>
                <img
                    src={img_url}
                    width="32"
                    height="32"
                    alt="Icon"
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <EditLinkButton id={id} onEdit={onEdit}/>
                    <DeleteLinkButton id={id} onDelete={onDelete}/>
                </div>
            </TableCell>
        </TableRow>
    )
}