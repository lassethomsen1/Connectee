// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Link } from "react-router-dom";
import {LinkIcon, HomeIcon, SettingsIcon} from "./Icons";

export function Sidebar({userid}: { userid: string }) {
    return (
        <div className="hidden border-r bg-muted/40 lg:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link to="/" className="flex items-center gap-2 font-semibold" prefetch={false}>
                        <LinkIcon className="h-6 w-6" />
                        <span className="">Connectee</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <NavItem to="#" icon={<HomeIcon />} label="Dashboard" />
                        <NavItem to={"/hub/" + userid} icon={<LinkIcon />} label="Links" openNewTab={true} />
                        {/*<NavItem to="#" icon={<UsersIcon />} label="Users" />*/}
                        <NavItem to="#" icon={<SettingsIcon />} label="ConnectPage Settings" />
                    </nav>
                </div>
            </div>
        </div>
    );
}

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    openNewTab?: boolean;
}

function NavItem({ to, icon, label, openNewTab }: NavItemProps) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            prefetch={false}
            {...(openNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            {icon}
            {label}
        </Link>
    );
}
