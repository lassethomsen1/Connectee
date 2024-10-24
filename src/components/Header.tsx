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
} from "@/components/ui/sheet"
import {Label} from "@/components/ui/label";
import {LinkIcon, SearchIcon} from "./Icons";
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabase.ts";
import CopyConnectPageButton from "./CopyConnectPageButton.tsx";
import {useEffect, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger} from "./ui/select.tsx";
import {ensureUrlFormat} from "../lib/utils.ts";

export function Header({userid}: { userid: string }) {

    return (
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
            <Link to="/" className="lg:hidden" prefetch={false}>
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
    const [formData, setFormData] = useState({
        title: "",
        bg_url: "",
        subtitle: "",
        theme_id: "",
    });
    const [themes, setThemes] = useState([]); // State to store themes

    useEffect(() => {
        async function fetchSettings() {
            if (isSettingsOpen) {
                const {data, error} = await supabase
                    .from("connectpages")
                    .select("title, bg_url, subtitle, theme_id, themes (id ,name)")
                    .eq("user_id", userid);

                if (error) {
                    console.error("Error fetching connectpage settings:", error.message);
                } else if (data && data.length > 0) {
                    setFormData({
                        title: data[0].title || "",
                        bg_url: data[0].bg_url || "",
                        subtitle: data[0].subtitle || "",
                        theme_id: data[0].theme_id || "",
                    });
                    setThemes(data[0].themes || []);
                }
            }
        }

        fetchSettings();
    }, [userid, isSettingsOpen]);
    const handleThemeChange = (value) => {
        setFormData({ ...formData, theme_id: value });
    };
    //TODO find ud af hvordan man skal set user = null
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.bg_url = ensureUrlFormat(formData.bg_url);

        const {data, error} = await supabase
            .from("connectpages")
            .update({
                title: formData.title,
                bg_url: formData.bg_url,
                subtitle: formData.subtitle,
                theme_id: formData.theme_id,
            })
            .eq("user_id", userid)
            .select("*");

        if (error) {
            console.error("Error updating connectpage:", error.message);
        } else if (data && data.length > 0) {
            setFormData(data[0]);
        }
    }

    const handleSettings = () => {
        setIsSettingsOpen(true);
    }
    return (
        <>
            <DropdownMenu>
                <CopyConnectPageButton userid={userid}/>
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
                        <SheetTitle>Edit your ConnectPage</SheetTitle>
                        <SheetDescription>
                            Here you can edit your ConnectPage settings. Make sure to save your changes before closing
                            this.
                        </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-left">
                                    Title
                                </Label>
                                <Input onChange={handleChange} id="title" name="title" value={formData.title || ""}
                                       placeholder={formData.title} className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subtitle" className="text-left">
                                    Subtitle
                                </Label>
                                <Input onChange={handleChange} id="subtitle" name="subtitle" value={formData.subtitle || null}
                                       placeholder={formData.subtitle} className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bg_url" className="text-left">
                                    Background image URL
                                </Label>
                                <Input onChange={handleChange} id="bg_url" name="bg_url" value={formData.bg_url || ""}
                                       placeholder={formData.bg_url} className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="theme" className="text-left">
                                    Theme:
                                </Label>
                                <Select onValueChange={handleThemeChange}>
                                    <SelectTrigger className={"col-span-3"}>pick a theme</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={"3"}>cyberpunk</SelectItem>
                                        <SelectItem value={"5"}>nordic</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Save changes</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </>
    );
}

