// Styles
import styles from '../styles/SideBar.module.scss'

// Components
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function SideNav({ categories, artists, selectedPage, studioCategories }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const handleRouteChange = () => {
        setOpen(false)
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }, [])

    return (
        <div className="col-span-12 lg:col-span-3">
            <button 
                onClick={() => setOpen(!open)} 
                className="mb-4 lg:hidden flex items-center"
            >
                <span>CATEGORIES</span>
                <svg
                    className="ml-1" 
                    width="5" 
                    height="4" 
                    viewBox="0 0 5 4" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        transform: open ? `rotate(180deg)` : `rotate(0deg)`
                    }}
                >
                    <path d="M4.91 0.424988L2.45 1.89499L0 0.424988V1.79499L2.3 3.57499H2.63L4.91 1.83499V0.424988Z" fill="#23231F"/>
                </svg>
            </button>

            <div className={`${styles.inner} ${open ? styles.open : null} flex flex-nowrap flex-col items-start mb-16 lg:mb-0`}>
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

                <p className="text-gray-400 mt-6">DS STUDIO</p>
                {
                    studioCategories?.map(category => {
                        const categorySLUG = category?.url.slice(category?.url.lastIndexOf("/"))

                        return (
                            <Link 
                                key={categorySLUG} 
                                href={`/ds-studio${categorySLUG}`}
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