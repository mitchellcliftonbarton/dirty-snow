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
                                    className={`cursor-pointer uppercase w-fit lg:hover:underline lg:hover:italic ${selectedPage === category?.content?.title ? 'underline italic' : ''}`}
                                >
                                    {category?.content?.title}
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
                                <a className={`cursor-pointer w-fit lg:hover:underline lg:hover:italic ${selectedPage === artist?.content?.title ? 'underline italic' : ''}`}>{artist?.content?.title}</a>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}