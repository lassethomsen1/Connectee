export default function Title( {title}: {title: string} ) {
    return (
        <div
            className={"relative inline-flex items-center justify-center h-12 w-screen mb-2 top-0 bg-opacity-35 bg-amber-50 "}>
            <h1 className={"text-xl text-black"}>{title}</h1>
        </div>
    )
}