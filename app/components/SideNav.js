import Link from "next/link";

export default function SideNav({categories, artists, selectedPage}) {
    return (
        <div className="flex flex-nowrap flex-col whitespace-nowrap w-[275px]">
            {
                categories?.map(category => {
                    const categorySLUG = category?.url.slice(category?.url.lastIndexOf("/"))
                    return (
                        <Link key={categorySLUG} href={`/categories${categorySLUG}`}>
                            <p className={`cursor-pointer w-fit ${selectedPage === category?.content?.categoryname ? 'underline' : ''}`}>{category?.content?.categoryname}</p>
                        </Link>
                    )
                })
            }
            <p className="mt-6 text-gray-400">ARTIST</p>
            {
                artists?.map(artist => {
                    const artistSLUG = artist?.url.slice(artist?.url.lastIndexOf("/"))
                    return (
                        <Link key={artistSLUG} href={`/artists${artistSLUG}`}>
                            <p className={`cursor-pointer w-fit ${selectedPage === artist?.content?.artistname ? 'underline' : ''}`}>{artist?.content?.artistname}</p>
                        </Link>
                    )
                })
            }
        </div>
    )
}