import "@/index.css";
import Head from "next/head";
 
import { mulish } from "@/fonts";

export default function App({ Component, pageProps }) {

  const title = "Penumbra - encrypted local notes";
  const description = "Penumbra is a simple, secure, and private note-taking app. It runs entirely in your browser, and your notes are never sent to a server. You can even use it offline.";

  return (
    <div className={`${mulish.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta content="@samirelanduk" name="twitter:site"/>
        <meta content={title} name="twitter:title"/>
        <meta content={description} name="twitter:description"/>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
