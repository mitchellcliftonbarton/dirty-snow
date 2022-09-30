import Head from "next/head";

import styles from '../../styles/Image.module.scss'

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import Link from "next/link";
import Image from 'next/image'

export default function ArtistList({ content }) {
    return (
        <div className="py-32 px-def grid grid-cols-5 gap-def-1/2 w-full">
            <Head>
                <title>DIRTY SNOW | ARTISTS</title>
            </Head>

            {content.map(artist => {
                const artistSLUG = artist?.url.slice(artist?.url.lastIndexOf("/"))

                return (
                    <Link 
                        key={artistSLUG} 
                        href={`/artists${artistSLUG}`}
                    >
                        <a 
                            className={`${styles['image-container']} inner relative lg:hover:opacity-50 transition-opacity duration-300 cursor-pointer`} 
                            style={{ paddingBottom: '65%' }}
                        >
                            {artist?.images[0]?.url && (
                                <Image 
                                    src={artist?.images[0]?.url}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={`Image of ${artist.content.title}`}
                                    priority
                                />
                            )}
                        </a>
                    </Link>
                )
            })}
        </div>
    );
}

ArtistList.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export async function getStaticProps() {
    const response = await fetch(process.env.API_HOST, {
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

    const jsonData = await response.json();
    let pageData = jsonData.result.data

    return {
        // Passed to the page component as props
        props: {content: pageData},
    };
}