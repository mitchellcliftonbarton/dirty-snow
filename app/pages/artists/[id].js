import Head from "next/head";
import TopNav from "../../components/MainNav";
import SideNav from "../../components/SideNav";
import TwoUpProjectCard from "../../components/TwoUpProjectCard";
import FullWidthProjectCard from "../../components/FullWidthProjectCard";

export default function ProjectPost({content, categories, artists, projects}) {
    return (
        <div className="mx-3">
            <div className="cursor-pointer absolute right-0" onClick={() => {
                console.log(content);
                console.log(categories);
                console.log(artists);
                console.log(projects);
            }}>LOG CONTENT
            </div>

            <Head>
                <title>DS : {content?.content?.artistname?.toUpperCase()}</title>
            </Head>

            <TopNav />

            <div className="flex mt-[15px] mb-28">
                <div className="mr-16 sm:mr-24 md:mr-32 lg:mr-40">
                    <SideNav categories={categories} artists={artists} selectedPage={content?.content?.artistname} />
                </div>
                <div className="flex flex-wrap flex-col">
                    {projects?.map((project, index) => {
                        if (index % 2 === 0) {
                            return (
                                <div className={`${index > 0 ? 'mt-24' : ''}`} key={index}>
                                    <FullWidthProjectCard project={project} />
                                </div>
                            )
                        } else {
                            return (
                                <div className={`${index > 0 ? 'mt-24' : ''}`} key={index}>
                                    <TwoUpProjectCard project={project} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
        },
        body: JSON.stringify({
            query: "page('artists').children",
            select: {
                title: true,
                url: true
            },
        }),
    });

    const jsonData = await response.json();
    const pageData = jsonData.result.data;

    const paths = pageData.map((page) => {
        return {
            params: {
                id: page.url.slice(page.url.lastIndexOf('/') + 1),
            },
        };
    });

    return {
        paths: paths,
        fallback: false,
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    const {params} = context;

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
    const artistsJsonData = await artistsResponse.json();
    let artistsListData = artistsJsonData.result.data

    //FILTER FOR THE SPECIFIC PAGE ARTIST
    const pageContent = artistsListData.filter((page) => {
            return page.url.slice(page.url.lastIndexOf('/') + 1) === params.id
        }
    )[0];

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
    const projectsJsonData = await projectsResponse.json()
    let projectsListData = projectsJsonData.result.data

    //FILTER PROJECTS BY SPECIFIC PAGE ARTIST
    let pageProjects = projectsListData?.filter(project => {
        const projectArtists = project?.content?.projectartists?.split(",").map(artist => artist.slice(artist?.lastIndexOf("/") + 1))
        return projectArtists.includes(params.id)
    })

    //GET METADATA FOR EACH PROJECT
    pageProjects = pageProjects?.map(project => {
        //GET LIST OF CONTRIBUTORS/ARTISTS
        const projectArtistSLUGS = project?.content?.projectartists?.split(",").map(artistPath => artistPath.slice(artistPath.lastIndexOf("/")))
        const contributors = artistsListData?.filter(artist => {
            return projectArtistSLUGS.includes(artist?.url.slice(artist.url.lastIndexOf("/")))
        })

        //GET FEATURE IMAGE NAMES
        const featureImageNames = project?.content?.featuredimage?.split("\n").map(filename => getFeatureFileName(filename))
        const featureImages = project?.images?.filter(image => featureImageNames.includes(image?.filename))

        return {
            project,
            contributors,
            featureImages
        }
    })

    //SORT PROJECTS IN CHRONOLOGICAL ORDER
    pageProjects = pageProjects.sort((p1, p2) => {
        return new Date(p2?.project?.content?.projectdate) - new Date(p1?.project?.content?.projectdate)
    })

    return {
        // Passed to the page component as props
        props: {
            content: pageContent,
            categories: categoryListData,
            artists: artistsListData,
            projects: pageProjects
        },
    };
}

//KIRBY CMS adds some weird characters in front of the file name. this method removes those.
function getFeatureFileName(filename) {
    //reverse the string
    let tempFilename = filename.split("").reverse()
    //remove everything after the string(spaces, etc.)
    tempFilename = tempFilename.splice(0, tempFilename.indexOf(" "))
    return tempFilename.reverse().join("")
}
