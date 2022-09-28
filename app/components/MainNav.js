// Styles
import styles from '../styles/MainNav.module.scss'

// React
import { useRouter } from 'next/router'
import { useState } from 'react'

// Componentns
import Link from "next/link"

const MainNav = () => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState(null)

    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        router.push(`/search?q=${searchTerm}`)
    }

    return (
        <header className="fixed top-0 left-0 w-auto flex flex-nowrap p-def">
            <Link href="/">
                <a className="cursor-pointer mr-20">DS</a>
            </Link>
            <Link href="/info">
                <a className="cursor-pointer mr-20">INFO</a>
            </Link>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="SEARCH" 
                    className={styles.search}
                    onChange={handleChange}
                />
                <input type="submit" className='hidden' />
            </form>
        </header>
    )
}

export default MainNav