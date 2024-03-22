import Head from "next/head";

import Layout from "@/components/layout";
import Home from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Lucky Leopards Club</title>
        <meta name="description" content="Provably-fair on-chain casino games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
            <Home />
        </Layout>
      </main>
    </>
  );
}