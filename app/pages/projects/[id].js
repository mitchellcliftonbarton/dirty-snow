import Head from "next/head";
import TopNav from "../../components/MainNav";
import SideNav from "../../components/SideNav";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Navigation} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useCallback, useRef} from "react";

export default function ProjectPost({content, categories, artists, metadata}) {

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    function renderImages() {
        switch (content?.content?.projectlayout) {
            case "Grid":
                return (
                    //TODO BUILD ACTUAL GRID LAYOUT WITH EXPANDABLE IMAGES
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 mt-10">
                        {content?.images?.map(image => {
                            return (
                                <>
                                    <img src={image.url} />
                                </>
                            )
                        })}
                    </div>
                )
            case "Carousel":
                return (
                    <>
                        <div className="flex justify-center w-full max-h-[500px] mt-9">
                            <div className="w-full">
                                <Swiper
                                    ref={sliderRef}
                                    slidesPerView={"auto"}
                                    spaceBetween={50}
                                    loop={true}>
                                    {content?.images?.map((image, index) => {
                                        return (
                                            <SwiperSlide className="" key={index}>
                                                <div className="flex h-full w-full items-center">
                                                    <img className="max-h-full max-w-full" src={image?.url} />
                                                </div>
                                            </SwiperSlide>)
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        {/*custom swiper navigation arrows (next and prev image buttons)*/}
                        <div className="flex justify-between mt-4">
                            <div onClick={handlePrev} className="p-2 cursor-pointer"><img src="/left-arrow.png" /></div>
                            <div onClick={handleNext} className="p-2 cursor-pointer mr-10"><img src="/right-arrow.png" /></div>
                        </div>
                    </>
                )
        }
    }

    return (
        <div className="ml-3">
            <div className="cursor-pointer absolute right-0" onClick={() => {
                console.log(content);
                console.log(categories);
                console.log(artists);
                console.log(metadata);
            }}>LOG CONTENT
            </div>

            <Head>
                <title>DS : {content?.content?.title?.toUpperCase()}</title>
            </Head>

            <TopNav />

            {/*MAIN*/}
            <div className="flex pt-4 pb-28 w-full h-full">

                {/*side nav*/}
                <div id="side-nav">
                    <SideNav categories={categories} artists={artists} />
                </div>

                {/*PROJECT MAIN*/}
                <div id="project-main">
                    {/*project title | year | artists*/}
                    <div className="border-b border-black pb-2 mr-10">
                        <span className="text-3xl">{content?.content?.title} </span>
                        {
                            metadata?.contributors?.map((contributor, index) => {
                                return (
                                    <span className="text-sm" key={contributor?.content?.artistname}> {contributor?.content?.artistname}{index === (metadata?.contributors.length - 1) ? "" : " | "}</span>
                                )
                            })
                        }
                    </div>

                    {/*project description*/}
                    <p className="pt-2 mr-10">{content?.content?.projectdescription}</p>

                    {/*display project images*/}
                    {renderImages()}

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
            query: "page('projects').children",
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

    //FILTER AND FIND THE SPECIFIC PROJECT DATA
    const pageContent = projectListData.find((project) => {
            return project.url.slice(project.url.lastIndexOf('/') + 1) === params.id
        }
    );

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

    //GET METADATA FOR PROJECT
    //GET LIST OF CONTRIBUTORS/ARTISTS
    const projectArtistSLUGS = pageContent?.content?.projectartists?.split(",").map(artistPath => artistPath.slice(artistPath.lastIndexOf("/")))
    const contributors = artistsListData?.filter(artist => {
        return projectArtistSLUGS.includes(artist?.url.slice(artist.url.lastIndexOf("/")))
    })
    //GET FEATURE IMAGE NAMES
    const featureImageNames = pageContent?.content?.featuredimage?.split("\n").map(filename => getFeatureFileName(filename))
    const featureImages = pageContent?.images?.filter(image => featureImageNames.includes(image?.filename))

    const projectContent = {
        pageContent,
        contributors,
        featureImages
    }

    return {
        // Passed to the page component as props
        props: {
            content: pageContent,
            categories: categoryListData,
            artists: artistsListData,
            metadata: projectContent
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
