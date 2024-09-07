// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Label} from "@/components/ui/label";
import {LinkIcon, SearchIcon} from "./Icons";
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabase.ts";
import CopyLinkHubButton from "../CopyLinkHubButton.tsx";
import {useState} from "react";

export function Header({userid}: { userid: string }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
            <Link to="#" className="lg:hidden" prefetch={false}>
                <LinkIcon className="h-6 w-6"/>
                <span className="sr-only">Home</span>
            </Link>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search links..."
                            className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <UserMenu userid={userid}/>
        </header>
    );
}

function UserMenu({userid}: { userid: string }) {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    }

    const handleSettings = () => {
        setIsSettingsOpen(true);
    }
    const handleCloseSettings = () => {
        setIsSettingsOpen(false);
    }
    return (
        <>
            <DropdownMenu>
                <CopyLinkHubButton userid={userid}/>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKZijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg=="
                            width="32"
                            height="32"
                            className="rounded-full"
                            alt="Avatar"
                            style={{aspectRatio: "32/32", objectFit: "cover"}}/>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <SheetContent side={"right"}>
                    <SheetHeader>
                        <SheetTitle>Edit your Linkhub</SheetTitle>
                        <SheetDescription>
                            Here you can edit your Linkhub settings. Make sure to save your changes before closing this.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-left">
                                Title
                            </Label>
                            <Input id="title" className="col-span-3"/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bg-url" className="text-left">
                                Background image URL
                            </Label>
                            <Input id="bg-url" className="col-span-3"/>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    );
}

