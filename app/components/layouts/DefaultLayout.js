import MainNav from '../MainNav'
import MobileMenu from '../MobileMenu'
import { useState } from 'react'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <MainNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="page-wrap push-nav def-x">{children}</main>
    </>
  )
}