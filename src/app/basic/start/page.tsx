import { useSearchParams } from "next/navigation";
import Start from "./impl";

export default function StartPage({searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {
    return (
        <Start m={searchParams["m"] === "1"} t={searchParams["t"] === "1"} />
    )
}