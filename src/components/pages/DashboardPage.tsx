// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LinksTable } from "@/components/LinksTable";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">Links</h1>
                        <Button className="ml-auto" size="sm">
                            Create Link
                        </Button>
                    </div>
                    <LinksTable />
                </main>
            </div>
        </div>
    );
}
