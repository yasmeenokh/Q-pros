import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <Head >
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Q Pros assessment" />
        <meta name="keywords" content="digital transformation, website development" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:description" content="Q Pros assessment"/>
        <meta property="og:site_name" content="Q-Pros-assessment" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo.png" />
        <title>Q Pros assessment</title>
        <link rel="icon" type='image/x-icon' href="/assets/images/fav-icon.png" />
        <link rel="apple-touch-icon" href="/images/fav-icon.png" />
      </Head>
    <Component {...pageProps} />
    </>

  )
}
