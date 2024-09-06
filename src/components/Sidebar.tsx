// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Link } from "react-router-dom";
import { LinkIcon, HomeIcon} from "./icons";

export function Sidebar() {
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
                        <NavItem to="/" icon={<LinkIcon />} label="Links" />
                        {/*<NavItem to="#" icon={<UsersIcon />} label="Users" />*/}
                        {/* <NavItem to="#" icon={<SettingsIcon />} label="Settings" /> */}
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
}

function NavItem({ to, icon, label }: NavItemProps) {
    return (
        <Link
            to={to}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            prefetch={false}
        >
            {icon}
            {label}
        </Link>
    );
}
