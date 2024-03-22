import Head from "next/head";

import Layout from "@/components/layout";
import BlackjackGame from "@/components/game/blackjack";

export default function Blackjack() {
    return (
        <>
            <Head>
                <title>Blackjack - LLC</title>
                <meta name="description" content="Classic card game implemented on-chain" />
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