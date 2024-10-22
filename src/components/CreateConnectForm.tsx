import {Select, SelectContent, SelectItem, SelectTrigger} from "./ui/select.tsx";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {ensureUrlFormat} from "../lib/utils.ts";
import {supabase} from "../supabase.ts";
import {useState} from "react";
import {Button} from "./ui/button.tsx";

export function CreateConnectForm({userid}: {userid: string}) {
    const [formData, setFormData] = useState({
        title: "",
        bg_url: "",
        subtitle: "",
        theme_id: "",
    });
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        formData.bg_url = ensureUrlFormat(formData.bg_url);

        const {data, error} = await supabase
            .from("connectpages")
            .upsert({
                title: formData.title,
                userid: userid,
                bg_url: formData.bg_url,
                subtitle: formData.subtitle,
                theme_id: formData.theme_id,
            })
            .select("*");

        if (error) {
            console.error("Error updating connectpage:", error.message);
        } else if (data && data.length > 0) {
            setFormData(data[0]);
        }
        localStorage.setItem("isConnectPageCreated", "true");
    }

    const handleChange = (e: { target: { name: string; value: any; }; }) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleThemeChange = (value: bigint) => {
        setFormData({ ...formData, theme_id: value });
    };
    return (
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
                    <Input onChange={handleChange} id="subtitle" name="subtitle" value={formData.subtitle || ""}
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
            <Button type="submit">Save changes</Button>
        </form>
    )
}