import Head from "next/head";

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import SideNav from "../../components/SideNav";
import ProjectsList from '../../components/ProjectsList'

export default function ArtistDetail({ content, categories, artists, projects }) {
    // console.log(content, projects)
    return (
        <div className="pt-20 pb-32 grid grid-cols-12 gap-def px-def">
            <Head>
                <title>DIRTY SNOW | {content.content.title.toUpperCase()}</title>
            </Head>

            <SideNav 
                categories={categories} 
                artists={artists} 
                selectedPage={content?.content?.title}
            />

            <div className="col-span-9">
                {projects.length > 0 ? (
                    <ProjectsList projects={projects} />
                ) : (
                    <p>There are no projects by this artist.</p>
                )}
            </div>
        </div>
    );
}

ArtistDetail.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

export async function getStaticPaths() {
    const response = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
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
    const artistsResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
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
    const categoriesResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
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
    const projectsResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
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
