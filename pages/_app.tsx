import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Navbar />
            <div className="py-4 px-4">
                <Component {...pageProps} />
            </div>
        </>
    );
}
