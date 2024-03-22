import React from 'react';

import Head from "next/head";

import Layout from "@/components/layout";
import Club from "@/components/club";

const ClubPage = () => {
    return (
        <>
            <Head>
                <title>Club - LLC</title>
                <meta name="description" content="Join the Club" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Layout>
                    <Club />
                </Layout>
            </main>
        </>
    );
};

export default ClubPage;
