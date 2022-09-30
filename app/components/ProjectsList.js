// Styles
import styles from '../styles/ProjectsList.module.scss'
import imageStyles from '../styles/Image.module.scss'

// Components
import Link from "next/link"
import Image from 'next/image'

export default function ProjectsList({projects}) {
  return (
    <div className="flex flex-wrap w-full">
      {projects.map((project, index) => {
        const projectSLUG = project?.project?.url.slice(project?.project?.url.lastIndexOf("/"))
        
        if (index % 3 === 0) {
          return (
            <Link href={`/projects${projectSLUG}`} key={index}>
              <a className="w-full mb-32 pr-40 lg:hover:opacity-50 transition-opacity duration-300">
                <div className="flex items-end mb-3">
                  <h2 className="text-3xl whitespace-nowrap uppercase">{project?.project?.content?.title}</h2>
                  <span className="ml-6">
                    {project?.contributors?.map((contributor, index) => {
                      return (
                        <span 
                          className="text-sm uppercase" 
                          key={`full-width-card-${index}`}
                        >
                          {contributor?.content?.title}{index === (project?.contributors.length - 1) ? "" : " | "}
                        </span>
                      )
                    })}
                  </span>
                </div>

                <div className="relative">
                  <p className={`${styles.year} absolute top-0 left-0 leading-4`}>{project?.project?.content?.projectdate.slice(0, 4)}&nbsp;</p>

                  <div className={`${imageStyles['image-container']} image relative border border-black`} style={{ paddingBottom: '65%' }}>
                    <Image 
                      src={project?.featureImages[0]?.url}
                      layout="fill"
                      objectFit='cover'
                      alt={`Image for ${project.project.content.title}`}
                      priority={index < 3 ? true : false}
                    />
                  </div>
                </div>
              </a>
            </Link>
          )
        } else {
          return (
            <Link href={`/projects${projectSLUG}`} key={index}>
              <a className="w-full lg:w-1/2 mb-32 pr-20 lg:hover:opacity-50 transition-opacity duration-300">
                <div className="flex items-end mb-3">
                  <h2 className="text-3xl whitespace-nowrap uppercase">{project?.project?.content?.title}</h2>
                  <span className="ml-6">
                    {project?.contributors?.map((contributor, index) => {
                      return (
                        <span 
                          className="text-sm uppercase" 
                          key={`full-width-card-${index}`}
                        >
                          {contributor?.content?.title}{index === (project?.contributors.length - 1) ? "" : " | "}
                        </span>
                      )
                    })}
                  </span>
                </div>

                <div className="relative">
                  <p className={`${styles.year} absolute top-0 left-0 leading-4`}>{project?.project?.content?.projectdate.slice(0, 4)}&nbsp;</p>

                  <div className={`${imageStyles['image-container']} image relative border border-black`} style={{ paddingBottom: '65%' }}>
                    <Image 
                      src={project?.featureImages[0]?.url}
                      layout="fill"
                      objectFit='cover'
                      alt={`Image for ${project.project.content.title}`}
                      priority={index < 3 ? true : false}
                    />
                  </div>
                </div>
              </a>
            </Link>
          )
        }
      })}
    </div>
  )
}