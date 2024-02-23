import Head from "next/head";

import Layout from "@/components/layout";
import SliderGame from "@/components/sliderGame";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aptosino</title>
        <meta name="description" content="Provably-fair on-chain casino games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
            <SliderGame />
        </Layout>
      </main>
    </>
  );
}