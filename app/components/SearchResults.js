// Styles
import styles from '../styles/ProjectsList.module.scss'
import imageStyles from '../styles/Image.module.scss'

// Components
import Link from "next/link"
import Image from 'next/image'

export default function ProjectsList({results}) {
  return (
    <div className="flex flex-wrap w-full">
      {results.map((result, index) => {
        switch (result.type) {
          case 'project':
            return (
              <Link 
                href={`/projects${result.slug}`} 
                key={index}
              >
                <a className="w-full lg:w-1/2 mb-32 pr-20 lg:hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-end mb-3">
                    <h2 className="text-3xl whitespace-nowrap uppercase">{result.title}</h2>
                  </div>

                  <div className="relative">
                    <p className={`${styles.year} absolute top-0 left-0 leading-4`}>{result.date.slice(0, 4)}&nbsp;</p>

                    <div className={`${imageStyles['image-container']} image relative border border-black`} style={{ paddingBottom: '65%' }}>
                      {result.image ? (
                        <Image 
                          src={result.image}
                          layout="fill"
                          objectFit='cover'
                          alt={`Image for ${result.title}`}
                          priority={index < 3 ? true : false}
                        />
                      ) : (
                        <div className="absolute top-0 left-0 w-full h-full bg-slate-300"></div>
                      )}
                    </div>
                  </div>
                </a>
              </Link>
            )
          case 'category':
            return (
              <Link 
                href={`/categories${result.slug}`} 
                key={index}
              >
                <a className="w-full lg:w-1/2 mb-32 pr-20 lg:hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-end mb-3">
                    <h2 className="text-3xl whitespace-nowrap uppercase">{result.title}</h2>
                  </div>

                  <div className="relative">
                    <div className={`${imageStyles['image-container']} image relative border border-black`} style={{ paddingBottom: '65%' }}>
                      <Image 
                        src={result.image}
                        layout="fill"
                        objectFit='cover'
                        alt={`Image for ${result.title}`}
                        priority={index < 3 ? true : false}
                      />
                    </div>
                  </div>
                </a>
              </Link>
            )
          case 'artist':
            return (
              <Link 
                href={`/artists${result.slug}`} 
                key={index}
              >
                <a className="w-full lg:w-1/2 mb-32 pr-20 lg:hover:opacity-50 transition-opacity duration-300">
                  <div className="flex items-end mb-3">
                    <h2 className="text-3xl whitespace-nowrap uppercase">{result.title}</h2>
                  </div>

                  <div className="relative">
                    <div className={`${imageStyles['image-container']} image relative border border-black`} style={{ paddingBottom: '65%' }}>
                      <Image 
                        src={result.image}
                        layout="fill"
                        objectFit='cover'
                        alt={`Image for ${result.title}`}
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