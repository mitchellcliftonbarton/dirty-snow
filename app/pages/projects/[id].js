import Head from "next/head";

import styles from '../../styles/Image.module.scss'

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import SideNav from "../../components/SideNav";
import Image from 'next/image'

// Other
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {useCallback, useRef, useState} from "react";
import GridImage from "../../components/GridImage";

export default function ProjectPost({content, categories, artists, metadata, studiocategories}) {
    let isLargeQuery = true
    console.log(content)

    if (typeof window !== "undefined") {
        isLargeQuery = window.matchMedia("(min-width: 992px)").matches
    }
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    
    const images = content.images.map((obj, index) => {
        let imagePosition = 'top-left'
        let isRightSide = false
        let isBottom = false
        let index1 = index + 1
        let index2 = index + 2

        let total = content.images.length
        let totalRows = Math.ceil(total / 5)
        let currentRow = Math.ceil((index + 1) / 5)

        if (currentRow === totalRows) {
            isBottom = true
        }

        if (index2 % 5 === 0) {
            isRightSide = true
        }

        if (index1 % 5 === 0) {
            isRightSide = true
        }

        if (isRightSide && !isBottom) {
            imagePosition = 'top-right'
        } else if (!isRightSide && isBottom) {
            imagePosition = 'bottom-left'
        } else if (isRightSide && isBottom) {
            imagePosition = 'bottom-right'
        }

        let zIndexVal = 1

        return {...obj, expanded: false, imagePosition, zIndexVal}
    })
    const [gridImages, setGridImages] = useState(images)
    
    const setImage = (index, value) => {
        if (isLargeQuery) {
            images.forEach(image => {
                image.expanded = false
                image.zIndexVal = 1
            })
            images[index].expanded = value
            images[index].zIndexVal = 10

            setGridImages([...images]) // have to spread it in so its passing in a new array, otherwise state wont update UI
        }
    }

    function renderImages() {
        switch (content?.content?.projectlayout) {
            case "Grid":
                return (
                    // TODO BUILD ACTUAL GRID LAYOUT WITH EXPANDABLE IMAGES
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-def lg:gap-1 pr-def lg:pr-20">
                        {gridImages?.map((image, index) => {
                            return (
                                <GridImage image={image} setImage={setImage} index={index} key={index} alt={`Image from ${content.content.title}`} />
                            )
                        })}
                    </div>
                )
            case "Carousel":
                return (
                    <>
                        <div className="flex lg:hidden flex-wrap pr-def">
                            {content?.images?.map((image, index) => {
                                return (
                                    <div className="w-full mb-def" key={index}>
                                        {image.type === 'video' ? (
                                            <video src={image.url} controls preload className="w-full"></video>
                                        ) : (
                                            <Image
                                                src={image.url}
                                                key={index}
                                                width={image.width}
                                                height={image.height}
                                                alt={`Image from ${content.content.title}`}
                                                priority={index < 2 ? true : false}
                                                layout="responsive"
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="hidden lg:flex justify-center w-full">
                            <div className="w-full relative" style={{ paddingBottom: '45%' }}>
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <Swiper
                                        ref={sliderRef}
                                        slidesPerView={1.5}
                                        spaceBetween={100}
                                        loop={true}
                                        style={{
                                            position: 'absolute',
                                            left: '0px',
                                            top: '0px',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        {content?.images?.map((image, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <div className={`${styles['image-container']} absolute top-0 left-0 h-full w-full`}>
                                                        {image.type === 'video' ? (
                                                            <div className="absolute top-0 left-0 w-full h-full">
                                                                <video src={image.url} controls preload className="object-contain object-center w-full h-full"></video>
                                                            </div>
                                                        ) : (
                                                            <Image 
                                                                src={image.url}
                                                                width={image.width}
                                                                height={image.height}
                                                                alt={`Image from ${content.content.title}`}
                                                                priority={index < 2 ? true : false}
                                                                objectFit="contain"
                                                                layout="fill"
                                                            />
                                                        )}
                                                    </div>
                                                </SwiperSlide>)
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-between mt-4">
                            <div onClick={handlePrev} className="p-2 cursor-pointer">
                                <svg width="165" height="14" viewBox="0 0 165 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 7L5 9.88675L5 4.11325L0 7ZM4.5 7.5L165 7.50001L165 6.50001L4.5 6.5L4.5 7.5Z" fill="black"/>
                                <path d="M0 7L9.75 0.937822V13.0622L0 7Z" fill="black"/>
                                </svg>
                            </div>
                            <div onClick={handleNext} className="p-2 cursor-pointer mr-10">
                                <svg width="165" height="14" viewBox="0 0 165 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M165 7.00001L160 4.11326L160 9.88677L165 7.00001ZM-4.37114e-08 7.5L160.5 7.50001L160.5 6.50001L4.37114e-08 6.5L-4.37114e-08 7.5Z" fill="black"/>
                                <path d="M165 7L155.25 13.0622V0.937822L165 7Z" fill="black"/>
                                </svg>
                            </div>
                        </div>
                    </>
                )
        }
    }

    return (
        <div className="pt-20 pb-32 grid grid-cols-12 gap-def pl-def">
            <Head>
                <title>DS | {content?.content?.title?.toUpperCase()}</title>
            </Head>

            <SideNav 
                categories={categories} 
                artists={artists} 
                selectedPage={content?.content?.title}
                studioCategories={studiocategories}
            />

            <div className="col-span-12 lg:col-span-9">
                <div id="project-main">
                    <div className="border-b border-black pb-2 mr-def">
                        <span className="text-3xl">{content?.content?.title} </span>
                        {
                            metadata?.contributors?.map((contributor, index) => {
                                return (
                                    <span className="text-sm" key={contributor?.content?.title}> {contributor?.content?.title}{index === (metadata?.contributors.length - 1) ? "" : " | "}</span>
                                )
                            })
                        }
                    </div>

                    <p className="pt-2 pr-10 mb-8">{content?.content?.projectdescription}</p>

                    {renderImages()}
                </div>
            </div>
        </div>
    );
}

ProjectPost.getLayout = function getLayout(page) {
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
                    query: "page.projectImages.toFiles",
                    select: {
                        url: true,
                        filename: true,
                        content: true,
                        width: true,
                        height: true,
                        type: true
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
                        width: true,
                        height: true
                    },
                },
            },
        }),
    });
    const artistsJsonData = await artistsResponse.json()
    let artistsListData = artistsJsonData.result.data

    //GET ALL STUDIO' DATA
    const studioResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
        },
        body: JSON.stringify({
            query: "page('studiocategories').children",
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
    const studioJsonData = await studioResponse.json()
    let studioListData = studioJsonData.result.data

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
                        width: true,
                        height: true
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
            metadata: projectContent,
            studiocategories: studioListData
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
