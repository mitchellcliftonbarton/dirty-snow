import Head from "next/head";
import TopNav from "../components/TopNav";
import Link from "next/link";

export default function HomePage({content}) {
    const randomCategoryArray = content?.activeHomeCategoryData?.sort(() => Math.random() - 0.5)
    return (
        <div className="m-3 pb-10">
            <div className="cursor-pointer absolute right-0" onClick={() => {console.log(content)}}>LOG CONTENT</div>
            <Head>
                <title>DIRTY SNOW</title>
            </Head>

            <TopNav />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 mt-[90px]">
                {randomCategoryArray.map(category => {
                    const categorySLUG = category?.url.slice(category?.url.lastIndexOf("/"))
                    return (
                        <Link key={categorySLUG} href={`/categories${categorySLUG}`}>
                            <div className="mx-auto cursor-pointer">
                                <img className="w-full h-full sm:h-[250px] object-fit" src={category?.images[0]?.url} />
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}


export async function getStaticProps() {
    const homeCategoriesResponse = await fetch("http://localhost:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: "Basic anJmcmFtcHRvbjEzQGdtYWlsLmNvbTpQYXNzd29yZDE=",
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

    const categoryListResponse = await fetch("http://localhost:8888/api/query", {
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
        })
    });

    const jsonData2 = await categoryListResponse.json();
    const categoryListData = jsonData2.result.data;

    let activeHomeCategoryData = categoryListData.filter(category => {
        const categorySLUG = category.url.slice(category.url.lastIndexOf('/'));
        return homeCategories.includes(categorySLUG);
    })

    activeHomeCategoryData = {
        title: jsonData1.result.content.title,
        activeHomeCategoryData,
    }

    return {
        // Passed to the page component as props
        props: {content: activeHomeCategoryData},
    };
}
