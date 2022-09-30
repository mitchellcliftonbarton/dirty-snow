// Styles
import styles from '../styles/Image.module.scss'

import Head from "next/head";

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import Link from "next/link";
import Image from 'next/image'

export default function HomePage({content}) {
    const { activeHomeCategoryData } = content

    return (
        <div className="py-32 px-def grid grid-cols-5 gap-def-1/2 w-full">
            <Head>
                <title>DIRTY SNOW | Home</title>
            </Head>

            {activeHomeCategoryData.map(category => {
                const categorySLUG = category?.url.slice(category?.url.lastIndexOf("/"))

                return (
                    <Link 
                        key={categorySLUG} 
                        href={`/categories${categorySLUG}`}
                    >
                        <a 
                            className={`${styles['image-container']} inner relative lg:hover:opacity-50 transition-opacity duration-300 cursor-pointer`} 
                            style={{ paddingBottom: '65%' }}
                        >
                            <Image
                                src={category?.images[0]?.url}
                                layout="fill"
                                objectFit="cover"
                                alt={`Image for ${category.content.title}`}
                                priority
                            />
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export async function getStaticProps() {
    const homeCategoriesResponse = await fetch(process.env.API_HOST, {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.AUTH}`,
        },
        body: JSON.stringify({
            query: "page('home')",
            select: {
                content: true
            },
        }),
    });

    const jsonData1 = await homeCategoriesResponse.json();
    
    const homeCategories = jsonData1.result.content.featuredcategories.split(",").map(category => category.slice(category.lastIndexOf('/')));

    const categoryListResponse = await fetch(process.env.API_HOST, {
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
                        height: true,
                        alt: true
                    },
                },
            },
        })
    });

    const jsonData2 = await categoryListResponse.json();
    const categoryListData = jsonData2.result.data;

    let activeHomeCategoryData = categoryListData.filter(category => {
        const categorySLUG = category.url.slice(category.url.lastIndexOf('/'));
        return homeCategories.includes(categorySLUG);
    })

    activeHomeCategoryData.sort(() => Math.random() - 0.5)

    activeHomeCategoryData = {
        title: jsonData1.result.content.title,
        activeHomeCategoryData,
    }

    return {
        // Passed to the page component as props
        props: {content: activeHomeCategoryData},
    };
}
