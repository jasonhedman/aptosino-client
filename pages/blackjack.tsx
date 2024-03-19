import Head from "next/head";

import Layout from "@/components/layout";
import BlackjackGame from "@/components/game/blackjack";

export default function Blackjack() {
    return (
        <>
            <Head>
                <title>Roulette - Aptosino</title>
                <meta name="description" content="Test your luck on the wheel" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <BlackjackGame />
                </Layout>
            </main>
        </>
    );
}