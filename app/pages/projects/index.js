import Head from "next/head";

// Components
import DefaultLayout from '../../components/layouts/DefaultLayout'
import Link from "next/link";
import Image from 'next/image'

export default function ProjectsList({ content }) {
    return (
        <div className="py-32 px-def grid grid-cols-5 gap-def-1/2 w-full">
            <Head>
                <title>DIRTY SNOW | PROJECTS</title>
            </Head>

            {content.map(project => {
                const projectSLUG = project?.url.slice(project?.url.lastIndexOf("/"))

                return (
                    <Link 
                        key={projectSLUG} 
                        href={`/projects${projectSLUG}`}
                    >
                        <a 
                            className="inner relative lg:hover:opacity-50 transition-opacity duration-300 cursor-pointer" 
                            style={{ paddingBottom: '65%' }}
                        >
                            <Image 
                                src={project?.images[0]?.url}
                                layout="fill"
                                objectFit="cover"
                                alt={`Image of ${project.content.title}`}
                                priority
                            />
                        </a>
                    </Link>
                )
            })}
        </div>
    );
}

ProjectsList.getLayout = function getLayout(page) {
  return (
    <DefaultLayout>
      {page}
    </DefaultLayout>
  )
}


export async function getStaticProps() {
    const response = await fetch("http://dirty-snow-panel.local.com:8888/api/query", {
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

    const jsonData = await response.json();
    let pageData = jsonData.result.data

    return {
        // Passed to the page component as props
        props: {content: pageData},
    };
}