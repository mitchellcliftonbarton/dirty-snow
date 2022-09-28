import MainNav from '../MainNav'

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <main className="page-wrap push-nav def-x">{children}</main>
    </>
  )
}