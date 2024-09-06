// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import LinkTableRow from "./LinkTableRow.tsx";


export function LinksTable() {
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
                    <LinkTableRow imgUrl={"https://cdn-icons-png.flaticon.com/128/733/733547.png"} url={"facebook.com"} handle={"Lasse thomsen"}/>
                    {/* Repeat for other rows */}
                </TableBody>
            </Table>
        </div>
    );
}
