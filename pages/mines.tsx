import Head from "next/head";

import Layout from "@/components/layout";
import MinesGame from "@/components/game/mines";

export default function Mines() {
    return (
        <>
            <Head>
                <title>Mines - Aptosino</title>
                <meta name="description" content="Test your apetite for risk in a high-stakes game of chance!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <MinesGame />
                </Layout>
            </main>
        </>
    );
}