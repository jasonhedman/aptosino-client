import Head from "next/head";

import Layout from "@/components/layout";
import Stake from "@/components/stake";

export default function StakePage() {
    return (
        <>
            <Head>
                <title>Stake - LLC</title>
                <meta name="description" content="Deposit APT to back the house and earn fees" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <Stake />
                </Layout>
            </main>
        </>
    );
}