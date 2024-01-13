import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Message } from '@/components/message';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          sizes="32x32"
          type="image/png"
          href="https://open.spotifycdn.com/cdn/images/favicon32.b64ecc03.png"
        ></link>
        <link
          rel="icon"
          sizes="16x16"
          type="image/png"
          href="https://open.spotifycdn.com/cdn/images/favicon16.1c487bff.png"
        ></link>
        <link
          rel="icon"
          href="https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico"
        ></link>
      </Head>
      {pageProps.error && (
        <Message type="error" message={pageProps.error.message} />
      )}
      {!pageProps.error && <Component {...pageProps} />}
    </>
  );
}
