import Head from "next/head";

import Layout from "@/components/layout";
import RouletteGame from "@/components/game/roulette";

export default function RoulettePage() {
    return (
        <>
            <Head>
                <title>Roulette - LLC</title>
                <meta name="description" content="Test your luck on the wheel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <RouletteGame />
                </Layout>
            </main>
        </>
    );
}