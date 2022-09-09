import Head from "next/head";
import TopNav from "../../components/TopNav";

export default function InfoPage({content}) {
    return (
        <div className="mx-3">
            <div className="cursor-pointer absolute right-0" onClick={() => {console.log(content)}}>LOG CONTENT</div>
            <Head>
                <title>DS: INFO</title>
            </Head>
            <TopNav />
            <div className="flex justify-center mt-[90px]">
                <p className="w-4/5">{content.infotext}</p>
            </div>
        </div>
    )
}


export async function getStaticProps() {
    const infoDataResponse = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
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
