import Head from "next/head";

export default function DynamicHead({ title }: { title: string }) {
    return (
        <Head>
            <title>{title || 'Turbo Dashboard'}</title>
            <meta name="description" content="Turbo Merchant Experience" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}