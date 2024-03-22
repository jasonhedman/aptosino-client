import Head from "next/head";

import Layout from "@/components/layout";
import DiceGame from "../components/game/dice";

export default function DicePage() {
    return (
        <>
            <Head>
                <title>Dice - LLC</title>
                <meta name="description" content="Pick a number between 1 and 100" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <DiceGame />
                </Layout>
            </main>
        </>
    );
}