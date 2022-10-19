// Styles
import styles from '../styles/MainNav.module.scss'

// React
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

// Componentns
import Link from "next/link"

const MainNav = ({mobileOpen, setMobileOpen}) => {
    const router = useRouter()
    const form = useRef(null)

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        router.push(`/search?q=${searchTerm}`)
    }

    const handleMenuToggle = () => {
        mobileOpen ? setMobileOpen(false) : setMobileOpen(true)
    }

    useEffect(() => {
      const handleRouteChange = () => {
          form.current.reset()
          console.log('reset form')
          setSearchTerm('')
      }

      router.events.on('routeChangeStart', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method:
      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }, [])

    return (
        <header className={`${styles.nav} fixed top-0 left-0 w-full lg:w-auto flex justify-between lg:justify-start flex-nowrap p-def`}>
            <Link href="/">
                <a className="cursor-pointer mr-20">DS</a>
            </Link>
            <Link href="/info">
                <a className="hidden lg:inline-block cursor-pointer mr-20">INFO</a>
            </Link>
            <Link href="/contact">
                <a className="hidden lg:inline-block cursor-pointer mr-20">CONTACT</a>
            </Link>
            <form ref={form} onSubmit={handleSubmit} className="hidden lg:block">
                <input 
                    type="text" 
                    placeholder="SEARCH" 
                    className={styles.search}
                    value={searchTerm}
                    onChange={handleChange}
                />
                <input type="submit" className='hidden' />
            </form>

            <button className='lg:hidden' onClick={handleMenuToggle}>{mobileOpen ? 'CLOSE' : 'MENU'}</button>
        </header>
    )
}

export default MainNav