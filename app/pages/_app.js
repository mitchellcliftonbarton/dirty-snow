import '../styles/globals.scss'
// import '../styles/custom-swiper-style.css'

// this is used to use different layouts on a page level
export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
