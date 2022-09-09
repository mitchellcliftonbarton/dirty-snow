import Head from "next/head";
import TopNav from "../../components/TopNav";

export default function ProjectsPage({content}) {
    return (
        <>
            <div className="cursor-pointer absolute right-0" onClick={() => {console.log(content)}}>LOG CONTENT</div>
            <Head>
                <title>DS : ARTISTS</title>
            </Head>
            <TopNav />
            <h1>Artists</h1>
        </>
    );
}


export async function getStaticProps() {
    const response = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
        },
        body: JSON.stringify({
            query: "page('artists').children",
            select: {
                url: true,
                content: true,
                images: {
                    query: "page.images",
                    select: {
                        url: true,
                        filename: true,
                        content: true,
                    },
                },
            },
        }),
    });

    const jsonData = await response.json();
    let pageData = jsonData.result.data

    return {
        // Passed to the page component as props
        props: {content: pageData},
    };
}