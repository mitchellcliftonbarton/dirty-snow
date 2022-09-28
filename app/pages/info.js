import Head from "next/head";

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function InfoPage({content}) {
    return (
        <div className="py-32 px-def">
            <Head>
                <title>DIRTY SNOW | Info</title>
            </Head>
        
            <div className="w-full lg:w-2/3">{content.infotext}</div>
        </div>
    )
}

InfoPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export async function getStaticProps() {
    const infoDataResponse = await fetch("http://dirty-snow-panel.local.com:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`mitchell@cold-rice.info:dirtysnow`).toString("base64")}`,
        },
        body: JSON.stringify({
            query: "page('info')",
            select: {
                content: true,
            },
        }),
    });

    const jsonData = await infoDataResponse.json();
    const infoPageContent = jsonData.result.content;

    return {
        // Passed to the page component as props
        props: {content: infoPageContent},
    };
}
