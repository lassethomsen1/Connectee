import background from "../../assets/background.jpg";
import Title from "../Title.tsx";
import Link from "../Link.tsx";

export default function HubPage(){
    return (
        <div className={"absolute bg-cover h-screen w-screen"} style={{backgroundImage: `url(${background})`}}>
            <Title></Title>
            <div className={"flex flex-col items-center"}>
                <Link website={"discord"} soMeHandle={"lolgameplay"}
                      url={"https://www.google.com"}></Link>
                <Link website={"instagram"} soMeHandle={"lolgameplay"}
                      url={"https://www.google.com"}></Link>
                <Link website={"x"} soMeHandle={"lolgameplay"}
                      url={"https://www.google.com"}></Link>
            </div>
        </div>
    )
}