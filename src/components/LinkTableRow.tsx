import {TableCell, TableRow } from "./ui/table";
import {Button} from "./ui/button.tsx";
import DeleteLinkButton from "./DeleteLinkButton.tsx";
type LinkTableRowProps = {
    imgUrl: string;
    url: string;
    handle: string;
}

export default function LinkTableRow({id, imgUrl, url, handle}: LinkTableRowProps) {
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
                    src={imgUrl}
                    width="32"
                    height="32"
                    alt="Icon"
                    className="rounded-md object-cover"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    <DeleteLinkButton id={id}/>
                </div>
            </TableCell>
        </TableRow>
    )
}