import Head from "next/head";
import TopNav from "../../components/MainNav";
import SideNav from "../../components/SideNav";
import FullWidthProjectCard from "../../components/FullWidthProjectCard";
import TwoUpProjectCard from "../../components/TwoUpProjectCard";

export default function SearchPage({categories, artists, projects}) {
    return (
        <>
            <div className="cursor-pointer absolute right-0" onClick={() => {
                console.log("CATEGORIES:::", categories);
                console.log("ARTISTS:::", artists);
                console.log("PROJECTS:::", projects)
            }}>LOG CONTENT
            </div>

            <Head>
                <title>DS : SEARCH</title>
            </Head>

            <TopNav />

            <div className="flex mt-[15px] mb-28">
                <div className="mr-16 sm:mr-24 md:mr-32 lg:mr-40">
                    <SideNav categories={categories} artists={artists} />
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps() {
    //GET ALL CATEGORIES' DATA
    const categoriesResponse = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
        },
        body: JSON.stringify({
            query: "page('categories').children",
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
    const categoriesJsonData = await categoriesResponse.json()
    const categoryListData = categoriesJsonData.result.data

    //GET ALL ARTISTS' DATA
    const artistsResponse = await fetch("http://localhost:8888/api/query", {
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
    const artistsJsonData = await artistsResponse.json()
    let artistsListData = artistsJsonData.result.data

    //GET ALL PROJECTS' DATA
    const projectsResponse = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
        },
        body: JSON.stringify({
            query: "page('projects').children",
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
    const projectsJsonData = await projectsResponse.json();
    let projectListData = projectsJsonData.result.data

    return {
        // Passed to the page component as props
        props: {
            categories: categoryListData,
            artists: artistsListData,
            projects: projectListData
        },
    };
}
