import Link from "next/link"

export default function MainNav() {
    return (
        <header className="fixed top-0 left-0 w-auto flex flex-nowrap p-def">
            <Link href="/">
                <a className="cursor-pointer mr-20">DS</a>
            </Link>
            <Link href="/info">
                <a className="cursor-pointer mr-20">INFO</a>
            </Link>
            <Link href="/search">
                <a className="cursor-pointer">SEARCH</a>
            </Link>
        </header>
    )
}