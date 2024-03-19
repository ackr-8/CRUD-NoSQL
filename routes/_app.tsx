import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shorty - URL Shortner</title>
        <meta name="title" content="Shorty" />
        <meta name="description" content="A No Fuss URL Shortner" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://st.ackr8.com/" />
        <meta property="og:title" content="Shorty" />
        <meta property="og:description" content="A No Fuss URL Shortner" />
        <meta property="og:image" content="https://st.ackr8.com/meta-tags.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://st.ackr8.com/" />
        <meta property="twitter:title" content="Shorty" />
        <meta property="twitter:description" content="A No Fuss URL Shortner" />
        <meta property="twitter:image" content="https://st.ackr8.com/meta-tags.png" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
