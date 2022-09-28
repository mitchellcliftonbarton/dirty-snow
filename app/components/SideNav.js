// Styles
import styles from '../styles/SideBar.module.scss'

// Components
import Link from "next/link"

export default function SideNav({categories, artists, selectedPage}) {
    return (
        <div className="col-span-3">
            <div className={`${styles.inner} flex flex-nowrap flex-col items-start`}>
                <p className="text-gray-400">DS</p>
                {
                    categories?.map(category => {
                        const categorySLUG = category?.url.slice(category?.url.lastIndexOf("/"))

                        return (
                            <Link 
                                key={categorySLUG} 
                                href={`/categories${categorySLUG}`}
                            >
                                <a
                                    className={`cursor-pointer uppercase w-fit lg:hover:underline lg:hover:italic ${selectedPage === category?.content?.categoryname ? 'underline italic' : ''}`}
                                >
                                    {category?.content?.categoryname}
                                </a>
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
                                <p className={`cursor-pointer w-fit lg:hover:underline lg:hover:italic ${selectedPage === artist?.content?.artistname ? 'underline italic' : ''}`}>{artist?.content?.artistname}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}