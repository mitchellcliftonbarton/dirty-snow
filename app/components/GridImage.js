// Styles
import styles from '../styles/MainNav.module.scss'
import imageStyles from '../styles/Image.module.scss'

// // Componentns
import Image from 'next/image'

const GridImage = ({ image, setImage, index, alt }) => {
  return (
    <div 
      className="col-span-2 lg:col-span-1 relative cursor-pointer" 
      style={{ paddingBottom: '133%' }}
      onClick={() => setImage(index, !image.expanded)}
    >
      <div
        className={`${styles['grid-image-inner']} ${image.expanded ? styles['expanded'] : null} ${styles[image.imagePosition]} inner absolute w-full`}
        style={{
          zIndex: image.zIndexVal
        }}
      >
        <div 
          className={`${imageStyles['image-container']} relative`} 
          style={{ paddingBottom: '133%', backgroundColor: 'rgba(200, 200, 200, .5)' }}
        >
          <Image 
            src={image.url}
            layout="fill"
            objectFit="cover"
            alt={alt}
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default GridImage