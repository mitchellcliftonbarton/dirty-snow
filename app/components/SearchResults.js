// Styles
import styles from '../styles/ProjectsList.module.scss'

// Components
import Link from "next/link"
import Image from 'next/image'

export default function ProjectsList({results}) {
  return (
    <div className="flex flex-wrap w-full">
      {results.map((result, index) => {
        switch (result.type) {
          case 'project':
            const projectSLUG = result.url.slice(result.url.lastIndexOf("/"))

            return (
              <Link href={`/projects${projectSLUG}`}>
                <a className="w-full lg:w-1/2 mb-32 pr-20 lg:hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-end mb-3">
                    <h2 className="text-3xl whitespace-nowrap uppercase">{result.title}</h2>
                    {/* <span className="ml-6">
                      {project?.contributors?.map((contributor, index) => {
                        return (
                          <span 
                            className="text-sm uppercase" 
                            key={`full-width-card-${index}`}
                          >
                            {contributor?.content?.artistname}{index === (project?.contributors.length - 1) ? "" : " | "}
                          </span>
                        )
                      })}
                    </span> */}
                  </div>

                  {/* <div className="relative">
                    <p className={`${styles.year} absolute top-0 left-0 leading-4`}>{project?.project?.content?.projectdate.slice(0, 4)}&nbsp;</p>

                    <div className="image relative border border-black" style={{ paddingBottom: '65%' }}>
                      <Image 
                        src={project?.featureImages[0]?.url}
                        layout="fill"
                        objectFit='cover'
                        priority={index < 3 ? true : false}
                      />
                    </div>
                  </div> */}
                </a>
              </Link>
            )
          case 'category':
            return (
              <p>Category: {result.title}</p>
            )
          case 'artist':
            return (
              <p>Artist: {result.title}</p>
            )
        }
      })}
    </div>
  )
}