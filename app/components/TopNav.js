import Link from "next/link";

export default function TopNav() {
    return (
        <div className="flex flex-nowrap py-4">
            <Link href="/">
                <p className="cursor-pointer mr-[100px]">DS</p>
            </Link>
            <Link href="/info">
                <p className="cursor-pointer mr-[100px]">INFO</p>
            </Link>
            <Link href="/search">
                <p className="cursor-pointer">SEARCH</p>
            </Link>
        </div>
    )
}