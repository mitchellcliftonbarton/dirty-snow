import Head from "next/head";

// React
import { useRouter } from 'next/router'

// Components
import DefaultLayout from '../components/layouts/DefaultLayout'
import SearchResults from '../components/SearchResults'
import SideNav from "../components/SideNav";

export default function SearchPage({ categories, artists, projects, allData }) {
  // console.log(artists, projects, results)
  const router = useRouter()
  const searchTerm = router.query.q

  // console.log(router, searchTerm)

  const results = allData.filter(item => {
    return item.searchableContent.includes(searchTerm)
  })

    return (
        <div className="pt-20 pb-32 grid grid-cols-12 gap-def px-def">
            <Head>
                <title>DIRTY SNOW | Search</title>
            </Head>

            <SideNav 
                categories={categories} 
                artists={artists} 
                selectedPage={false}
            />
        
            <div className="col-span-9">
                {results.length > 0 ? (
                    <SearchResults results={results} />
                ) : (
                    <p>No results for {searchTerm}.</p>
                )}
            </div>
        </div>
    );
}

SearchPage.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { params } = context;
  
  console.log(params)
  
    //GET ALL CATEGORIES' DATA
    const categoriesResponse = await fetch("http://dirty-snow-panel.local.com:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`mitchell@cold-rice.info:dirtysnow`).toString("base64")}`,
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
    const artistsResponse = await fetch("http://dirty-snow-panel.local.com:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`mitchell@cold-rice.info:dirtysnow`).toString("base64")}`,
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
    const projectsResponse = await fetch("http://dirty-snow-panel.local.com:8888/api/query", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`mitchell@cold-rice.info:dirtysnow`).toString("base64")}`,
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
  

  // COMBINE ALL DATA AND FILTER BY SEARCH
  const allData = []

  categoryListData.forEach(category => {
    const obj = {
      title: category.content.title,
      name: category.content.categoryname,
      searchableContent: `${category.content.title} ${category.content.categoryname} ${category.content.categorydescription} category`,
      type: 'category',
      slug: category.url
    }

    allData.push(obj)
  })

  artistsListData.forEach(artist => {
    const obj = {
      title: artist.content.title,
      name: artist.content.artistname,
      searchableContent: `${artist.content.title} ${artist.content.categoryname} ${artist.content.artistbio}artist`,
      type: 'artist',
      slug: artist.url
    }

    allData.push(obj)
  })

  projectListData.forEach(project => {
    let catsString = ''
    const cats = project.content.projectcategories.split(',')
    cats.forEach(cat => {
      catsString += cat
    })

    let artistsString = ''
    const artists = project.content.projectartists.split(',')
    artists.forEach(artist => {
      artistsString += artist
    })

    const obj = {
      title: project.content.title,
      name: project.content.title,
      searchableContent: `${project.content.title} ${catsString.toLowerCase()} ${artistsString.toLowerCase()}`,
      type: 'project',
      slug: project.content.url
    }

    allData.push(obj)
  })

  // const results = allData.filter(item => {
  //   return item.searchableContent.includes()
  // })

    return {
        // Passed to the page component as props
        props: {
            categories: categoryListData,
            artists: artistsListData,
        projects: projectListData,
            allData: allData
        },
    };
}
