// Styles
import styles from '../styles/MainNav.module.scss'

// React
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

// Componentns
import Link from "next/link"

const MobileMenu = ({mobileOpen, setMobileOpen}) => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(null)

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        router.push(`/search?q=${searchTerm}`)
    }
  
    useEffect(() => {
      const handleRouteChange = () => {
        setMobileOpen(false)
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }, [])

    return (
      <div className={`${styles['mobile-menu']} ${mobileOpen ? styles.active : null} flex flex-col items-end lg:hidden fixed top-0 left-0 w-full h-full bg-white px-def pb-def pt-20`}>
          <Link href="/info">
              <a className="cursor-pointer">INFO</a>
          </Link>
          <Link href="/contact">
              <a className="cursor-pointer">CONTACT</a>
          </Link>
          <form onSubmit={handleSubmit}>
              <input 
                  type="text" 
                  placeholder="SEARCH" 
                  className={`${styles.search} text-right`}
                  onChange={handleChange}
              />
              <input type="submit" className='hidden' />
          </form>
      </div>
    )
}

export default MobileMenu