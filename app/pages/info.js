import Head from "next/head";

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function InfoPage({ content }) {
    return (
        <div className="py-32 px-def">
            <Head>
                <title>DIRTY SNOW | Info</title>
            </Head>
        
            <div className="w-full lg:w-2/3 rich-text" dangerouslySetInnerHTML={{__html: content.infoText}}></div>
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
    const infoDataResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
        },
        body: JSON.stringify({
            query: "page('info')",
            select: {
                infoText: "page.infoText.markdown",
            },
        }),
    });

    const jsonData = await infoDataResponse.json();
    const infoPageContent = jsonData.result;

    return {
        // Passed to the page component as props
        props: {content: infoPageContent},
    };
}
